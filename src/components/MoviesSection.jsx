import React, { useEffect, useState } from 'react';
import './MoviesSection.css';
import { axios } from '../api'
import MovieCard from '../components/MovieCard';
import { motion } from 'framer-motion';
import { heading } from '../utils/motion';

function MoviesSection({ title, fetchURL }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(fetchURL);
      setMovies(response.data.results);
      return response;
    }
    fetchData();
  }, []);

  return (
    <section className='py-8'>
      <div className="movies__content | w-11/12 max-w-7xl mx-auto">
        <motion.h2
          className="text-2xl text-white font-bold"
          variants={heading}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{once: true}}
        >
          {title}
        </motion.h2>
        <div className="movies__content-cards | flex gap-4 mt-4 overflow-x-scroll">
          {
            Array.isArray(movies) && movies.slice(0, 6)
              .map((movie, index) => (
                (movie.backdrop_path || movie.poster_path) && (
                  <MovieCard
                    key={index}
                    delay={index}
                    {...movie}
                  />
                )
              ))
          }
        </div>
      </div>
    </section>
  );
}

export default MoviesSection;