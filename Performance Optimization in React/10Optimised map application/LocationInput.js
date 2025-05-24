import React, { memo } from "react";

const LocationInput = ({
  currentLocation,
  destination,
  setCurrentLocation,
  setDestination,
}) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Enter current location"
        onChange={e =>
          setCurrentLocation({ lat: parseFloat(e.target.value.split(",")[0]), lng: parseFloat(e.target.value.split(",")[1]) })
        }
        value={currentLocation ? `${currentLocation.lat},${currentLocation.lng}` : ""}
      />
      <input
        type="text"
        placeholder="Enter destination"
        onChange={e =>
          setDestination({ lat: parseFloat(e.target.value.split(",")[0]), lng: parseFloat(e.target.value.split(",")[1]) })
        }
        value={destination ? `${destination.lat},${destination.lng}` : ""}
      />
    </div>
  );
};

export default memo(LocationInput);
