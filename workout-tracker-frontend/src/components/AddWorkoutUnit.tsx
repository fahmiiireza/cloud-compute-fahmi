import { useState } from "react";
import { addWorkoutUnit } from "../services/unitService";
import { toast } from "react-toastify";

const AddWorkoutUnit = ({ onUnitAdded }: { onUnitAdded: () => void }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      toast.error("Workout unit name is required");
      return;
    }

    try {
      await addWorkoutUnit({ label: name, value: name });
      toast.success("Workout unit added successfully!");
      onUnitAdded();
      setName("");
    } catch (error) {
      toast.error("Failed to add workout unit");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-workout-unit-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Workout Unit Name"
        required
      />
      <button type="submit">Add Unit</button>
    </form>
  );
};

export default AddWorkoutUnit;
