"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEnquirySchema = exports.createEnquirySchema = void 0;
const zod_1 = require("zod");
exports.createEnquirySchema = zod_1.z.object({
    customerName: zod_1.z.string().min(2, "Customer name must be at least 2 characters").max(100, "Name too long"),
    email: zod_1.z.string().email("Invalid email address").optional().or(zod_1.z.literal("")),
    phone: zod_1.z.string().regex(/^[0-9+\-\s()]*$/, "Invalid phone number").max(20, "Phone number too long").optional().or(zod_1.z.literal("")),
    message: zod_1.z.string().min(10, "Message must be at least 10 characters").max(1000, "Message too long"),
});
exports.updateEnquirySchema = zod_1.z.object({
    customerName: zod_1.z.string().min(2, "Customer name must be at least 2 characters").max(100, "Name too long").optional(),
    email: zod_1.z.string().email("Invalid email address").optional().or(zod_1.z.literal("")),
    phone: zod_1.z.string().regex(/^[0-9+\-\s()]*$/, "Invalid phone number").max(20, "Phone number too long").optional().or(zod_1.z.literal("")),
    message: zod_1.z.string().min(10, "Message must be at least 10 characters").max(1000, "Message too long").optional(),
    status: zod_1.z.enum(["New", "In Progress", "Closed"]).optional(),
    assignedTo: zod_1.z.string().optional().nullable(),
});
//# sourceMappingURL=enquiry.validator.js.map