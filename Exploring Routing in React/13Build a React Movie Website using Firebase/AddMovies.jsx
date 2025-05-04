// AddMovie.jsx
import React, { useState, useEffect } from "react";
import { useFirebase } from "./context/FirebaseContext";
import { useNavigate, useLocation } from "react-router-dom";

function AddMovie() {
  const { addMovie, updateMovie } = useFirebase();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract movie ID from URL if editing
  const movieId = new URLSearchParams(location.search).get("id");

  useEffect(() => {
    if (movieId) {
      setIsEditing(true);
      // Find the movie and pre-fill the form
      const movieToEdit = movies.find(movie => movie.id === movieId);
      if (movieToEdit) {
        setTitle(movieToEdit.title);
        setDescription(movieToEdit.description);
        setReleaseYear(movieToEdit.releaseYear);
      }
    }
  }, [movieId, movies]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const movieData = { title, description, releaseYear };
    
    if (isEditing) {
      updateMovie(movieId, movieData);
    } else {
      addMovie(movieData);
    }

    navigate("/movies");
  };

  return (
    <div>
      <h1>{isEditing ? "Edit Movie" : "Add Movie"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Release Year"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
          required
        />
        <button type="submit">{isEditing ? "Update Movie" : "Add Movie"}</button>
      </form>
    </div>
  );
}

export default AddMovie;
