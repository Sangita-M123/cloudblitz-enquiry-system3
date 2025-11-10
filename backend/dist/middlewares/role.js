"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = void 0;
/**
 *  Role-based authorization middleware
 * Restricts access to specific user roles (e.g., 'admin', 'staff', etc.)
 *
 * Example: router.get('/admin', authMiddleware, authorizeRoles('admin'), handler);
 */
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
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
exports.authorizeRoles = authorizeRoles;
//# sourceMappingURL=role.js.map