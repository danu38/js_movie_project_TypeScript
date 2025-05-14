// home.jsx is file to fetch up the all movies from the api
// and show them in the home page
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const Main = styled.main`
  width: 100vw;
`;

const Section = styled.section`
  width: 100%;

  display: flex;
  flex-wrap: wrap;
`;

const CardLink = styled(Link)`
  width: 25%;
  background-color: pink;

  img {
    width: 100%;
  }
`;

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
    <Main className='movie-list'>
      <Section>
        {movies.map((movie) => (
          <CardLink to={`/movies/${movie.id}`} key={movie.id}>
            <MovieCard movie={movie} />
          </CardLink>
        ))}
      </Section>
    </Main>
  );
};

export default Home;
