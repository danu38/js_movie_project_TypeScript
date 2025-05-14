// home.jsx is file to fetch up the all movies from the api
// and show them in the home page

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setShowLoader(false);
    setError(false);

    const loaderTimer = setTimeout(() => {
      setShowLoader(true); // Visa loader efter 300ms
    }, 300);

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch data 404');
        }
        return res.json();
      })
      .then((data) => {
        setMovies(data.results);
        setLoading(false);
        clearTimeout(loaderTimer); // Stoppa loader om vi hann först
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
        clearTimeout(loaderTimer); // Stoppa loader om vi hann först
      });

    return () => clearTimeout(loaderTimer); // cleanup
  }, []);

  if (loading && showLoader) {
    return <Loader />; // Loader component
  }
  if (error) {
    return <ErrorMessage />; //ErrorMessage component
  }

  //om allt är OK, rendera startsidan

  return (
    <main className='movie-list'>
      <h1>Popular Movies</h1>
      <section>
        <div className='movie-grid'>
          {movies.map((movie) => (
            <Link to={`/movies/${movie.id}`} key={movie.id}>
              <MovieCard movie={movie} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
