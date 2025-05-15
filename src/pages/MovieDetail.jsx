import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import NotFound from "./NotFound";
import styled from "styled-components";

// import ErrorMessage from '../components/ErrorMessage';

const Backdrop = styled.div`
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

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Overlay = styled.div`
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(8, 8, 8, 1), rgba(14, 14, 14, 0));
`;

const BackButton = styled.button`
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  width: fit-content;
  margin-top: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
`;

const MovieDetailsCon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-end;
    padding: 3rem;
  }
`;

const Poster = styled.img`
  max-width: 80%;
  border: 5px solid white;
  /* margin: 15rem 0 0 5rem; */

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
const API_KEY = import.meta.env.VITE_API_KEY;

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [error, setError] = useState(false);
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
      .then((data) => {
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

  if ((loading && showLoader) || movie === null) {
    //Visa loader om vi väntar på att visa loader | fortfarande laddar | inte fått movie än
    return <Loader />;
  }

  if (error) {
    return <NotFound />;
  }

  const handleBack = () => {
    navigate("/");
  };
  // Om allt är OK, rendera startsidan

  return (
    <Backdrop backdrop={movie.backdrop_path}>
      <BackButton onClick={handleBack}>◀ Movies</BackButton>

      <MovieDetailsCon>
        <Poster
          src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
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
    </Backdrop>
  );
};
export default MovieDetail;
