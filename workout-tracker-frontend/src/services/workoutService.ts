import { db } from "../../firebase";
import { auth } from "../../firebase";
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where 
} from "firebase/firestore";

export interface Workout {
  id: string;
  name: string;
  amount: number;
  unitId: string;
}


const workoutsCollection = collection(db, "workouts");

// Fetch workouts
export const getWorkouts = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const q = query(collection(db, "workouts"), where("uid", "==", user.uid));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as Workout[];
};

export const addWorkout = async (workout: { name: string; amount: number; unitId: string }) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const newWorkout = { ...workout, uid: user.uid };
  const docRef = await addDoc(workoutsCollection, newWorkout);
  return { id: docRef.id, ...newWorkout };
};

export const updateWorkout = async (id: string, updatedData: { name: string; amount: number; unitId: string }) => {
  const workoutDoc = doc(db, "workouts", id);
  await updateDoc(workoutDoc, updatedData);
};


// Delete workout
export const deleteWorkout = async (id: string): Promise<void> => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const docSnapshot = await getDocs(query(collection(db, "workouts"), where("__name__", "==", id), where("uid", "==", user.uid)));

  if (docSnapshot.empty) throw new Error("Unauthorized to delete this workout");

  const workoutDoc = doc(db, "workouts", id);
  await deleteDoc(workoutDoc);
};

