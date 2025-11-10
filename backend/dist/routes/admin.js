"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const User_1 = require("../models/User");
const router = express_1.default.Router();
// GET /api/admin/users → fetch all users (admin only)
router.get("/users", authMiddleware_1.protect, authMiddleware_1.adminOnly, async (req, res) => {
    try {
        const users = await User_1.User.find().select("-passwordHash");
        res.json({ ok: true, users });
    }
    catch (err) {
        res.status(500).json({ ok: false, msg: err.message });
    }
});
// PUT /api/admin/users/:id/role → update user role
router.put("/users/:id/role", authMiddleware_1.protect, authMiddleware_1.adminOnly, async (req, res) => {
    try {
        const { role } = req.body;
        if (!role)
            return res.status(400).json({ ok: false, msg: "Role is required" });
        const user = await User_1.User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select("-passwordHash");
        if (!user)
            return res.status(404).json({ ok: false, msg: "User not found" });
        res.json({ ok: true, msg: "Role updated", user });
    }
    catch (err) {
        res.status(500).json({ ok: false, msg: err.message });
    }
});
// DELETE /api/admin/users/:id → delete user
router.delete("/users/:id", authMiddleware_1.protect, authMiddleware_1.adminOnly, async (req, res) => {
    try {
        const user = await User_1.User.findByIdAndDelete(req.params.id);
        if (!user)
            return res.status(404).json({ ok: false, msg: "User not found" });
        res.json({ ok: true, msg: "User deleted" });
    }
    catch (err) {
        res.status(500).json({ ok: false, msg: err.message });
    }
});
exports.default = router;
//# sourceMappingURL=admin.js.map