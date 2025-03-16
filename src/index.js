import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import workoutRoutes from "./routes/workoutRoutes.js";
import authRoutes from "./routes/auth.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/workouts", workoutRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5011;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
