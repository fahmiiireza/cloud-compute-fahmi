import { useState } from "react";
import { addWorkout } from "../services/workoutService";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./AddWorkout.css";
import { WorkoutUnit } from "../services/unitService";

const AddWorkout = ({
  onWorkoutAdded,
  units,
}: {
  onWorkoutAdded: () => void;
  units: WorkoutUnit[];
}) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [unitId, setUnitId] = useState<string>("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || amount <= 0 || !unitId) {
      toast.error("Invalid workout details");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      toast.error("You must be logged in to add a workout.");
      return;
    }

    try {
      await addWorkout({ name, amount, unitId });
      setName("");
      setAmount(0);
      setUnitId("");
      toast.success("Workout added successfully!");
      onWorkoutAdded();
    } catch (error) {
      toast.error("Failed to add workout");
    }
  };

  const handleAddUnit = () => {
    navigate("/add-unit"); // Navigate to the Add Unit page
  };

  const handleUnitSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "add-your-own") {
      // If "Add Your Own Unit" is selected, navigate to the "Add Unit" page
      handleAddUnit();
    } else {
      setUnitId(value);
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
      <select
        value={unitId}
        onChange={handleUnitSelect}
        required
      >
        <option value="">Select Unit</option>
        {units.map((unit) => (
          <option key={unit.id} value={unit.id}>
            {unit.label}
          </option>
        ))}
        {/* Add the "Add Your Own Unit" option */}
        <option value="add-your-own">Add Your Own Unit</option>
      </select>
      <button type="submit">Add Workout</button>
    </form>
  );
};

export default AddWorkout;
