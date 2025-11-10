import { Request, Response, NextFunction } from "express";
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
export declare const protect: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
/**
 *  Admin-only guard
 * Allows only admins to access specific routes.
 */
export declare const adminOnly: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.d.ts.map