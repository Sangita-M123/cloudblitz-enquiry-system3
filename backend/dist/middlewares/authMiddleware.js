"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.adminOnly = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        res.status(401).json({ ok: false, msg: "No token provided" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secretkey");
        const user = await User_1.User.findById(decoded.id).select("-passwordHash");
        if (!user) {
            res.status(404).json({ ok: false, msg: "User not found" });
            return;
        }
        req.user = user;
        next();
    }
    catch (err) {
        res.status(401).json({ ok: false, msg: "Invalid or expired token" });
    }
};
exports.protect = protect;
const adminOnly = (req, res, next) => {
    if (!req.user)
        return res.status(401).json({ ok: false, msg: "Not authenticated" });
    if (req.user.role !== "admin")
        return res.status(403).json({ ok: false, msg: "Admins only" });
    next();
};
exports.adminOnly = adminOnly;
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user)
            return res.status(401).json({ ok: false, msg: "Not authenticated" });
        if (!roles.includes(req.user.role))
            return res.status(403).json({ ok: false, msg: "Access denied" });
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import { User } from "../models/User";
// // Extend Express Request to include user
// export interface AuthRequest extends Request {
//   user?: any;
// }
// // Protect middleware: checks JWT, attaches user to req.user
// export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
//   let token: string | undefined;
//   if (req.headers.authorization?.startsWith("Bearer")) {
//     token = req.headers.authorization.split(" ")[1];
//   }
//   if (!token) return res.status(401).json({ ok: false, msg: "No token provided" });
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey") as { id: string; role: string };
//     const user = await User.findById(decoded.id).select("-passwordHash");
//     if (!user) return res.status(404).json({ ok: false, msg: "User not found" });
//     req.user = user;
//     next();
//   } catch (err) {
//     res.status(401).json({ ok: false, msg: "Invalid or expired token" });
//   }
// };
// // Admin-only guard
// export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
//   if (!req.user) return res.status(401).json({ ok: false, msg: "Not authenticated" });
//   if (req.user.role !== "admin") return res.status(403).json({ ok: false, msg: "Admins only" });
//   next();
// };
// // Role-based authorization
// export const authorizeRoles = (...roles: string[]) => {
//   return (req: AuthRequest, res: Response, next: NextFunction) => {
//     if (!req.user) return res.status(401).json({ ok: false, msg: "Not authenticated" });
//     if (!roles.includes(req.user.role)) return res.status(403).json({ ok: false, msg: "Access denied" });
//     next();
//   };
// };
//# sourceMappingURL=authMiddleware.js.map