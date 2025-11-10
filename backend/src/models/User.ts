

import mongoose, { Schema, Document } from "mongoose";

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

const userSchema = new Schema<IUser>(
  {
    name: { type: String },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      match: /^\S+@\S+\.\S+$/ 
    },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "staff", "user"],
      default: "user",
    },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
