// ViewMovies.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "./context/FirebaseContext";

function ViewMovies() {
  const { movies, deleteMovie } = useFirebase();

  return (
    <div>
      <h1>Movies</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/add-movie?id=${movie.id}`}>{movie.title}</Link>
            <button onClick={() => deleteMovie(movie.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <Link to="/add-movie">Add Movie</Link>
    </div>
  );
}

export default ViewMovies;
