import React, { useEffect, useState } from 'react';
import { axios, requests } from '../api';
import MoviesSection from '../components/MoviesSection';
import Player from '../components/Player';
import { angryFace, sadFace, happyFace, romanticFace } from '../assets/images';

function Main() {
  const [ movieTitle, setMovieTitle ] = useState(null);
  const [ youtubeSrc, setYoutubeSrc ] = useState(null);
  const [ userMood, setUserMood ] = useState(null);
  const [ hidden, setHidden ] = useState(false);

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
    
    return axios.get(searchOnYoutube(`${_movieTitle} trailer`))
      .then(response => {
        const topResult = response.data.items[0];
        return topResult.id.videoId;
      })
      .catch(err => console.error(err));
  }

  return (
    <main id='main-content'>
      {
        userMood !== null
        ? <>
          <MoviesSection
            title="Our Recommendations"
            fetchURL={
              userMood === 'sad'
              ? fetchComedyMovies :
              userMood === 'angry'
              ? fetchComedyMovies :
              userMood === 'happy'
              ? fetchComedyMovies :
              userMood === 'romantic'
              ? fetchRomanceMovies :
              fetchActionMovies
            }
            handleClick={handleClick}
          />
        </> :
        <form className={`fixed z-40 left-0 right-0 bottom-0 bg-neutral-800 py-6 sm:py-8 text-center ${hidden && 'hidden'}`} onSubmit={ev => ev.preventDefault()}>
          <fieldset>
            <legend className='text-white text-2xl font-bold mb-4'>How's your mood today?</legend>
            <div className='flex justify-center items-center gap-4 sm:gap-8'>
              <div className='relative'>
                <input
                  type="radio"
                  name="mood"
                  id="sad"
                  className='appearance-none absolute inset-0 opacity-0'
                  onClick={() => setUserMood('sad')}
                />
                <label htmlFor="sad">
                  <img
                    src={sadFace}
                    alt=''
                    className='w-8 object-fit'
                  />
                </label>
              </div>
              <div className='relative'>
                <input
                  type="radio"
                  name="mood"
                  id="angry"
                  className='appearance-none absolute inset-0 opacity-0'
                  onClick={() => setUserMood('angry')}
                />
                <label htmlFor="angry">
                  <img
                    src={angryFace}
                    alt=''
                    className='w-8 object-fit'
                  />
                </label>
              </div>
              <div className='relative'>
                <input
                  type="radio"
                  name="mood"
                  id="happy"
                  className='appearance-none absolute inset-0 opacity-0'
                  onClick={() => setUserMood('happy')}
                />
                <label htmlFor="happy">
                  <img
                    src={happyFace}
                    alt=''
                    className='w-8 object-fit'
                  />
                </label>
              </div>
              <div className='relative'>
                <input
                  type="radio"
                  name="mood"
                  id="romantic"
                  className='appearance-none absolute inset-0 opacity-0'
                  onClick={() => setUserMood('romantic')}
                />
                <label htmlFor="romantic">
                  <img
                    src={romanticFace}
                    alt=''
                    className='w-8 object-fit'
                  />
                </label>
              </div>
            </div>
          </fieldset>
          <button className='absolute top-0 right-0 bg-red-600 w-6 aspect-square' onClick={() => setHidden(true)}>
            <span>&#x2715;</span>
          </button>
        </form>
      }
      <MoviesSection
        title="Netflix Originals"
        fetchURL={fetchNetflixOriginals}
        handleClick={handleClick}
      />
      <MoviesSection
        title="Trending"
        fetchURL={fetchTrending}
        handleClick={handleClick}
      />
      <MoviesSection
        title="Top Rated"
        fetchURL={fetchTopRated}
        handleClick={handleClick}
      />
      <MoviesSection
        title="Action"
        fetchURL={fetchActionMovies}
        handleClick={handleClick}
      />
      <MoviesSection
        title="Horror"
        fetchURL={fetchHorrorMovies}
        handleClick={handleClick}
      />
      <MoviesSection
        title="Romance"
        fetchURL={fetchRomanceMovies}
        handleClick={handleClick}
      />
      <MoviesSection
        title="Comedy"
        fetchURL={fetchComedyMovies}
        handleClick={handleClick}
      />
      <MoviesSection
        title="Documentaries"
        fetchURL={fetchDocumentaries}
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