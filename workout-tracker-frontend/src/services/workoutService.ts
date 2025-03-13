const API_URL = import.meta.env.VITE_API_URL;

export interface Workout {
  id: string;
  name: string;
  duration: number;
}

// Fetch workouts
export const getWorkouts = async (): Promise<Workout[]> => {
  const response = await fetch(`${API_URL}/workouts`);
  return response.json();
};

// Add workout
export const addWorkout = async (workout: { name: string; duration: number }): Promise<Workout> => {
  const response = await fetch(`${API_URL}/workouts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(workout),
  });
  return response.json();
};

export const updateWorkout = async (id: string, updatedData: { name: string; duration: number }) => {
    const response = await fetch(`http://localhost:5000/workouts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) throw new Error("Failed to update workout");
  };
  

// Delete workout
export const deleteWorkout = async (id: string): Promise<void> => {
  await fetch(`${API_URL}/workouts/${id}`, { method: "DELETE" });
};
