// context/FirebaseContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase-config";

const FirebaseContext = createContext();

export const FirebaseContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const snapshot = await db.collection("movies").get();
      const movieList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMovies(movieList);
    };
    fetchMovies();
  }, []);

  const addMovie = async (movieData) => {
    await db.collection("movies").add(movieData);
    const snapshot = await db.collection("movies").get();
    const movieList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setMovies(movieList);
  };

  const updateMovie = async (id, movieData) => {
    await db.collection("movies").doc(id).update(movieData);
    const snapshot = await db.collection("movies").get();
    const movieList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setMovies(movieList);
  };

  const deleteMovie = async (id) => {
    await db.collection("movies").doc(id).delete();
    const snapshot = await db.collection("movies").get();
    const movieList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setMovies(movieList);
  };

  return (
    <FirebaseContext.Provider value={{ movies, addMovie, updateMovie, deleteMovie }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
