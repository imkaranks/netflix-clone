import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { card } from '../utils/motion';
import { useVideo } from '../hooks';
import { LazyLoadImage } from "react-lazy-load-image-component";
import './MovieCard.css';

function MovieCard({ backdrop_path, poster_path, name, title, original_name, genre }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [pulsing, setPulsing] = useState(true);
  const { handleClick } = useVideo();

  const imageLoaded = () => {
    setImageLoading(false);
    setTimeout(() => setPulsing(false), 300);
  };

  return (
    <motion.article
      className={`movie | relative basis-[200px] md:basis-[245px] flex-shrink-0 text-white loadable cursor-pointer`}
      variants={card}
      onClick={() => handleClick(name || title || original_name, `https://image.tmdb.org/t/p/original${backdrop_path || poster_path}`)}
    >
      {(typeof genre == 'string') && <span className='absolute top-2 left-2 z-10 text-xs w-fit text-white font-semibold px-4 py-2 rounded-full bg-black/40 backdrop-blur-md'>{genre}</span>}
      <div className={`bg-neutral-800 ${pulsing ? "animate-pulse" : ""}`}>
        <LazyLoadImage src={`https://image.tmdb.org/t/p/original${backdrop_path || poster_path}`}
          height="100%"
          alt={name || title || original_name}
          className={`${imageLoading ? 'opacity-0' : ''} w-full h-[10rem] object-cover rounded-md transition-transform ease hover:scale-110`}
          onLoad={imageLoaded}
        />
      </div>
    </motion.article>
  );
}

export default MovieCard;