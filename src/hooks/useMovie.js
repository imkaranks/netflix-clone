import { useContext } from 'react';
import MovieContext from '../context/MovieContext';

function useMovie() {
  return useContext(MovieContext);
}

export default useMovie;