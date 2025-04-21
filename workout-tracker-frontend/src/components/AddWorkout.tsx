import { useState } from "react";
import { addWorkout } from "../services/workoutService";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "./AddWorkout.css";
import { WorkoutUnit } from "../services/unitService";
import { Location } from "../services/locationService";

const AddWorkout = ({
  onWorkoutAdded,
  units,
  locations,
}: {
  onWorkoutAdded: () => void;
  units: WorkoutUnit[];
  locations: Location[];
}) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [unitId, setUnitId] = useState<string>("");
  const [locationId, setLocationId] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || amount <= 0 || !unitId || !locationId) {
      toast.error("Invalid workout details");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      toast.error("You must be logged in to add a workout.");
      return;
    }

    try {
      await addWorkout({ name, amount, unitId, locationId });
      setName("");
      setAmount(0);
      setUnitId("");
      setLocationId("");
      toast.success("Workout added successfully!");
      onWorkoutAdded();
    } catch (error) {
      toast.error("Failed to add workout");
    }
  };

  const handleAddUnit = () => {
    navigate("/add-unit");
  };

  const handleAddLocation = () => {
    navigate("/manage-locations");
  };

  const handleUnitSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "add-your-own") {
      handleAddUnit();
    } else {
      setUnitId(value);
    }
  };

  const handleLocationSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "add-your-own-location") {
      handleAddLocation();
    } else {
      setLocationId(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Workout Name"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Amount (e.g. 10)"
        required
      />
      <select value={unitId} onChange={handleUnitSelect} required>
        <option value="">Select Unit</option>
        {units.map((unit) => (
          <option key={unit.id} value={unit.id}>
            {unit.label}
          </option>
        ))}
        <option value="add-your-own">Add Your Own Unit</option>
      </select>

      <select value={locationId} onChange={handleLocationSelect} required>
        <option value="">Select Location</option>
        {locations.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.label}
          </option>
        ))}
        <option value="add-your-own-location">Add Your Own Location</option>
      </select>

      <button type="submit">Add Workout</button>
    </form>
  );
};

export default AddWorkout;
