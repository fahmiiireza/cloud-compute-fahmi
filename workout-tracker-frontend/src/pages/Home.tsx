import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import WorkoutList from "../components/WorkoutList";
import AddWorkout from "../components/AddWorkout";
import { getWorkouts, Workout } from "../services/workoutService";
import { getWorkoutUnits, WorkoutUnit } from "../services/unitService";
import { toast } from "react-toastify";
import "./Home.css";

const Home = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [units, setUnits] = useState<WorkoutUnit[]>([]);
  const navigate = useNavigate();

  const fetchWorkouts = async () => {
    try {
      const data = await getWorkouts();
      setWorkouts(data);
    } catch (error) {
      toast.error("Failed to load workouts");
    }
  };

  const fetchWorkoutUnits = async () => {
    try {
      const data = await getWorkoutUnits();
      setUnits(data);
    } catch (error) {
      toast.error("Failed to load workout units");
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
        fetchWorkoutUnits();
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

      <AddWorkout onWorkoutAdded={fetchWorkouts} units={units} />
      <WorkoutList
        workouts={workouts}
        setWorkouts={setWorkouts}
        onEditFinish={fetchWorkouts}
        units={units}
      />
    </div>
  );
};

export default Home;
