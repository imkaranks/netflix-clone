import React, { useEffect, useState } from 'react';
import { axios, requests } from '../api';
import { truncate } from '../utils'

function Hero() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        response.data.results[Math.floor(Math.random() * response.data.results.length - 1)]
      );
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
    <section className='relative isolate min-h-screen grid items-center' style={bgStyles}>
      <div className="w-11/12 max-w-[7xl] mx-auto grid gap-4">
        <div className="max-w-[70ch] grid gap-4">
          <h1 className="text-5xl text-white font-bold sm:text-6xl md:text-7xl lg:text-[84px]">
            {movie?.name || movie?.title || movie?.original_name}
          </h1>
          <p className='text-2xl text-white font-bold'>Trending in movies | Released - <time dateTime={movie.first_air_date}>{movie.first_air_date}</time></p>
          <p>{truncate(movie?.overview)}</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-neutral-900 border-none py-2 px-6 text-white font-semibold">Play Now</button>
          <button className="bg-neutral-100 border-none py-2 px-6 text-black font-semibold">More Info</button>
        </div>
      </div>
      <div className='absolute inset-0 -z-10' style={{backgroundImage: 'linear-gradient(90deg, hsl(0 0% 0% / 65%) 35%, transparent)'}}></div>
    </section>
  );
}

export default Hero;