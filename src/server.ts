import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import adminRoutes from "./routes/adminRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import { MONGO_URI } from "./utils/config";

const app = express();
const port = 5000;

app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
