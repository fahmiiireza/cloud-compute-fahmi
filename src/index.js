import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import workoutRoutes from "./routes/workoutRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/workouts", workoutRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
