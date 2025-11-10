

import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth";
import enquiryRoutes from "./routes/enquiry";
import adminRoutes from "./routes/admin";

dotenv.config();
const app = express();

// CORS configuration
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ ok: true, msg: "API running ✅", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/admin", adminRoutes);

// Serve static files from the React app in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(frontendPath));

  // Handle React routing, return all requests to React app
  app.get(/^(?!\/api).*/, (_req: Request, res: Response) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI!;

(async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📦 Environment: ${process.env.NODE_ENV || "development"}`);
      if (process.env.NODE_ENV === "production") {
        console.log(`🌐 Serving frontend from: ${path.join(__dirname, "../../frontend/dist")}`);
      }
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
})();
