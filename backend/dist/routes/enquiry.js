"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const enquiry_1 = require("../controllers/enquiry");
const validate_1 = require("../middlewares/validate");
const enquiry_validator_1 = require("../validators/enquiry.validator");
const router = express_1.default.Router();
// POST /api/enquiries - Create new enquiry
router.post("/", authMiddleware_1.protect, (0, validate_1.validate)(enquiry_validator_1.createEnquirySchema), enquiry_1.createEnquiry);
// GET /api/enquiries - Get all enquiries (role-based filtering)
router.get("/", authMiddleware_1.protect, enquiry_1.getAllEnquiries);
// GET /api/enquiries/:id - Get single enquiry by ID
router.get("/:id", authMiddleware_1.protect, enquiry_1.getEnquiryById);
// PUT /api/enquiries/:id - Update enquiry (role-based permissions)
router.put("/:id", authMiddleware_1.protect, (0, validate_1.validate)(enquiry_validator_1.updateEnquirySchema), enquiry_1.updateEnquiry);
// DELETE /api/enquiries/:id - Soft delete enquiry (admin only)
router.delete("/:id", authMiddleware_1.protect, enquiry_1.deleteEnquiry);
exports.default = router;
//# sourceMappingURL=enquiry.js.map