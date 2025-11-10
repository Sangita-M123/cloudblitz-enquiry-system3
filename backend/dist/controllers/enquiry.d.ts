import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
export declare const createEnquiry: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getAllEnquiries: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getEnquiryById: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateEnquiry: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteEnquiry: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=enquiry.d.ts.map