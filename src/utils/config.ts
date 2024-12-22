import dotenv from "dotenv";

dotenv.config();

export const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/grocery-booking";
export const JWT_SECRET = process.env.JWT_SECRET || "your-jwt-secret-key";
