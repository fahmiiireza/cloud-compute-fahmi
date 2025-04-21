import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import WorkoutList from "../components/WorkoutList";
import AddWorkout from "../components/AddWorkout";
import { getWorkouts, Workout } from "../services/workoutService";
import { getWorkoutUnits, WorkoutUnit } from "../services/unitService";
import { getLocations, Location } from "../services/locationService";
import { toast } from "react-toastify";
import "./Home.css";

const Home = () => {
  console.log("Home component is rendering...");
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [units, setUnits] = useState<WorkoutUnit[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
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
      console.log("🏋️ Units fetched in Home:", data);
      setUnits(data);
    } catch (error) {
      toast.error("Failed to load workout units");
    }
  };

  const fetchLocations = async () => {
    try {
      const data = await getLocations();
      setLocations(data);
    } catch (error) {
      toast.error("Failed to load locations");
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
        fetchLocations();
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

export default Home;
