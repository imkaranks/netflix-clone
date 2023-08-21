import React from 'react';
import { requests } from '../api';
import { useVideo } from '../hooks';
import MoviesSection from '../components/MoviesSection/MoviesSection';
import Hero from '../components/Hero';
import Player from '../components/Player';

function Home() {
  const { playerHidden } = useVideo();

  const {
    fetchActionMovies,
    fetchComedyMovies,
    fetchDocumentaries,
    fetchHorrorMovies,
    fetchNetflixOriginals,
    fetchRomanceMovies,
    fetchTopRated,
    fetchTrending
  } = requests;

  return (
    <>
      <Hero />
      <main id='main-content'>
        <MoviesSection
          title="Netflix Originals"
          fetchURL={fetchNetflixOriginals}
        />
        <MoviesSection
          title="Trending"
          fetchURL={fetchTrending}
        />
        <MoviesSection
          title="Top Rated"
          fetchURL={fetchTopRated}
        />
        <MoviesSection
          title="Action"
          fetchURL={fetchActionMovies}
        />
        <MoviesSection
          title="Horror"
          fetchURL={fetchHorrorMovies}
        />
        <MoviesSection
          title="Romance"
          fetchURL={fetchRomanceMovies}
        />
        <MoviesSection
          title="Comedy"
          fetchURL={fetchComedyMovies}
        />
        <MoviesSection
          title="Documentaries"
          fetchURL={fetchDocumentaries}
        />
        {
          !playerHidden && <Player />
        }
      </main>
    </>
  );
}

export default Home;