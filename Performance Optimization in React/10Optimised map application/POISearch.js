import React, { useState, useCallback } from "react";

const POISearch = ({ onSearchResults }) => {
  const [query, setQuery] = useState("");

  // Simulate POI search
  const handleSearch = useCallback(() => {
    // Replace this with real API call for POI search
    const fakeResults = [
      { id: 1, lat: 51.51, lng: -0.1, name: "Coffee Shop" },
      { id: 2, lat: 51.52, lng: -0.12, name: "Library" },
    ];
    onSearchResults(fakeResults);
  }, [onSearchResults]);

  return (
    <div>
      <input
        placeholder="Search POIs..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default React.memo(POISearch);
