import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

/**
 *  Role-based authorization middleware
 * Restricts access to specific user roles (e.g., 'admin', 'staff', etc.)
 *
 * Example: router.get('/admin', authMiddleware, authorizeRoles('admin'), handler);
 */
export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ ok: false, msg: "Not authenticated" });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ ok: false, msg: "Access denied" });
      return;
    }

    next();
  };
};
