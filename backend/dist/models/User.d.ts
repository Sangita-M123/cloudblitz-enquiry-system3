import mongoose, { Document } from "mongoose";
export type UserRole = "admin" | "staff" | "user";
export interface IUser extends Document {
    name?: string;
    email: string;
    passwordHash: string;
    role: UserRole;
    deletedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=User.d.ts.map