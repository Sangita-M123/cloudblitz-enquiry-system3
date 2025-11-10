import { z } from "zod";

export const updateUserRoleSchema = z.object({
  role: z.enum(["user", "staff", "admin"]),
});

export const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name too long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["user", "staff", "admin"]).default("user"),
});

export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
