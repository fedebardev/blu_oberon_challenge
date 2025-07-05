import express from "express";
import dotenv from "dotenv";
import passport from "./passport";
import authRoutes from "./routes/authRoutes";
import jobRoutes from "./routes/jobRoutes";
import { AppDataSource } from "./data-source";


dotenv.config();
const app = express();
app.use(express.json());
app.use(passport.initialize());

AppDataSource.initialize().then(() => {
  console.log("✅ DB connected");
  app.use("/auth", authRoutes);
  app.use("/jobs", jobRoutes);

  app.listen(3000, () => console.log("🚀 Server on http://localhost:3000"));
});
