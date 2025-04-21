// src/components/LocationList.tsx
import { Location } from "../services/locationService";

interface LocationListProps {
  locations: Location[];
  onUpdate: (location: Location) => void;
  onDelete: (id: string) => void;
}

const LocationList = ({ locations, onUpdate, onDelete }: LocationListProps) => {
  return (
    <div>
      <h2>Location List</h2>
      {locations.length > 0 ? (
        <ul>
          {locations.map((location) => (
            <li key={location.id}>
              {location.label}
              <button onClick={() => onUpdate(location)}>Update</button>
              <button onClick={() => onDelete(location.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No locations found</p>
      )}
    </div>
  );
};

export default LocationList;
