import { db } from "../config/firebase.js";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

const workoutCollection = collection(db, "workouts");

// Create Workout
export const createWorkout = async (workoutData) => {
  const docRef = await addDoc(workoutCollection, workoutData);
  return { id: docRef.id, ...workoutData };
};

// Get All Workouts
export const getAllWorkouts = async () => {
  const querySnapshot = await getDocs(workoutCollection);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Update Workout
export const updateWorkout = async (id, updateData) => {
  const workoutRef = doc(db, "workouts", id);
  await updateDoc(workoutRef, updateData);
  return { id, ...updateData };
};

// Delete Workout
export const deleteWorkout = async (id) => {
  const workoutRef = doc(db, "workouts", id);
  await deleteDoc(workoutRef);
  return { id };
};
