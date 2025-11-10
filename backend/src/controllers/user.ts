import { AuthRequest } from "../middlewares/authMiddleware";
import { Response } from "express";
import { User } from "../models/User";

export const editProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ ok: false, msg: "User not found" });

    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;

    await user.save();
    res.json({ ok: true, msg: "Profile updated", user });
  } catch (err: any) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};
