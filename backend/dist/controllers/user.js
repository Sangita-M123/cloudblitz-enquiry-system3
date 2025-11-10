"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProfile = void 0;
const User_1 = require("../models/User");
const editProfile = async (req, res) => {
    try {
        const user = await User_1.User.findById(req.user._id);
        if (!user)
            return res.status(404).json({ ok: false, msg: "User not found" });
        if (req.body.name)
            user.name = req.body.name;
        if (req.body.email)
            user.email = req.body.email;
        await user.save();
        res.json({ ok: true, msg: "Profile updated", user });
    }
    catch (err) {
        res.status(500).json({ ok: false, msg: err.message });
    }
};
exports.editProfile = editProfile;
//# sourceMappingURL=user.js.map