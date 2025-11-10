import { Request, Response } from "express";
/**
 *  Get all users (Admin only)
 * Returns all users except password hash.
 */
export declare const getAllUsers: (_req: Request, res: Response) => Promise<void>;
/**
 *  Assign enquiry to staff (Admin only)
 * Sets assignedTo and marks enquiry as In Progress.
 */
export declare const assignEnquiry: (req: Request, res: Response) => Promise<void>;
/**
 *  Permanently delete enquiry (Admin only)
 * Removes enquiry completely from the database.
 */
export declare const deleteEnquiryPermanently: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=admin.d.ts.map