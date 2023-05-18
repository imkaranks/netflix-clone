import React from 'react';
import { motion } from 'framer-motion';
import { card } from '../utils/motion';

function MovieCard({ backdrop_path, poster_path, name, title, original_name, variant }) {
  return (
    <motion.article
      className='movie | relative basis-[245px] flex-shrink-0 text-white'
      variants={card}
      whileHover="hover"
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