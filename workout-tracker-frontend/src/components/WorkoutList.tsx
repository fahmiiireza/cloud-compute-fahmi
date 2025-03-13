import { useEffect, useState } from "react";
import { getWorkouts, deleteWorkout, updateWorkout } from "../services/workoutService";
import { toast } from "react-toastify";
import "./WorkoutList.css";

interface Workout {
  id: string;
  name: string;
  duration: number;
}

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDuration, setUpdatedDuration] = useState<number>(0);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const data = await getWorkouts();
      setWorkouts(data);
    } catch (error) {
      toast.error("Failed to load workouts");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteWorkout(id);
      setWorkouts(workouts.filter((workout) => workout.id !== id));
      toast.success("Workout deleted!");
    } catch (error) {
      toast.error("Failed to delete workout");
    }
  };

  const handleEdit = (workout: Workout) => {
    setEditingId(workout.id);
    setUpdatedName(workout.name);
    setUpdatedDuration(workout.duration);
  };

  const handleUpdate = async (id: string) => {
    if (!updatedName || updatedDuration <= 0) {
      toast.error("Invalid workout details");
      return;
    }

    try {
      await updateWorkout(id, { name: updatedName, duration: updatedDuration });
      toast.success("Workout updated!");
      setEditingId(null);
      fetchWorkouts();
    } catch (error) {
      toast.error("Failed to update workout");
    }
  };

  return (
    <div>
      <h2>Workouts</h2>
      {workouts.length === 0 && <p>No workouts added yet.</p>}
      {workouts.map((workout) => (
        <div key={workout.id} className="workout-item">
          {editingId === workout.id ? (
            <div>
              <input type="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
              <input type="number" value={updatedDuration} onChange={(e) => setUpdatedDuration(Number(e.target.value))} />
              <button onClick={() => handleUpdate(workout.id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              <p><strong>{workout.name}</strong> - {workout.duration} min</p>
              <button onClick={() => handleEdit(workout)}>Edit</button>
              <button onClick={() => handleDelete(workout.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default WorkoutList;
