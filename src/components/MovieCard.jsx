import styled from 'styled-components';

const MovieCard = ({ movie }) => {
  return (
    <>
      <img
        src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
        alt={movie.title}
        loading='lazy'
      />
      <div>
        <h2>{movie.title}</h2>
        <p>⭐ {movie.vote_average}</p>
      </div>
    </>
  );
};

export default MovieCard;
