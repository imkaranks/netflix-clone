import React, { useEffect, useState, useContext } from 'react';
import { play, info } from "../assets/images";
import { axios, requests } from '../api';
import { truncate } from '../utils';
import { motion } from 'framer-motion';
import { heading, button } from '../utils/motion';
import { AppContext } from '../App';

function Hero() {
  const [movie, setMovie] = useState([]);
  const { handleClick } = useContext(AppContext);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(requests.fetchTrending);
      const {data: {results}} = response;
      const randomInt = Math.floor(Math.random() * response.data.results.length - 1);
      if (results[randomInt]?.backdrop_path || results[randomInt]?.poster_path) {
        setMovie(results[randomInt]);
      } else {
        setMovie(results.find(result => result.backdrop_path || result.poster_path));
      }
      return response;
    }
    fetchData();
  }, []);

  const bgStyles = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path || movie?.poster_path})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center'
  }

  return (
    <section className='relative py-16 isolate min-h-screen grid items-center' style={bgStyles}>
      <div className="w-11/12 max-w-[7xl] mx-auto grid gap-4">
        <div className="max-w-[70ch] grid gap-4">
          <motion.h1
            className="text-5xl text-white font-bold sm:text-6xl md:text-7xl lg:text-[84px]"
            variants={heading}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{once: true}}
          >
            {movie?.name || movie?.title || movie?.original_name}
          </motion.h1>
          <p className='text-2xl text-white font-bold'>
            Trending in movies | Released - <time dateTime={movie?.release_date || movie?.first_air_date}>{movie?.release_date || movie?.first_air_date}</time>
          </p>
          <p className='leading-relaxed'>{truncate(movie?.overview)}</p>
        </div>
        <div className="flex items-center gap-4">
          <motion.button
            className="bg-neutral-100 inline-flex items-center gap-2 border-none py-2 px-6 text-black font-semibold"
            variants={button}
            whileHover="hover"
            whileTap="tap"
            onClick={() => handleClick(movie?.name || movie?.title || movie?.original_name, `https://image.tmdb.org/t/p/original${movie?.backdrop_path || movie?.poster_path}`)}
          >
            <img
              src={play}
              alt=''
              className='w-8 aspect-square'
              role='image'
            />
            Play Now
          </motion.button>
          <motion.button
            className="bg-neutral-900 inline-flex items-center gap-2 border-none py-2 px-6 text-white font-semibold"
            variants={button}
            whileHover="hover"
            whileTap="tap"
          >
            <img
              src={info}
              alt=''
              className='w-8 aspect-square'
              role='image'
            />
            More Info
          </motion.button>
        </div>
      </div>
      <div className='absolute inset-0 -z-10' style={{backgroundImage: 'linear-gradient(90deg, hsl(0 0% 0% / 65%) 35%, transparent)'}}></div>
    </section>
  );
}

export default Hero;