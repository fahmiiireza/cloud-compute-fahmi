import { db } from "../../firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

// Define the type for a Workout Unit
export interface WorkoutUnit {
  id: string;
  label: string;
  value: string;
}

// Reference to the "workout_units" collection in Firestore
const unitsCollection = collection(db, "workout_units");

// Get all workout units
export const getWorkoutUnits = async (): Promise<WorkoutUnit[]> => {
  const snapshot = await getDocs(unitsCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as WorkoutUnit));
};

// Add a new workout unit
export const addWorkoutUnit = async (unit: { label: string; value: string }) => {
  await addDoc(unitsCollection, unit);
};

// Update an existing workout unit
export const updateWorkoutUnit = async (id: string, unit: { label: string; value: string }) => {
  const unitDoc = doc(db, "workout_units", id);
  await updateDoc(unitDoc, unit);
};

// Delete a workout unit
export const deleteWorkoutUnit = async (id: string) => {
  const unitDoc = doc(db, "workout_units", id);
  await deleteDoc(unitDoc);
};
