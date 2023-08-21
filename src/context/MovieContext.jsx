import { Children, createContext, useState } from "react";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [ currentMovie, setCurrentMovie ] = useState(null);
  const [ movies, setMovies ] = useState({});

  return <MovieContext.Provider value={{
    movies,
    setMovies,
    currentMovie,
    setCurrentMovie
  }}>
    {children}
  </MovieContext.Provider>
}

export default MovieContext;