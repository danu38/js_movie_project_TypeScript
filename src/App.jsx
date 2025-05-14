import { BrowserRouter, Routes, Route } from 'react-router';

import Movies from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import NotFound from './pages/NotFound';

// The Header component will show in all "pages" It is outside of the routing scope.

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Movies />} />
          <Route path='/movies/:movieId' element={<MovieDetail />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
