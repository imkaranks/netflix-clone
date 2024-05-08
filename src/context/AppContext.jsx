import { createContext } from "react";
import useFetchedMovies from "../hooks/useFetchedMovies";
// import { axios } from "../api";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const { movies, loading } = useFetchedMovies();

  return (
    <AppContext.Provider value={{ movies, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
