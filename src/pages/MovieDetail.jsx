import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import NotFound from './NotFound';
import styled from 'styled-components'

// import ErrorMessage from '../components/ErrorMessage';



const Backdrop = styled.div`
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  position: relative;
  color: white;
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
          throw new Error('Failed to fetch movie details');
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
    navigate('/');
  };
  // Om allt är OK, rendera startsidan

  return (
    <Backdrop style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
      <BackButton onClick={handleBack}>◀ Movies</BackButton>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        loading='lazy'
      />
      <p>{movie.overview}</p>
      <p>⭐ {movie.vote_average}</p>
    </Backdrop>
  );
};
export default MovieDetail;
