// src/components/AddLocation.tsx
import { useState } from "react";
import { toast } from "react-toastify";
import { addLocation } from "../services/locationService";

interface AddLocationProps {
  onLocationAdded: () => void;
}

const AddLocation = ({ onLocationAdded }: AddLocationProps) => {
  const [locationName, setLocationName] = useState("");

  const handleAddLocation = async () => {
    if (!locationName) {
      toast.error("Please provide a location name.");
      return;
    }

    try {
      await addLocation({ label: locationName, value: locationName });
      toast.success("Location added successfully!");
      onLocationAdded(); // Call the function passed as prop to refetch locations
      setLocationName(""); // Clear input field
    } catch (error) {
      toast.error("Failed to add location.");
    }
  };

  return (
    <div>
      <h3>Add New Location</h3>
      <input
        type="text"
        value={locationName}
        onChange={(e) => setLocationName(e.target.value)}
        placeholder="Enter location name"
      />
      <button onClick={handleAddLocation}>Add Location</button>
    </div>
  );
};

export default AddLocation;
