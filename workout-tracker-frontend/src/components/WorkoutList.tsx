import { useState } from "react";
import { deleteWorkout, updateWorkout } from "../services/workoutService";
import { toast } from "react-toastify";
import "./WorkoutList.css";
import { WorkoutUnit } from "../services/unitService";

interface Workout {
  id: string;
  name: string;
  amount: number;
  unitId: string;
}

interface WorkoutListProps {
  workouts: Workout[];
  setWorkouts: React.Dispatch<React.SetStateAction<Workout[]>>;
  onEditFinish: () => void;
  units: WorkoutUnit[];
}

const WorkoutList = ({ workouts, setWorkouts, onEditFinish, units }: WorkoutListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedAmount, setUpdatedAmount] = useState<number>(0);
  const [updatedUnitId, setUpdatedUnitId] = useState<string>("");

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
    setUpdatedAmount(workout.amount);
    setUpdatedUnitId(workout.unitId);
  };

  const handleUpdate = async (id: string) => {
    if (!updatedName || updatedAmount <= 0 || !updatedUnitId) {
      toast.error("Invalid workout details");
      return;
    }

    try {
      await updateWorkout(id, {
        name: updatedName,
        amount: updatedAmount,
        unitId: updatedUnitId,
      });
      toast.success("Workout updated!");
      setEditingId(null);
      onEditFinish(); // Refresh the workout list
    } catch (error) {
      toast.error("Failed to update workout");
    }
  };

  const getUnitName = (unitId: string) => {
    const unit = units.find((u) => u.id === unitId);
    return unit ? unit.label : "Unknown unit";
  };

  return (
    <div>
      <h2>Workouts</h2>
      {workouts.length === 0 && <p>No workouts added yet.</p>}
      {workouts.map((workout) => (
        <div key={workout.id} className="workout-item">
          {editingId === workout.id ? (
            <div>
              <input
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
              <input
                type="number"
                value={updatedAmount}
                onChange={(e) => setUpdatedAmount(Number(e.target.value))}
              />
              <select
                value={updatedUnitId}
                onChange={(e) => setUpdatedUnitId(e.target.value)}
              >
                <option value="">Select Unit</option>
                {units.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.label}
                  </option>
                ))}
              </select>
              <button onClick={() => handleUpdate(workout.id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              <p>
                <strong>{workout.name}</strong> - {workout.amount}{" "}
                {getUnitName(workout.unitId)}
              </p>
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
