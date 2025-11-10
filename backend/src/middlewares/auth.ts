import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

/**
 * Extend Express Request to include user info.
 */
export interface AuthRequest extends Request {
  user?: any;
}

/**
 *Protect middleware
 * Checks JWT token, verifies it, and attaches user to req.user.
 */
export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token: string | undefined;

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
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey") as {
      id: string;
      role: string;
    };

    // 3️ Find user in database
    const user = await User.findById(decoded.id).select("-passwordHash");

    if (!user) {
      res.status(404).json({ ok: false, msg: "User not found" });
      return;
    }

    // 4️ Attach user to request
    req.user = user;
    next();
  } catch (err: any) {
    res.status(401).json({ ok: false, msg: "Invalid or expired token" });
  }
};

/**
 *  Admin-only guard
 * Allows only admins to access specific routes.
 */
export const adminOnly = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
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
