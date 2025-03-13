import { useState } from "react";
import { addWorkout } from "../services/workoutService";
import { toast } from "react-toastify";
import "./AddWorkout.css"; // Import the CSS

const AddWorkout = ({ onWorkoutAdded }: { onWorkoutAdded: () => void }) => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || duration <= 0) {
      toast.error("Invalid workout details");
      return;
    }

    try {
        await addWorkout({ name, duration });
        setName("");
        setDuration(0);
        toast.success("Workout added successfully!");
        onWorkoutAdded();
      } catch (error) {
        toast.error("Failed to add workout");
      }
    };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Workout Name" required />
      <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} placeholder="Duration (minutes)" required />
      <button type="submit">Add Workout</button>
    </form>
  );
};

export default AddWorkout;
