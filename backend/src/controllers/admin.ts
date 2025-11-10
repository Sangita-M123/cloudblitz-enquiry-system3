import { Request, Response } from "express";
import { User } from "../models/User";
import { Enquiry } from "../models/Enquiry";

/**
 *  Get all users (Admin only)
 * Returns all users except password hash.
 */
export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select("-passwordHash");
    res.json({ ok: true, users });
  } catch (err: any) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

/**
 *  Assign enquiry to staff (Admin only)
 * Sets assignedTo and marks enquiry as In Progress.
 */
export const assignEnquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    const { enquiryId, staffId } = req.body;

    if (!enquiryId || !staffId) {
      res.status(400).json({ ok: false, msg: "Missing enquiryId or staffId" });
      return;
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      enquiryId,
      { assignedTo: staffId, status: "In Progress" },
      { new: true }
    );

    if (!enquiry) {
      res.status(404).json({ ok: false, msg: "Enquiry not found" });
      return;
    }

    res.json({ ok: true, msg: "Enquiry assigned successfully", enquiry });
  } catch (err: any) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

/**
 *  Permanently delete enquiry (Admin only)
 * Removes enquiry completely from the database.
 */
export const deleteEnquiryPermanently = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const enquiry = await Enquiry.findByIdAndDelete(id);
    if (!enquiry) {
      res.status(404).json({ ok: false, msg: "Enquiry not found" });
      return;
    }

    res.json({ ok: true, msg: "Enquiry permanently deleted" });
  } catch (err: any) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};
