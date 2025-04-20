import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getWorkoutUnits, WorkoutUnit, updateWorkoutUnit, deleteWorkoutUnit } from "../services/unitService";
import WorkoutUnitList from "../components/WorkoutUnitList";
import AddWorkoutUnit from "../components/AddWorkoutUnit";

const ManageUnitsPage = () => {
  const [units, setUnits] = useState<WorkoutUnit[]>([]);
  const [unitToUpdate, setUnitToUpdate] = useState<WorkoutUnit | null>(null);

  // Fetch workout units when the page loads
  const fetchUnits = async () => {
    try {
      const data = await getWorkoutUnits();
      setUnits(data);
    } catch (error) {
      toast.error("Failed to load workout units");
    }
  };

  // Fetch units when the page is first loaded
  useEffect(() => {
    fetchUnits();
  }, []);

  // Handle updating a workout unit
  const handleUpdateUnit = async (id: string, label: string, value: string) => {
    try {
      await updateWorkoutUnit(id, { label, value });
      toast.success("Workout unit updated successfully!");
      fetchUnits(); // Refetch units after update
    } catch (error) {
      toast.error("Failed to update workout unit");
    }
  };

  // Handle deleting a workout unit
  const handleDeleteUnit = async (id: string) => {
    try {
      await deleteWorkoutUnit(id);
      toast.success("Workout unit deleted successfully!");
      fetchUnits(); // Refetch units after delete
    } catch (error) {
      toast.error("Failed to delete workout unit");
    }
  };

  return (
    <div className="manage-units-page">
      <h1>Manage Workout Units</h1>

      {/* Add New Unit Form */}
      <AddWorkoutUnit onUnitAdded={fetchUnits} />

      {/* Display Workout Units List */}
      <WorkoutUnitList
        units={units}
        onUpdate={setUnitToUpdate} // Set the unit to update
        onDelete={handleDeleteUnit}
      />

      {/* Update Workout Unit Form (if unitToUpdate is set) */}
      {unitToUpdate && (
        <div className="update-unit-container">
          <h2>Update Unit: {unitToUpdate.label}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateUnit(unitToUpdate.id, unitToUpdate.label, unitToUpdate.value);
              setUnitToUpdate(null); // Clear the unit after update
            }}
          >
            <input
              type="text"
              value={unitToUpdate.label}
              onChange={(e) => setUnitToUpdate({ ...unitToUpdate, label: e.target.value })}
              placeholder="Unit Label"
              required
            />
            <input
              type="text"
              value={unitToUpdate.value}
              onChange={(e) => setUnitToUpdate({ ...unitToUpdate, value: e.target.value })}
              placeholder="Unit Value"
              required
            />
            <button type="submit">Update Unit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageUnitsPage;
