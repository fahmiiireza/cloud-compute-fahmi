import React from "react";
import { WorkoutUnit } from "../services/unitService";

// Define the props type for WorkoutUnitList component
interface WorkoutUnitListProps {
  units: WorkoutUnit[];
  onUpdate: (unit: WorkoutUnit) => void;
  onDelete: (id: string) => void;
}

const WorkoutUnitList: React.FC<WorkoutUnitListProps> = ({ units, onUpdate, onDelete }) => {
  return (
    <div className="workout-unit-list">
      <h2>Workout Units</h2>
      <ul>
        {units.map((unit) => (
          <li key={unit.id}>
            <span>{unit.label} - {unit.value}</span>
            <button onClick={() => onUpdate(unit)}>Edit</button>
            <button onClick={() => onDelete(unit.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutUnitList;
