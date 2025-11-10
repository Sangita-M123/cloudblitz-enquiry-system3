import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
export declare const registerUser: (req: Request, res: Response) => Promise<void>;
export declare const loginUser: (req: Request, res: Response) => Promise<void>;
export declare const getMe: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=auth.d.ts.map