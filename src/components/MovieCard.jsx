import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
        alt={movie.title}
        loading="lazy"
      />
      <h2>{movie.title}</h2>
      <p>⭐ {movie.vote_average}</p>
    </div>
  );
};

export default MovieCard;
