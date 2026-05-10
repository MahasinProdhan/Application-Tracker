import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
await connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({ message: "Server is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/profile", profileRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
