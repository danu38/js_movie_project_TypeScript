// home.jsx is file to fetch up the all movies from the api
// and show them in the home page
import styled from 'styled-components';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import ErrorMessage from '../components/ErrorMessage';
import DropDown from '../components/DropDown';
import LoaderOverlay from '../components/LoaderOverlay';

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

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
};

const Home = () => {
 const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState('popular');
  const isFirstLoad = useRef(true);

  useEffect(() => {
    setLoading(true);
    setShowLoader(false);
    setError(false);

    const API_URL = `https://api.themoviedb.org/3/movie/${filter}?api_key=${API_KEY}&language=en-US&page=1`;

    //Timer for loader
   let loaderTimer: NodeJS.Timeout;
    if (isFirstLoad.current) {
      // on first mount: show it immediately
      setShowLoader(true);
    } else {
      // on subsequent filter changes: wait 300ms
      loaderTimer = setTimeout(() => setShowLoader(true), 300);
    }

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
        if (loaderTimer) clearTimeout(loaderTimer);
        // mark that first load has happened
        isFirstLoad.current = false;
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
        if (loaderTimer) clearTimeout(loaderTimer);
        // mark that first load has happened
        isFirstLoad.current = false;
      });

    return () => {
      if (loaderTimer) clearTimeout(loaderTimer);
    };
    // cleanup function to clear the timer
  }, [filter]);

  const showOverlay = loading && showLoader;

  // custom message based on filter
  const loadingMessage = `Fetching ${
    filter === 'popular'
      ? 'popular'
      : filter === 'upcoming'
      ? 'upcoming'
      : 'top-rated'
  } movies…`;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value.toLowerCase());
  };

  return (
    <>
      <LoaderOverlay visible={showOverlay} message={loadingMessage} />

      <Main>
        {error ? (
          /* if there’s an error, show this… */
          <ErrorMessage />
        ) : (
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
        )}
      </Main>
    </>
  );
};

{
  /* <label for='filter'>Choose:</label>
      <select name='filter' id='filter' onChange={handleChange}>
        <option value='popular'>Popular</option>
        <option value='upcoming'>Upcoming</option>
        <option value='top_rated'>Top rated</option>
      </select> */
}

export default Home;
