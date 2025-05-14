import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import NotFound from './NotFound';

// import ErrorMessage from '../components/ErrorMessage';

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
    <div className='movie-detail'>
      <button onClick={handleBack}>← Back to list</button>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
        alt={movie.title}
        loading='lazy'
      />
      <p>{movie.overview}</p>
      <p>⭐ {movie.vote_average}</p>
    </div>
  );
};
export default MovieDetail;
