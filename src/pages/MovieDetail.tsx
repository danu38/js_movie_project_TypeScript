import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ErrorMessage from "../components/ErrorMessage";
import NotFound from "./NotFound";
import LoaderOverlay from "../components/LoaderOverlay";

const Backdrop = styled.div<{ backdrop: string }>`
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  position: relative;
  color: white;
  background-image: ${({ backdrop }) =>
    `url(https://image.tmdb.org/t/p/original${backdrop})`};

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(8, 8, 8, 1), rgba(14, 14, 14, 0));
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const BackButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  font-weight: bold;
  width: fit-content;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
`;

const MovieDetailsCon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-end;
  }
`;

const Poster = styled.img`
  max-width: 80%;
  border: 5px solid white;

  @media (min-width: 768px) {
    width: 35%;
  }

  @media (min-width: 1024px) {
    max-width: 350px;
  }
`;

const MovieDetailstext = styled.div`
  gap: 1rem;
  display: flex;
  flex-direction: column;

  p {
    max-width: 70ch;
  }
`;

const MovieTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  h3 {
    background-color: rgba(12, 12, 12, 0.2);
    padding: 0.5rem;
  }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;

  @media (min-width: 768px) {
    padding: 3rem;
  }

  @media (min-width: 1024px) {
    padding: 2rem 4rem 4rem 4rem;
  }
`;

const API_KEY = import.meta.env.VITE_API_KEY;

// 👇 Type for a single movie from TMDB API
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  overview: string;
}

const MovieDetail: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loaderDelay = setTimeout(() => {
      setShowLoader(true);
    }, 300);

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch movie details");
        }
        return res.json();
      })
      .then((data: Movie) => {
        clearTimeout(loaderDelay);
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        clearTimeout(loaderDelay);
        setError(true);
        setLoading(false);
      });

    return () => clearTimeout(loaderDelay);
  }, [movieId]);

  const showOverlay = loading && showLoader;

  const handleBack = (): void => {
    navigate("/");
  };

  if (error) return <NotFound />;
  if (loading || !movie)
    return (
      <LoaderOverlay visible={showOverlay} message="Loading movie details…" />
    );

  return (
    <Backdrop backdrop={movie.backdrop_path}>
      <Wrapper>
        <BackButton onClick={handleBack}>◀ Movies</BackButton>

        <MovieDetailsCon>
          <Poster
            src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}
            alt={movie.title}
            loading="lazy"
          />

          <MovieDetailstext>
            <MovieTitle>
              <h2>{movie.title}</h2> <h3>⭐ {movie.vote_average}</h3>
            </MovieTitle>
            <p>{movie.overview}</p>
          </MovieDetailstext>
        </MovieDetailsCon>
      </Wrapper>
    </Backdrop>
  );
};

export default MovieDetail;
