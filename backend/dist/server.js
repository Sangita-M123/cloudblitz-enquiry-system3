"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const db_1 = require("./config/db");
const auth_1 = __importDefault(require("./routes/auth"));
const enquiry_1 = __importDefault(require("./routes/enquiry"));
const admin_1 = __importDefault(require("./routes/admin"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// CORS configuration
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Health check
app.get("/api/health", (_req, res) => {
    res.json({ ok: true, msg: "API running ✅", timestamp: new Date().toISOString() });
});
// API Routes
app.use("/api/auth", auth_1.default);
app.use("/api/enquiries", enquiry_1.default);
app.use("/api/admin", admin_1.default);
// Serve static files from the React app in production
if (process.env.NODE_ENV === "production") {
    const frontendPath = path_1.default.join(__dirname, "../../frontend/dist");
    app.use(express_1.default.static(frontendPath));
    // Handle React routing, return all requests to React app
    app.get(/^(?!\/api).*/, (_req, res) => {
        res.sendFile(path_1.default.join(frontendPath, "index.html"));
    });
}
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
(async () => {
    try {
        await (0, db_1.connectDB)(MONGO_URI);
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📦 Environment: ${process.env.NODE_ENV || "development"}`);
            if (process.env.NODE_ENV === "production") {
                console.log(`🌐 Serving frontend from: ${path_1.default.join(__dirname, "../../frontend/dist")}`);
            }
        });
    }
    catch (err) {
        console.error("❌ Failed to start server:", err);
        process.exit(1);
    }
})();
//# sourceMappingURL=server.js.map