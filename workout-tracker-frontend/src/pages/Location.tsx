// src/pages/ManageLocationsPage.tsx
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getLocations, Location, updateLocation, deleteLocation } from "../services/locationService";
import LocationList from "../components/LocationList";
import AddLocation from "../components/AddLocation";

const ManageLocationsPage = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [locationToUpdate, setLocationToUpdate] = useState<Location | null>(null);

  // Fetch locations when the page loads
  const fetchLocations = async () => {
    try {
      const data = await getLocations();
      setLocations(data);
    } catch (error) {
      toast.error("Failed to load locations");
    }
  };

  // Fetch locations when the page is first loaded
  useEffect(() => {
    fetchLocations();
  }, []);

  // Handle updating a location
  const handleUpdateLocation = async (id: string, name: string) => {
    try {
      await updateLocation(id, { label: name, value: name });
      toast.success("Location updated successfully!");
      fetchLocations(); // Refetch locations after update
    } catch (error) {
      toast.error("Failed to update location");
    }
  };

  // Handle deleting a location
  const handleDeleteLocation = async (id: string) => {
    try {
      await deleteLocation(id);
      toast.success("Location deleted successfully!");
      fetchLocations(); // Refetch locations after delete
    } catch (error) {
      toast.error("Failed to delete location");
    }
  };

  return (
    <div className="manage-locations-page">
      <h1>Manage Locations</h1>

      {/* Add New Location Form */}
      <AddLocation onLocationAdded={fetchLocations} />

      {/* Display Location List */}
      <LocationList
        locations={locations}
        onUpdate={setLocationToUpdate} // Set the location to update
        onDelete={handleDeleteLocation}
      />

      {/* Update Location Form (if locationToUpdate is set) */}
      {locationToUpdate && (
        <div className="update-location-container">
          <h2>Update Location: {locationToUpdate.label}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateLocation(locationToUpdate.id, locationToUpdate.label);
              setLocationToUpdate(null); // Clear the location after update
            }}
          >
            <input
              type="text"
              value={locationToUpdate.label}
              onChange={(e) => setLocationToUpdate({ ...locationToUpdate, label: e.target.value })}
              placeholder="Location Name"
              required
            />
            <button type="submit">Update Location</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageLocationsPage;
