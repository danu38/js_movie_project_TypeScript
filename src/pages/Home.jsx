// home.jsx is file to fetch up the all movies from the api
// and show them in the home page
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import DropDown from '../components/DropDown';

const Main = styled.main`
  width: 100vw;
`;

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  position: relative;
`;

const CardLink = styled(Link)`
  position: relative;
  width: 50%;

  @media (min-width: 768px) {
    width: 33.33%;
  }

  @media (min-width: 1024px) {
    width: 25%;
  }

  @media (min-width: 1366px) {
    width: 20%;
  }
`;

const DropdownWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
`;

const API_KEY = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState('popular');

  useEffect(() => {
    setLoading(true);
    setShowLoader(false);
    setError(false);

    const API_URL = `https://api.themoviedb.org/3/movie/${filter}?api_key=${API_KEY}&language=en-US&page=1`;

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
  }, [filter]);

  if (loading && showLoader) {
    return <Loader />; // Loader component
  }
  if (error) {
    return <ErrorMessage />; //ErrorMessage component
  }

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Main className='movie-list'>
      {/* <label for='filter'>Choose:</label>
      <select name='filter' id='filter' onChange={handleChange}>
        <option value='popular'>Popular</option>
        <option value='upcoming'>Upcoming</option>
        <option value='top_rated'>Top rated</option>
      </select> */}
      <Section>
        <DropdownWrapper>
          <DropDown onChange={handleChange}></DropDown>
        </DropdownWrapper>
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
