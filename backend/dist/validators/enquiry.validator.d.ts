import { z } from "zod";
export declare const createEnquirySchema: z.ZodObject<{
    customerName: z.ZodString;
    email: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    phone: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    message: z.ZodString;
}, z.core.$strip>;
export declare const updateEnquirySchema: z.ZodObject<{
    customerName: z.ZodOptional<z.ZodString>;
    email: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    phone: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    message: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        New: "New";
        "In Progress": "In Progress";
        Closed: "Closed";
    }>>;
    assignedTo: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export type CreateEnquiryInput = z.infer<typeof createEnquirySchema>;
export type UpdateEnquiryInput = z.infer<typeof updateEnquirySchema>;
//# sourceMappingURL=enquiry.validator.d.ts.map