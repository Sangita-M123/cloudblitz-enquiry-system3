"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("../models/User");
const generateToken_1 = require("../utils/generateToken");
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        // Check if user already exists
        const existing = await User_1.User.findOne({ email });
        if (existing) {
            res.status(400).json({ ok: false, msg: "User with this email already exists" });
            return;
        }
        // Hash password
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        // Create user (role defaults to "user" if not provided)
        const user = await User_1.User.create({
            name,
            email,
            passwordHash,
            role: role || "user"
        });
        const token = (0, generateToken_1.generateToken)(String(user._id), user.role);
        res.status(201).json({
            ok: true,
            msg: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token,
        });
    }
    catch (err) {
        res.status(500).json({ ok: false, msg: err.message });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user by email
        const user = await User_1.User.findOne({ email });
        if (!user) {
            res.status(400).json({ ok: false, msg: "Invalid email or password" });
            return;
        }
        // Check if user is soft deleted
        if (user.deletedAt) {
            res.status(403).json({ ok: false, msg: "Account has been deactivated" });
            return;
        }
        // Verify password
        const isMatch = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!isMatch) {
            res.status(400).json({ ok: false, msg: "Invalid email or password" });
            return;
        }
        const token = (0, generateToken_1.generateToken)(String(user._id), user.role);
        res.json({
            ok: true,
            msg: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        });
    }
    catch (err) {
        res.status(500).json({ ok: false, msg: err.message });
    }
};
exports.loginUser = loginUser;
const getMe = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ ok: false, msg: "Not authenticated" });
            return;
        }
        const user = await User_1.User.findById(req.user._id).select("-passwordHash");
        if (!user) {
            res.status(404).json({ ok: false, msg: "User not found" });
            return;
        }
        res.json({
            ok: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    }
    catch (err) {
        res.status(500).json({ ok: false, msg: err.message });
    }
};
exports.getMe = getMe;
//# sourceMappingURL=auth.js.map