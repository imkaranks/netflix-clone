import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { card } from '../utils/motion';
import './MovieCard.css';

function MovieCard({ backdrop_path, poster_path, name, title, original_name, handleClick }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [pulsing, setPulsing] = useState(true);

  const imageLoaded = () => {
    setImageLoading(false);
    setTimeout(() => setPulsing(false), 600);
  };

  return (
    <motion.article
      className={`movie | relative basis-[245px] flex-shrink-0 bg-neutral-800 text-white ${pulsing ? "pulse" : ""} loadable`}
      variants={card}
      whileHover="hover"
      // style={{ width: "245px", background: "#ccc" }}
      onClick={() => handleClick(name || title || original_name)}
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