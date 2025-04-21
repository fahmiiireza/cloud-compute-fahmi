import { useEffect, useState } from "react";
import { getWorkouts, Workout } from "../services/workoutService";
import { getWorkoutUnits, WorkoutUnit } from "../services/unitService";
import { getLocations, Location } from "../services/locationService";
import AddWorkout from "./AddWorkout";
import WorkoutList from "./WorkoutList";
import { toast } from "react-toastify";

const WorkoutPage = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [units, setUnits] = useState<WorkoutUnit[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  const fetchWorkouts = async () => {
    try {
      const data = await getWorkouts();
      setWorkouts(data);
    } catch (error) {
      toast.error("Failed to fetch workouts");
    }
  };

  const fetchUnits = async () => {
    try {
      const data = await getWorkoutUnits();
      setUnits(data);
    } catch (error) {
      toast.error("Failed to fetch units");
    }
  };

  const fetchLocations = async () => {
    try {
      const data = await getLocations();
      setLocations(data);
    } catch (error) {
      toast.error("Failed to fetch locations");
    }
  };

  useEffect(() => {
    fetchWorkouts();
    fetchUnits();
    fetchLocations();
  }, []);

  return (
    <div>
      <AddWorkout onWorkoutAdded={fetchWorkouts} units={units} locations={locations} />
      <WorkoutList
        workouts={workouts}
        setWorkouts={setWorkouts}
        onEditFinish={fetchWorkouts}
        units={units}
        locations={locations}
      />
    </div>
  );
};

export default WorkoutPage;
