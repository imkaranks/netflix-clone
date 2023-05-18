import React from 'react';
import { requests } from '../api';
import MoviesSection from '../components/MoviesSection';

function Main() {
  return (
    <main id='main-content'>
      <MoviesSection
        title="Netflix Originals"
        fetchURL={requests.fetchNetflixOriginals}
      />
      <MoviesSection
        title="Trending"
        fetchURL={requests.fetchTrending}
      />
      <MoviesSection
        title="Top Rated"
        fetchURL={requests.fetchTopRated}
      />
      <MoviesSection
        title="Action"
        fetchURL={requests.fetchActionMovies}
      />
      <MoviesSection
        title="Horror"
        fetchURL={requests.fetchHorrorMovies}
      />
      <MoviesSection
        title="Romance"
        fetchURL={requests.fetchRomanceMovies}
      />
      <MoviesSection
        title="Comedy"
        fetchURL={requests.fetchComedyMovies}
      />
      <MoviesSection
        title="Documentaries"
        fetchURL={requests.fetchDocumentaries}
      />
    </main>
  );
}

export default Main;