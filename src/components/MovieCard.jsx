import styled from 'styled-components';

const Img = styled.img`
  width: 100%;
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: none;
  opacity: 1;
  display: flex;
  align-items: flex-end;

  @media (min-width: 1024px) {
    background-color: rgba(0, 0, 0, 0.8);
    transition: opacity 0.3s ease;
    opacity: 0;
  }
`;

const MovieInfo = styled.div`
  color: var(--color-text-white);
  padding: 0rem 0rem 1rem 1rem;

  @media (min-width: 1024px) {
    padding: 2rem;
  }
`;

const Card = styled.div`
  &:hover ${Overlay} {
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

        {/* <Overlay></Overlay> */}
        <Overlay>
          <MovieInfo>
            <h2>{movie.title}</h2>
            <p>⭐ {movie.vote_average}</p>
          </MovieInfo>
        </Overlay>
      </Card>
    </>
  );
};

export default MovieCard;
