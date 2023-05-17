import React from 'react';

function MovieCard({ backdrop_path, poster_path, name, title, original_name, overview }) {
  return (
    <article className='movie | relative basis-[245px] flex-shrink-0 text-white hover:transform hover:scale-110 hover:z-40 hover:transition-transform hover:ease-in-out'>
      <img
        src={`https://image.tmdb.org/t/p/original${backdrop_path || poster_path}`}
        alt={name || title || original_name}
        className='w-full h-[10rem] object-cover rounded-md'
        loading='lazy'
      />
    </article>
  );
}

export default MovieCard;