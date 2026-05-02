import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

const WatchList = () => {
  const [movies, setMovies] = useState([]);
  const [watchList, setWatchList] = useState([]);

  // 🔥 Fetch movies from backend
  const getMovies = async () => {
    try {
      const res = await api.get("/api/v1/movies");
      setMovies(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Load watchlist from localStorage
  useEffect(() => {
    getMovies();

    const stored = JSON.parse(localStorage.getItem("watchList")) || [];
    setWatchList(stored);
  }, []);

  // ✅ Add to watchlist
  const addToWatchList = (movie) => {
    const exists = watchList.find(m => m.imdbId === movie.imdbId);
    if (exists) return;

    const updated = [...watchList, movie];
    setWatchList(updated);
    localStorage.setItem("watchList", JSON.stringify(updated));
  };

  // ❌ Remove
  const removeFromWatchList = (id) => {
    const updated = watchList.filter(m => m.imdbId !== id);
    setWatchList(updated);
    localStorage.setItem("watchList", JSON.stringify(updated));
  };

  return (
    <div style={{ padding: "20px" }}>

      {/* 🎬 MOVIES SECTION */}
      <h2>All Movies</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {movies.map((movie) => (
          <div key={movie.imdbId} style={{ width: "200px" }}>
            
            {/* 🎯 IMAGE FROM BACKEND */}
            <img
              src={movie.poster}   // 👈 make sure backend sends "poster"
              alt={movie.title}
              style={{ width: "100%", borderRadius: "10px" }}
            />

            <h4>{movie.title}</h4>

            <button onClick={() => addToWatchList(movie)}>
              Add
            </button>
          </div>
        ))}
      </div>

      {/* ⭐ WATCHLIST */}
      <h2 style={{ marginTop: "40px" }}>My Watch List</h2>

      {watchList.length === 0 ? (
        <p>No movies added</p>
      ) : (
        <div style={{ display: "flex", gap: "20px" }}>
          {watchList.map((movie) => (
            <div key={movie.imdbId} style={{ width: "200px" }}>
              
              <img
                src={movie.poster}
                alt={movie.title}
                style={{ width: "100%" }}
              />

              <h4>{movie.title}</h4>

              <button onClick={() => removeFromWatchList(movie.imdbId)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchList;