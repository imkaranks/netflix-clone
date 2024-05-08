import PropTypes from "prop-types";
import { createContext, useState, useEffect, useCallback } from "react";
import { axios, requests } from "@/api";

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [currentMovie, setCurrentMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [playerHidden, setPlayerHidden] = useState(true);

  const { searchOnYoutube } = requests;

  function handleClick(movieTitle) {
    setCurrentMovie(movieTitle);
    setPlayerHidden(false);
  }

  const searchMovieTrailer = useCallback(
    (movieTitle) => {
      if (!movieTitle) return;

      return axios
        .get(searchOnYoutube(`${movieTitle} trailer`))
        .then((response) => {
          const topResult = response.data.items[0];
          return topResult.id.videoId;
        })
        .catch((err) => console.error(err));
    },
    [searchOnYoutube]
  );

  useEffect(() => {
    if (currentMovie) {
      searchMovieTrailer(currentMovie).then((videoId) => {
        setTrailerUrl(`https://www.youtube.com/embed/${videoId}?autoplay=1`);
      });
    }
  }, [currentMovie, searchMovieTrailer]);

  return (
    <VideoContext.Provider
      value={{
        trailerUrl,
        setTrailerUrl,
        handleClick,
        searchMovieTrailer,
        playerHidden,
        setPlayerHidden,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

VideoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default VideoContext;
