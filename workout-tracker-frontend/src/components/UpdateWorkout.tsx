import { useState } from "react";
import { updateWorkout } from "../services/workoutService";
import { toast } from "react-toastify";

const UpdateWorkout = ({ workout, onWorkoutUpdated }: { workout: any; onWorkoutUpdated: () => void }) => {
  const [name, setName] = useState(workout.name);
  const [duration, setDuration] = useState(workout.duration);

  const handleUpdate = async () => {
    try {
      await updateWorkout(workout.id, { name, duration });
      toast.success("Workout updated!");
      onWorkoutUpdated();
    } catch {
      toast.error("Failed to update workout");
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded mt-2">
      <input className="border p-2 w-full" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="border p-2 w-full mt-2" type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
      <button className="bg-green-500 text-white p-2 w-full mt-2" onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default UpdateWorkout;
