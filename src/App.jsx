import React, { useState, useEffect, useContext } from 'react';
import { axios, requests } from './api';
import MovieContext from './context/MovieContext';
import VideoContext from './context/VideoContext';
import Header from './containers/Header';
import Main from './containers/Main';

function App() {
  const [ currentMovie, setCurrentMovie ] = useState(null);
  const [ movies, setMovies ] = useState({});
  const [ trailerSrc, setTrailerSrc ] = useState(null);
  const [ playerHidden, setPlayerHidden ] = useState(true);
  console.log(movies);

  const { searchOnYoutube } = requests;

  function handleClick(_movieTitle, _imgURL) {
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

  return (
    <MovieContext.Provider value={{
      movies,
      setMovies,
      currentMovie,
      setCurrentMovie
    }}>
      <VideoContext.Provider value={{
        trailerSrc,
        setTrailerSrc,
        handleClick,
        searchMovieTrailer,
        playerHidden,
        setPlayerHidden
      }}>
        <Header />
        <Main />
      </VideoContext.Provider>
    </MovieContext.Provider>
  );
}

export default App;