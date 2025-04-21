import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export interface Location {
  id: string;
  label: string;
  value: string;
}

const locationsCollection = collection(db, "locations");

export const getLocations = async (): Promise<Location[]> => {
  const snapshot = await getDocs(locationsCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Location));
};

export const addLocation = async (location: { label: string; value: string }) => {
  await addDoc(locationsCollection, location);
};

export const updateLocation = async (id: string, location: { label: string; value: string }) => {
  const locationDoc = doc(db, "locations", id);
  await updateDoc(locationDoc, location);
};

export const deleteLocation = async (id: string) => {
  const locationDoc = doc(db, "locations", id);
  await deleteDoc(locationDoc);
};

