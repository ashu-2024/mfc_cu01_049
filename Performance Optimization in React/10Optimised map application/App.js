import React, { useState, useCallback, useMemo } from "react";
import MapContainer from "./MapContainer";
import LocationInput from "./LocationInput";
import POISearch from "./POISearch";
import RouteInfo from "./RouteInfo";

function App() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [route, setRoute] = useState(null);
  const [pois, setPOIs] = useState([]);

  // Update current location
  const handleSetCurrentLocation = useCallback((location) => {
    setCurrentLocation(location);
  }, []);

  // Update destination
  const handleSetDestination = useCallback((location) => {
    setDestination(location);
  }, []);

  // Fetch route - simulate or call API (memoize to avoid rerun)
  const calculateRoute = useCallback(() => {
    if (!currentLocation || !destination) return null;

    // Call routing API or simulate route here...
    // For demo, just return dummy route between points
    const dummyRoute = [
      currentLocation,
      { lat: (currentLocation.lat + destination.lat) / 2, lng: (currentLocation.lng + destination.lng) / 2 },
      destination,
    ];
    setRoute(dummyRoute);
  }, [currentLocation, destination]);

  // Update route whenever currentLocation or destination changes
  React.useEffect(() => {
    calculateRoute();
  }, [calculateRoute]);

  // POI search callback
  const handlePOISearch = useCallback((results) => {
    setPOIs(results);
  }, []);

  // Memoize POI markers to avoid rerenders
  const poiMarkers = useMemo(() => {
    return pois.map((poi) => (
      <MapContainer.Marker key={poi.id} position={[poi.lat, poi.lng]} />
    ));
  }, [pois]);

  return (
    <div>
      <LocationInput
        currentLocation={currentLocation}
        destination={destination}
        setCurrentLocation={handleSetCurrentLocation}
        setDestination={handleSetDestination}
      />
      <POISearch onSearchResults={handlePOISearch} />
      <MapContainer
        currentLocation={currentLocation}
        destination={destination}
        route={route}
        poiMarkers={poiMarkers}
      />
      <RouteInfo route={route} />
    </div>
  );
}

export default App;
