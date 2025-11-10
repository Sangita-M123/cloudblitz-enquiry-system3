import { z } from "zod";
export declare const updateUserRoleSchema: z.ZodObject<{
    role: z.ZodEnum<{
        admin: "admin";
        staff: "staff";
        user: "user";
    }>;
}, z.core.$strip>;
export declare const createUserSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<{
        admin: "admin";
        staff: "staff";
        user: "user";
    }>>;
}, z.core.$strip>;
export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
//# sourceMappingURL=user.validator.d.ts.map