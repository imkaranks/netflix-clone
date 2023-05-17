import React, { useEffect, useState } from 'react';
import { axios } from '../api'
import MovieCard from '../components/MovieCard';

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
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex gap-4 mt-4">
          {
            movies && movies.slice(0, 6).map((movie, index) => (
              <MovieCard
                key={index}
                {...movie}
              />
            ))
          }
        </div>
      </div>
    </section>
  );
}

export default MoviesSection;