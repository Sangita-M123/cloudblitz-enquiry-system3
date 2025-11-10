// import express, { Request, Response } from "express";
// import {User} from "../models/User";
// import { authMiddleware, adminOnly } from "../middlewares/auth";

// const router = express.Router();

// /**
//  * 👑 ADMIN ROUTES
//  * These routes are restricted to users with the "admin" role.
//  */

// // 🔹 Get all users (Admin only)
// router.get("/", authMiddleware, adminOnly, async (req: Request, res: Response) => {
//   try {
//     const users = await User.find().select("-passwordHash");
//     res.json({ ok: true, users });
//   } catch (err: any) {
//     console.error(err);
//     res.status(500).json({ ok: false, msg: "Error fetching users" });
//   }
// });

// // 🔹 Update user role (Admin only)
// router.put("/:id/role", authMiddleware, adminOnly, async (req: Request, res: Response) => {
//   try {
//     const { role } = req.body;
//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       { role },
//       { new: true }
//     ).select("-passwordHash");

//     if (!user) return res.status(404).json({ ok: false, msg: "User not found" });

//     res.json({ ok: true, msg: "Role updated successfully", user });
//   } catch (err: any) {
//     console.error(err);
//     res.status(500).json({ ok: false, msg: "Error updating user role" });
//   }
// });

// // 🔹 Delete user (Admin only)
// router.delete("/:id", authMiddleware, adminOnly, async (req: Request, res: Response) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) return res.status(404).json({ ok: false, msg: "User not found" });

//     res.json({ ok: true, msg: "User deleted successfully" });
//   } catch (err: any) {
//     console.error(err);
//     res.status(500).json({ ok: false, msg: "Error deleting user" });
//   }
// });

// export default router;
import express from "express";
import { protect } from "../middlewares/authMiddleware";
import { editProfile } from "../controllers/user";

const router = express.Router();

router.put("/edit-profile", protect, editProfile);

export default router;

