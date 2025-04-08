import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import WorkoutList from "../components/WorkoutList";
import AddWorkout from "../components/AddWorkout";
import { getWorkouts } from "../services/workoutService";
import { toast } from "react-toastify";
import "./Home.css"; // Make sure to create this file if not exists

interface Workout {
  id: string;
  name: string;
  duration: number;
}

const Home = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const navigate = useNavigate();

  const fetchWorkouts = async () => {
    try {
      const data = await getWorkouts();
      setWorkouts(data);
    } catch (error) {
      toast.error("Failed to load workouts");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      } else {
        fetchWorkouts();
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Workout Tracker</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header>

      <AddWorkout onWorkoutAdded={fetchWorkouts} />
      <WorkoutList
        workouts={workouts}
        setWorkouts={setWorkouts}
        onEditFinish={fetchWorkouts}
      />
    </div>
  );
};

export default Home;
