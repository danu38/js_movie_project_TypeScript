import styled from 'styled-components';

const Img = styled.img`
  width: 100%;
`;

const MovieInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  transition: opacity 0.3s ease;
  opacity: 0;
`;

const Card = styled.div`
  &:hover ${MovieInfo} {
    opacity: 1;
  }
`;

const MovieCard = ({ movie }) => {
  return (
    <>
      <Card>
        <Img
          src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
          alt={movie.title}
          loading='lazy'
        />
        <MovieInfo>
          <h2>{movie.title}</h2>
          <p>⭐ {movie.vote_average}</p>
        </MovieInfo>
      </Card>
    </>
  );
};

export default MovieCard;
