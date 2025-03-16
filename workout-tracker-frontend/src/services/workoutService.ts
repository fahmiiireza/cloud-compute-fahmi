import { db } from "../../firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

export interface Workout {
  id: string;
  name: string;
  duration: number;
}

const workoutsCollection = collection(db, "workouts");

// Fetch workouts
export const getWorkouts = async (): Promise<Workout[]> => {
  const querySnapshot = await getDocs(workoutsCollection);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Workout[];
};

// Add workout
export const addWorkout = async (workout: { name: string; duration: number }): Promise<Workout> => {
  const docRef = await addDoc(workoutsCollection, workout);
  return { id: docRef.id, ...workout };
};

// Update workout
export const updateWorkout = async (id: string, updatedData: { name: string; duration: number }) => {
  const workoutDoc = doc(db, "workouts", id);
  await updateDoc(workoutDoc, updatedData);
};

// Delete workout
export const deleteWorkout = async (id: string): Promise<void> => {
  const workoutDoc = doc(db, "workouts", id);
  await deleteDoc(workoutDoc);
};
