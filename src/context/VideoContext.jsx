import { createContext, useState, useEffect } from "react";
import { axios, requests } from '../api';
import { useMovie } from '../hooks'

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const { currentMovie, setCurrentMovie } = useMovie();
  const [ trailerSrc, setTrailerSrc ] = useState(null);
  const [ playerHidden, setPlayerHidden ] = useState(true);

  const { searchOnYoutube } = requests;

  function handleClick(_movieTitle) {
    setCurrentMovie(_movieTitle);
    setPlayerHidden(false);
  }

  useEffect(() => {
    if (currentMovie) {
      searchMovieTrailer(currentMovie)
        .then(videoId => {
          setTrailerSrc(`https://www.youtube.com/embed/${videoId}?autoplay=1`);
        });
    }
  }, [currentMovie]);

  function searchMovieTrailer(_movieTitle) {
    if (!_movieTitle) return;
    
    return axios.get(searchOnYoutube(`${_movieTitle} trailer`))
      .then(response => {
        const topResult = response.data.items[0];
        return topResult.id.videoId;
      })
      .catch(err => console.error(err));
  }

  return <VideoContext.Provider value={{
    trailerSrc,
    setTrailerSrc,
    handleClick,
    searchMovieTrailer,
    playerHidden,
    setPlayerHidden
  }}>
    {children}
  </VideoContext.Provider>
}

export default VideoContext;