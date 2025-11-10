"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnly = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
/**
 *Protect middleware
 * Checks JWT token, verifies it, and attaches user to req.user.
 */
const protect = async (req, res, next) => {
    let token;
    // 1️ Extract token from Authorization header
    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        res.status(401).json({ ok: false, msg: "No token provided" });
        return;
    }
    try {
        // 2️ Verify token and decode payload
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secretkey");
        // 3️ Find user in database
        const user = await User_1.User.findById(decoded.id).select("-passwordHash");
        if (!user) {
            res.status(404).json({ ok: false, msg: "User not found" });
            return;
        }
        // 4️ Attach user to request
        req.user = user;
        next();
    }
    catch (err) {
        res.status(401).json({ ok: false, msg: "Invalid or expired token" });
    }
};
exports.protect = protect;
/**
 *  Admin-only guard
 * Allows only admins to access specific routes.
 */
const adminOnly = (req, res, next) => {
    if (!req.user) {
        res.status(401).json({ ok: false, msg: "Not authenticated" });
        return;
    }
    if (req.user.role !== "admin") {
        res.status(403).json({ ok: false, msg: "Access denied. Admins only." });
        return;
    }
    next();
};
exports.adminOnly = adminOnly;
//# sourceMappingURL=auth.js.map