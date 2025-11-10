

import mongoose, { Schema, Document, Types } from "mongoose";

export interface IEnquiry extends Document {
  customerName: string;
  email?: string;
  phone?: string;
  message?: string;
  status: "New" | "In Progress" | "Closed";
  assignedTo?: Types.ObjectId | null;
  createdBy?: Types.ObjectId | null;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const enquirySchema = new Schema<IEnquiry>(
  {
    customerName: { type: String, required: true },
    email: { type: String, match: /^\S+@\S+\.\S+$/ },
    phone: { type: String },
    message: { type: String },
    status: {
      type: String,
      enum: ["New", "In Progress", "Closed"],
      default: "New",
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User", default: null },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export const Enquiry = mongoose.model<IEnquiry>("Enquiry", enquirySchema);
