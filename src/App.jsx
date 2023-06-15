import React, { useState, useEffect, useContext } from 'react';
import { axios, requests } from './api';
export const AppContext = React.createContext();
import Header from './containers/Header';
import Main from './containers/Main';

function App() {
  const [ currentMovie, setCurrentMovie ] = useState(null);
  const [ videoSrc, setVideoSrc ] = useState(null);
  const [ playerHidden, setPlayerHidden ] = useState(true);

  const { searchOnYoutube } = requests;

  function handleClick(_movieTitle, _imgURL) {
    setCurrentMovie(_movieTitle);
    setPlayerHidden(false);
  }

  useEffect(() => {
    if (currentMovie) {
      searchMovieTrailer(currentMovie)
        .then(videoId => {
          setVideoSrc(`https://www.youtube.com/embed/${videoId}?autoplay=1`);
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
    <AppContext.Provider value={{
      currentMovie,
      setCurrentMovie,
      videoSrc,
      setVideoSrc,
      handleClick,
      searchMovieTrailer,
      playerHidden,
      setPlayerHidden
    }}>
      <Header />
      <Main />
    </AppContext.Provider>
  );
}

export default App;