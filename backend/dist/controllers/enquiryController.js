"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEnquiry = exports.getEnquiries = exports.createEnquiry = void 0;
const Enquiry_1 = require("../models/Enquiry");
// Create new enquiry
const createEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry_1.Enquiry.create({
            text: req.body.text,
            user: req.user._id,
            status: "pending",
        });
        res.status(201).json({ enquiry });
    }
    catch (err) {
        res.status(500).json({ message: "Error creating enquiry" });
    }
};
exports.createEnquiry = createEnquiry;
// Get enquiries
const getEnquiries = async (req, res) => {
    try {
        let enquiries;
        if (req.user.role === "staff") {
            enquiries = await Enquiry_1.Enquiry.find().populate("user", "name email");
        }
        else {
            enquiries = await Enquiry_1.Enquiry.find({ user: req.user._id });
        }
        res.json({ enquiries });
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching enquiries" });
    }
};
exports.getEnquiries = getEnquiries;
// Update enquiry
const updateEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry_1.Enquiry.findById(req.params.id);
        if (!enquiry) {
            return res.status(404).json({ message: "Enquiry not found" });
        }
        // Normal user can only edit text of their own enquiry
        if (req.user.role !== "staff" && enquiry.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }
        if (req.user.role === "staff") {
            // Staff can update both text and status
            enquiry.text = req.body.text || enquiry.text;
            enquiry.status = req.body.status || enquiry.status;
        }
        else {
            // Normal user can update only text
            enquiry.text = req.body.text || enquiry.text;
        }
        const updatedEnquiry = await enquiry.save();
        res.json({ enquiry: updatedEnquiry });
    }
    catch (err) {
        res.status(500).json({ message: "Error updating enquiry" });
    }
};
exports.updateEnquiry = updateEnquiry;
//@ts-nocheck
// import { Request, Response } from "express";
// import { Enquiry } from "../models/Enquiry";
// import { AuthRequest } from "../middlewares/authMiddleware";
// // Create enquiry
// export const createEnquiry = async (req: AuthRequest, res: Response) => {
//   try {
//     const { text } = req.body;
//     if (!text) return res.status(400).json({ ok: false, msg: "Text is required" });
//     const enquiry = await Enquiry.create({
//       text,
//       user: req.user?._id,
//       status: "pending",
//     });
//     res.status(201).json({ ok: true, enquiry });
//   } catch (err: any) {
//     res.status(500).json({ ok: false, msg: err.message });
//   }
// };
// // Get enquiries (role-based)
// export const getEnquiries = async (req: AuthRequest, res: Response) => {
//   try {
//     let enquiries;
//     if (req.user?.role === "staff" || req.user?.role === "admin") {
//       // Staff/Admin see all enquiries
//       enquiries = await Enquiry.find().populate("user", "name email");
//     } else {
//       // Normal user sees only their own
//       enquiries = await Enquiry.find({ user: req.user?._id }).populate("user", "name email");
//     }
//     res.json({ ok: true, enquiries });
//   } catch (err: any) {
//     res.status(500).json({ ok: false, msg: err.message });
//   }
// };
// // Update enquiry
// export const updateEnquiry = async (req: AuthRequest, res: Response) => {
//   try {
//     const enquiry = await Enquiry.findById(req.params.id);
//     if (!enquiry) return res.status(404).json({ ok: false, msg: "Enquiry not found" });
//     // Normal user can update only their own text
//     if (req.user?.role !== "staff" && req.user?.role !== "admin" && enquiry.user.toString() !== req.user?._id.toString()) {
//       return res.status(403).json({ ok: false, msg: "Not authorized" });
//     }
//     // Normal user updates only text
//     if (req.user?.role !== "staff" && req.user?.role !== "admin") {
//       enquiry.text = req.body.text || enquiry.text;
//     } else {
//       // Staff/Admin can update text and status
//       enquiry.text = req.body.text || enquiry.text;
//       enquiry.status = req.body.status || enquiry.status;
//     }
//     await enquiry.save();
//     // Return updated enquiry list after update
//     let enquiries;
//     if (req.user?.role === "staff" || req.user?.role === "admin") {
//       enquiries = await Enquiry.find().populate("user", "name email");
//     } else {
//       enquiries = await Enquiry.find({ user: req.user?._id }).populate("user", "name email");
//     }
//     res.json({ ok: true, enquiry, enquiries });
//   } catch (err: any) {
//     res.status(500).json({ ok: false, msg: err.message });
//   }
// };
//# sourceMappingURL=enquiryController.js.map