import mongoose, { Document, Types } from "mongoose";
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
export declare const Enquiry: mongoose.Model<IEnquiry, {}, {}, {}, mongoose.Document<unknown, {}, IEnquiry, {}, {}> & IEnquiry & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Enquiry.d.ts.map