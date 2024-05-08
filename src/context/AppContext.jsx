import { createContext } from "react";
import PropTypes from "prop-types";
import useFetchedMovies from "@/hooks/useFetchedMovies";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const { movies, loading } = useFetchedMovies();

  return (
    <AppContext.Provider value={{ movies, loading }}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContext;
