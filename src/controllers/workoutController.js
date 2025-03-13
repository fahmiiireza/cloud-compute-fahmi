import { createWorkout, getAllWorkouts, updateWorkout, deleteWorkout } from "../services/workoutService.js";

export const createWorkoutHandler = async (req, res) => {
  try {
    const workout = await createWorkout(req.body);
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllWorkoutsHandler = async (_, res) => {
  try {
    const workouts = await getAllWorkouts();
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateWorkoutHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const workout = await updateWorkout(id, req.body);
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteWorkoutHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteWorkout(id);
    res.status(200).json({ message: "Workout deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
