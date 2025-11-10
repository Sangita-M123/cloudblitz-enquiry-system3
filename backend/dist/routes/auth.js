"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const validate_1 = require("../middlewares/validate");
const auth_validator_1 = require("../validators/auth.validator");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
// POST /api/auth/register - Register new user
router.post("/register", (0, validate_1.validate)(auth_validator_1.registerSchema), auth_1.registerUser);
// POST /api/auth/login - Login user
router.post("/login", (0, validate_1.validate)(auth_validator_1.loginSchema), auth_1.loginUser);
// GET /api/auth/me - Get current user info
router.get("/me", authMiddleware_1.protect, auth_1.getMe);
exports.default = router;
//# sourceMappingURL=auth.js.map