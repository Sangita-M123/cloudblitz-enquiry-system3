

import express from "express";
import { registerUser, loginUser, getMe } from "../controllers/auth";
import { validate } from "../middlewares/validate";
import { registerSchema, loginSchema } from "../validators/auth.validator";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

// POST /api/auth/register - Register new user
router.post("/register", validate(registerSchema), registerUser);

// POST /api/auth/login - Login user
router.post("/login", validate(loginSchema), loginUser);

// GET /api/auth/me - Get current user info
router.get("/me", protect, getMe);

export default router;
