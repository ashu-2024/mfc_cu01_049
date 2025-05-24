import React, { memo } from "react";
import { MapContainer as LeafletMap, TileLayer, Marker, Polyline } from "react-leaflet";

const MapContainer = ({
  currentLocation,
  destination,
  route,
  poiMarkers,
}) => {
  const center = currentLocation ? [currentLocation.lat, currentLocation.lng] : [51.505, -0.09]; // Default center

  return (
    <LeafletMap center={center} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {currentLocation && <Marker position={[currentLocation.lat, currentLocation.lng]} />}
      {destination && <Marker position={[destination.lat, destination.lng]} />}

      {route && <Polyline positions={route.map(p => [p.lat, p.lng])} color="blue" />}

      {/* POI Markers memoized from App */}
      {poiMarkers}
    </LeafletMap>
  );
};

export default memo(MapContainer);
