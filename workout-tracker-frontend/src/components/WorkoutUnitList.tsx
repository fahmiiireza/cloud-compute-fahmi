import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { WorkoutUnit, getWorkoutUnits ,deleteWorkoutUnit} from "../services/unitService";

interface WorkoutUnitListProps {
  onUnitDeleted: () => void;
}

const WorkoutUnitList = ({ onUnitDeleted }: WorkoutUnitListProps) => {
  const [units, setUnits] = useState<WorkoutUnit[]>([]);

  const fetchWorkoutUnits = async () => {
    try {
      const data = await getWorkoutUnits();
      setUnits(data);
    } catch (error) {
      toast.error("Failed to fetch workout units");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteWorkoutUnit(id);
      setUnits(units.filter((unit) => unit.id !== id));
      toast.success("Workout unit deleted!");
      onUnitDeleted(); // Refresh parent component or trigger re-fetch
    } catch (error) {
      toast.error("Failed to delete workout unit");
    }
  };

  useEffect(() => {
    fetchWorkoutUnits();
  }, []);

  return (
    <div className="workout-unit-list">
      <h2>Workout Units</h2>
      {units.length === 0 && <p>No workout units found.</p>}
      {units.map((unit) => (
        <div key={unit.id} className="workout-unit-item">
          <span>{unit.label}</span>
          <button onClick={() => handleDelete(unit.id)} className="delete-btn">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default WorkoutUnitList;
