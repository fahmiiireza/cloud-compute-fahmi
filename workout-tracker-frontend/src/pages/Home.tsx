import WorkoutList from "../components/WorkoutList";
import AddWorkout from "../components/AddWorkout";
import { useState } from "react";

const Home = () => {
    const [refresh, setRefresh] = useState(false);

    const handleWorkoutAdded = () => {
      setRefresh(!refresh); // This will trigger a re-render
    };
  return (
    <div>
      <h1>Workout Tracker</h1>
      <AddWorkout onWorkoutAdded={handleWorkoutAdded} />
      <WorkoutList />
    </div>
  );
};

export default Home;
