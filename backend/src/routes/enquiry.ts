import express from "express";
import { protect } from "../middlewares/authMiddleware";
import { createEnquiry, getAllEnquiries, getEnquiryById, updateEnquiry, deleteEnquiry } from "../controllers/enquiry";
import { validate } from "../middlewares/validate";
import { createEnquirySchema, updateEnquirySchema } from "../validators/enquiry.validator";

const router = express.Router();

// POST /api/enquiries - Create new enquiry
router.post("/", protect, validate(createEnquirySchema), createEnquiry);

// GET /api/enquiries - Get all enquiries (role-based filtering)
router.get("/", protect, getAllEnquiries);

// GET /api/enquiries/:id - Get single enquiry by ID
router.get("/:id", protect, getEnquiryById);

// PUT /api/enquiries/:id - Update enquiry (role-based permissions)
router.put("/:id", protect, validate(updateEnquirySchema), updateEnquiry);

// DELETE /api/enquiries/:id - Soft delete enquiry (admin only)
router.delete("/:id", protect, deleteEnquiry);

export default router;



