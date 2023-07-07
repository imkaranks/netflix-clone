import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { card } from '../utils/motion';
import VideoContext from '../context/VideoContext';
import './MovieCard.css';

function MovieCard({ backdrop_path, poster_path, name, title, original_name, genre }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [pulsing, setPulsing] = useState(true);
  const { handleClick } = useContext(VideoContext);

  const imageLoaded = () => {
    setImageLoading(false);
    setTimeout(() => setPulsing(false), 300);
  };

  return (
    <motion.article
      className={`movie | relative basis-[200px] md:basis-[245px] flex-shrink-0 bg-neutral-800 text-white ${pulsing ? "animate-pulse" : ""} loadable cursor-pointer`}
      variants={card}
      onClick={() => handleClick(name || title || original_name, `https://image.tmdb.org/t/p/original${backdrop_path || poster_path}`)}
    >
      {(typeof genre == 'string') && <span className='absolute top-2 left-2 z-10 text-xs w-fit text-white font-semibold px-4 py-2 rounded-full bg-black/40 backdrop-blur-md'>{genre}</span>}
      <img
        src={`https://image.tmdb.org/t/p/original${backdrop_path || poster_path}`}
        alt={name || title || original_name}
        className={`${imageLoading ? 'opacity-0' : ''} w-full h-[10rem] object-cover rounded-md transition-transform ease hover:scale-110`}
        onLoad={imageLoaded}
        loading='lazy'
      />
    </motion.article>
  );
}

export default MovieCard;