import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";
/**
 *  Role-based authorization middleware
 * Restricts access to specific user roles (e.g., 'admin', 'staff', etc.)
 *
 * Example: router.get('/admin', authMiddleware, authorizeRoles('admin'), handler);
 */
export declare const authorizeRoles: (...allowedRoles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=role.d.ts.map