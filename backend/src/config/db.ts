import mongoose from "mongoose";

export const connectDB = async (mongoUri: string): Promise<void> => {
  try {
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};
