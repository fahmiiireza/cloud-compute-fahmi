import { useState } from "react";
import { updateWorkout } from "../services/workoutService";
import { toast } from "react-toastify";
import { WorkoutUnit } from "../services/unitService";
import { Location } from "../services/locationService";

const UpdateWorkout = ({
  workout,
  onWorkoutUpdated,
  units,
  locations,
}: {
  workout: any;
  onWorkoutUpdated: () => void;
  units: WorkoutUnit[];
  locations: Location[];
}) => {
  const [name, setName] = useState(workout.name);
  const [amount, setAmount] = useState(workout.amount);
  const [unitId, setUnitId] = useState(workout.unitId);
  const [locationId, setLocationId] = useState(workout.locationId);

  const handleUpdate = async () => {
    try {
      await updateWorkout(workout.id, { name, amount, unitId, locationId });
      toast.success("Workout updated!");
      onWorkoutUpdated();
    } catch {
      toast.error("Failed to update workout");
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded mt-2">
      <input
        className="border p-2 w-full"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-2 w-full mt-2"
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select
        className="border p-2 w-full mt-2"
        value={unitId}
        onChange={(e) => setUnitId(e.target.value)}
      >
        <option value="">Select Unit</option>
        {units.map((unit) => (
          <option key={unit.id} value={unit.id}>
            {unit.label}
          </option>
        ))}
      </select>
      <select
        className="border p-2 w-full mt-2"
        value={locationId}
        onChange={(e) => setLocationId(e.target.value)}
      >
        <option value="">Select Location</option>
        {locations.map((location) => (
          <option key={location.id} value={location.id}>
            {location.label}
          </option>
        ))}
      </select>
      <button
        className="bg-green-500 text-white p-2 w-full mt-2"
        onClick={handleUpdate}
      >
        Update
      </button>
    </div>
  );
};

export default UpdateWorkout;
