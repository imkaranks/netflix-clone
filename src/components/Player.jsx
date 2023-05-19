import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { close } from '../assets/images';

function Player({ source, handleClick }) {
  const [ isVideoLoaded, setIsVideoLoaded ] = useState(false);

  return (
    <motion.div
      className='fixed right-4 bottom-4'
      initial={{scale: 0}}
      animate={{scale: isVideoLoaded ? 1 : 0}}
    >
      <button
        className='absolute right-0 top-0 bg-red-600 p-1'
        onClick={() => handleClick(null)}
      >
        <img
          src={close}
          alt="close"
          width="20px"
          height="20px"
        />
      </button>
      <iframe
        src={source}
        allowFullScreen="allowfullscreen"
        mozallowfullscreen="mozallowfullscreen" 
        msallowfullscreen="msallowfullscreen" 
        oallowfullscreen="oallowfullscreen" 
        webkitallowfullscreen="webkitallowfullscreen"
        className='aspect-video w-full max-w-sm'
        onLoad={() => setIsVideoLoaded(true)}
      />
    </motion.div>
  );
}

export default Player;