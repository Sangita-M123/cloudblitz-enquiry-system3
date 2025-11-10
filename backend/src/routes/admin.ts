
import express, { Request, Response } from "express";
import { protect, adminOnly, AuthRequest } from "../middlewares/authMiddleware";
import { User, IUser } from "../models/User";

const router = express.Router();

// GET /api/admin/users → fetch all users (admin only)
router.get("/users", protect, adminOnly, async (req: AuthRequest, res: Response) => {
  try {
    const users: IUser[] = await User.find().select("-passwordHash");
    res.json({ ok: true, users });
  } catch (err: any) {
    res.status(500).json({ ok: false, msg: err.message });
  }
});

// PUT /api/admin/users/:id/role → update user role
router.put("/users/:id/role", protect, adminOnly, async (req: AuthRequest, res: Response) => {
  try {
    const { role } = req.body;
    if (!role) return res.status(400).json({ ok: false, msg: "Role is required" });

    const user: IUser | null = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-passwordHash");

    if (!user) return res.status(404).json({ ok: false, msg: "User not found" });

    res.json({ ok: true, msg: "Role updated", user });
  } catch (err: any) {
    res.status(500).json({ ok: false, msg: err.message });
  }
});

// DELETE /api/admin/users/:id → delete user
router.delete("/users/:id", protect, adminOnly, async (req: AuthRequest, res: Response) => {
  try {
    const user: IUser | null = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ ok: false, msg: "User not found" });

    res.json({ ok: true, msg: "User deleted" });
  } catch (err: any) {
    res.status(500).json({ ok: false, msg: err.message });
  }
});

export default router;

