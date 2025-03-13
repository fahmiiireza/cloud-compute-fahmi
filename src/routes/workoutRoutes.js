import express from "express";
import {
  createWorkoutHandler,
  getAllWorkoutsHandler,
  updateWorkoutHandler,
  deleteWorkoutHandler,
} from "../controllers/workoutController.js";

const router = express.Router();

router.post("/", createWorkoutHandler);
router.get("/", getAllWorkoutsHandler);
router.put("/:id", updateWorkoutHandler);
router.delete("/:id", deleteWorkoutHandler);

export default router;
