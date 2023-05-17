import React from 'react';
import { motion } from 'framer-motion';
import { card } from '../utils/motion';

function MovieCard({ backdrop_path, poster_path, name, title, original_name, delay }) {
  return (
    <motion.article
      className='movie | relative basis-[245px] flex-shrink-0 text-white'
      variants={card}
      initial="offscreen"
      whileHover="hover"
      whileInView="onscreen"
      transition={{delay: delay * 0.2}}
      viewport={{once: true}}
    >
      <img
        src={`https://image.tmdb.org/t/p/original${backdrop_path || poster_path}`}
        alt={name || title || original_name}
        className='w-full h-[10rem] object-cover rounded-md'
        loading='lazy'
      />
    </motion.article>
  );
}

export default MovieCard;