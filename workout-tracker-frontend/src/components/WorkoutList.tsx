import { useState } from "react";
import { deleteWorkout, updateWorkout, Workout } from "../services/workoutService";
import { toast } from "react-toastify";
import "./WorkoutList.css";
import { WorkoutUnit } from "../services/unitService";
import { Location } from "../services/locationService";

interface WorkoutListProps {
  workouts: Workout[];
  setWorkouts: React.Dispatch<React.SetStateAction<Workout[]>>;
  onEditFinish: () => void;
  units: WorkoutUnit[];
  locations: Location[];
}

const WorkoutList = ({ workouts, setWorkouts, onEditFinish, units, locations }: WorkoutListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedAmount, setUpdatedAmount] = useState<number>(0);
  const [updatedUnitId, setUpdatedUnitId] = useState<string>("");
  const [updatedLocationId, setUpdatedLocationId] = useState<string>("");

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
    setUpdatedLocationId(workout.locationId || "");
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
        locationId: updatedLocationId,
      });
      toast.success("Workout updated!");
      setEditingId(null);
      onEditFinish();
    } catch (error) {
      toast.error("Failed to update workout");
    }
  };

  const getUnitName = (unitId: string) => {
    const unit = units.find((u) => u.id === unitId);
    return unit ? unit.label : "Unknown unit";
  };

  const getLocationName = (locationId?: string) => {
    if (!locationId) return "No location";
    const location = locations.find((l) => l.id === locationId);
    return location ? location.label : "Unknown location";
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
              <select
                value={updatedLocationId}
                onChange={(e) => setUpdatedLocationId(e.target.value)}
              >
                <option value="">Select Location</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.label}
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
                {getUnitName(workout.unitId)} at {getLocationName(workout.locationId)}
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
