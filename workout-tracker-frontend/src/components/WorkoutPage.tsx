import { useEffect, useState } from "react";
import { getWorkouts } from "../services/workoutService";
import AddWorkout from "./AddWorkout";
import WorkoutList from "./WorkoutList";
import { toast } from "react-toastify";

export interface Workout {
  id: string;
  name: string;
  duration: number;
}

const WorkoutPage = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const fetchWorkouts = async () => {
    try {
      const data = await getWorkouts();
      setWorkouts(data);
    } catch (error) {
      toast.error("Failed to fetch workouts");
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div>
      <AddWorkout onWorkoutAdded={fetchWorkouts} />
      <WorkoutList workouts={workouts} setWorkouts={setWorkouts} onEditFinish={fetchWorkouts} />
    </div>
  );
};

export default WorkoutPage;
