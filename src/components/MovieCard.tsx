import styled from "styled-components";

interface Movie {
  title: string;
  poster_path: string | null;
  release_date: string;
}

interface MovieCardProps {
  movie: Movie;
}

const Img = styled.img`
  width: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
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
  display: none;
  color: var(--color-text-white);
  padding: 0rem 0rem 1rem 1rem;

  @media (min-width: 1024px) {
    padding: 2rem;
    display: block;
  }
`;

const Card = styled.div`
  overflow: hidden; /* This prevents the scaled img from overflowing */

  &:hover ${Overlay} {
    opacity: 1;
  }

  &:hover ${Img} {
    transform: scale(1.1);
  }
`;

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <>
      <Card>
        {movie.poster_path && (
          <Img
            src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}
            alt={movie.title}
            loading="lazy"
          />
        )}

        {/* <Overlay></Overlay> */}
        <Overlay>
          <MovieInfo>
            <h2>{movie.title}</h2>
            <p> {movie.release_date}</p>
          </MovieInfo>
        </Overlay>
      </Card>
    </>
  );
};

export default MovieCard;
