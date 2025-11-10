"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = exports.updateUserRoleSchema = void 0;
const zod_1 = require("zod");
exports.updateUserRoleSchema = zod_1.z.object({
    role: zod_1.z.enum(["user", "staff", "admin"]),
});
exports.createUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Name must be at least 2 characters").max(50, "Name too long"),
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    role: zod_1.z.enum(["user", "staff", "admin"]).default("user"),
});
//# sourceMappingURL=user.validator.js.map