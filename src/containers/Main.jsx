import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { requests } from '../api';
import { close, angryFace, sadFace, happyFace, romanticFace } from '../assets/images';
import VideoContext from '../context/VideoContext';
import MovieContext from '../context/MovieContext';
import MoviesSection from '../components/MoviesSection';
import Player from '../components/Player';

const moodCard = {
  initial: {
    rotate: 8,
    scale: 1
  },
  hover: {
    rotate: 0,
    scale: 1.1
  }
}

function Main() {
  const { playerHidden } = useContext(VideoContext);
  const [ userMood, setUserMood ] = useState(null);
  const [ hidden, setHidden ] = useState(false);
  const {
    movies: {
      Action,
      Comedy,
      Romance,
      Documentaries,
      Horror,
      'Netflix Originals': Originals,
      'Top Rated': TopRated,
      Trending
    }
  } = useContext(MovieContext);

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
    <main id='main-content'>
      {
        userMood !== null
        ? <>
          <MoviesSection
            title="Recommendations"
            moviesData={
              userMood === 'sad'
              ? [...Comedy, ...Action, ...Romance] :
              userMood === 'angry'
              ? [...Comedy, ...Romance, ...Documentaries] :
              userMood === 'happy'
              ? [...Horror, ...Action, ...Comedy] :
              userMood === 'romantic'
              ? [...Romance, ...Comedy, ...Originals] :
              [...TopRated, ...Trending, ...Documentaries]
            }
          />
        </> :
        <form className={`fixed z-40 left-0 bottom-0 right-0 backdrop-blur py-6 sm:py-8 text-center ${hidden && 'hidden'}`} style={{backgroundColor: 'rgb(0 0 0 / .5)'}} onSubmit={ev => ev.preventDefault()}>
          <fieldset>
            <legend className='text-white text-2xl font-bold mb-4'>How's your mood today?</legend>
            <div className='flex justify-center items-center gap-4 sm:gap-8'>
              <motion.div
                className='relative'
                variants={moodCard}
                initial="initial"
                whileHover="hover"
              >
                <input
                  type="radio"
                  name="mood"
                  id="sad"
                  className='appearance-none absolute inset-0 opacity-0 cursor-pointer'
                  onClick={() => setUserMood('sad')}
                />
                <label className='flex justify-center items-center w-12 aspect-square shadow bg-gray-200 rounded-md' htmlFor="sad">
                  <img
                    src={sadFace}
                    alt=''
                    className='w-8 object-fit'
                  />
                </label>
              </motion.div>
              <motion.div
                className='relative'
                variants={moodCard}
                initial="initial"
                whileHover="hover"
              >
                <input
                  type="radio"
                  name="mood"
                  id="angry"
                  className='appearance-none absolute inset-0 opacity-0 cursor-pointer'
                  onClick={() => setUserMood('angry')}
                />
                <label className='flex justify-center items-center w-12 aspect-square shadow bg-red-200 rounded-md' htmlFor="angry">
                  <img
                    src={angryFace}
                    alt=''
                    className='w-8 object-fit'
                  />
                </label>
              </motion.div>
              <motion.div
                className='relative'
                variants={moodCard}
                initial="initial"
                whileHover="hover"
              >
                <input
                  type="radio"
                  name="mood"
                  id="happy"
                  className='appearance-none absolute inset-0 opacity-0 cursor-pointer'
                  onClick={() => setUserMood('happy')}
                />
                <label className='flex justify-center items-center w-12 aspect-square shadow bg-yellow-200 rounded-md' htmlFor="happy">
                  <img
                    src={happyFace}
                    alt=''
                    className='w-8 object-fit'
                  />
                </label>
              </motion.div>
              <motion.div
                className='relative'
                variants={moodCard}
                initial="initial"
                whileHover="hover"
              >
                <input
                  type="radio"
                  name="mood"
                  id="romantic"
                  className='appearance-none absolute inset-0 opacity-0 cursor-pointer'
                  onClick={() => setUserMood('romantic')}
                />
                <label className='flex justify-center items-center w-12 aspect-square shadow bg-pink-200 rounded-md' htmlFor="romantic">
                  <img
                    src={romanticFace}
                    alt=''
                    className='w-8 object-fit'
                  />
                </label>
              </motion.div>
            </div>
          </fieldset>
          <button className='flex justify-center items-center absolute top-0 right-0 bg-red-600 w-6 aspect-square' onClick={() => setHidden(true)}>
            <img
              src={close}
              alt="close"
              width="20px"
              height="20px"
            />
          </button>
        </form>
      }
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
  );
}

export default Main;