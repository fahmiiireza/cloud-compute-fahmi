import { useState } from "react";
import { updateWorkoutUnit } from "../services/unitService";
import { toast } from "react-toastify";

const UpdateWorkoutUnit = ({
  unit,
  onUnitUpdated,
}: {
  unit: { id: string; name: string };
  onUnitUpdated: () => void;
}) => {
  const [name, setName] = useState(unit.name);

  const handleUpdate = async () => {
    if (!name) {
      toast.error("Unit name is required");
      return;
    }

    try {
      await updateWorkoutUnit(unit.id, { label: name, value: name });
      toast.success("Workout unit updated!");
      onUnitUpdated();
    } catch {
      toast.error("Failed to update workout unit");
    }
  };

  return (
    <div className="update-workout-unit">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Workout Unit Name"
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default UpdateWorkoutUnit;
