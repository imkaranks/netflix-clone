import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { card } from '../utils/motion';
import { AppContext } from '../App';
import './MovieCard.css';

function MovieCard({ backdrop_path, poster_path, name, title, original_name }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [pulsing, setPulsing] = useState(true);
  const { handleClick } = useContext(AppContext);

  const imageLoaded = () => {
    setImageLoading(false);
    setTimeout(() => setPulsing(false), 300);
  };

  return (
    <motion.article
      className={`movie | relative basis-[200px] md:basis-[245px] flex-shrink-0 bg-neutral-800 text-white ${pulsing ? "pulse" : ""} loadable`}
      variants={card}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.3 },
      }}
      onClick={() => handleClick(name || title || original_name, `https://image.tmdb.org/t/p/original${backdrop_path || poster_path}`)}
    >
      <img
        src={`https://image.tmdb.org/t/p/original${backdrop_path || poster_path}`}
        alt={name || title || original_name}
        className='w-full h-[10rem] object-cover rounded-md'
        initial={{ height: "10rem", opacity: 0 }}
        animate={{
          height: imageLoading ? "10rem" : "auto",
          opacity: imageLoading ? 0 : 1
        }}
        transition={
          ({ height: { delay: 0, duration: 0.4 } },
          { opacity: { delay: 0.5, duration: 0.4 } })
        }
        onLoad={imageLoaded}
        loading='lazy'
      />
    </motion.article>
  );
}

export default MovieCard;