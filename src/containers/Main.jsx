import React, { useEffect, useState } from 'react';
import { axios, requests } from '../api';
import MoviesSection from '../components/MoviesSection';
import Player from '../components/Player';

function Main() {
  const [ movieTitle, setMovieTitle ] = useState(null);
  const [ youtubeSrc, setYoutubeSrc ] = useState(null);

  function handleClick(_movieTitle) {
    setMovieTitle(_movieTitle);
  }

  useEffect(() => {
    if (movieTitle) {
      searchMovieTrailer(movieTitle)
        .then(videoId => {
          setYoutubeSrc(`https://www.youtube.com/embed/${videoId}?autoplay=1`);
        });
    }
  }, [movieTitle]);
  
  function searchMovieTrailer(_movieTitle) {
    if (!_movieTitle) return;
    
    return axios.get(requests.searchOnYoutube(`${_movieTitle} trailer`))
      .then(response => {
        const topResult = response.data.items[0];
        return topResult.id.videoId;
      })
      .catch(err => console.error(err));
  }

  return (
    <main id='main-content'>
      <MoviesSection
        title="Netflix Originals"
        fetchURL={requests.fetchNetflixOriginals}
        handleClick={handleClick}
      />
      <MoviesSection
        title="Trending"
        fetchURL={requests.fetchTrending}
        handleClick={handleClick}
      />
      <MoviesSection
        title="Top Rated"
        fetchURL={requests.fetchTopRated}
        handleClick={handleClick}
      />
      <MoviesSection
        title="Action"
        fetchURL={requests.fetchActionMovies}
        handleClick={handleClick}
      />
      <MoviesSection
        title="Horror"
        fetchURL={requests.fetchHorrorMovies}
        handleClick={handleClick}
      />
      <MoviesSection
        title="Romance"
        fetchURL={requests.fetchRomanceMovies}
        handleClick={handleClick}
      />
      <MoviesSection
        title="Comedy"
        fetchURL={requests.fetchComedyMovies}
        handleClick={handleClick}
      />
      <MoviesSection
        title="Documentaries"
        fetchURL={requests.fetchDocumentaries}
        handleClick={handleClick}
      />
      {
        movieTitle && (
          <Player
            source={youtubeSrc}
            handleClick={handleClick}
          />
        )
      }
    </main>
  );
}

export default Main;