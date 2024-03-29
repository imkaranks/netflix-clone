import React, { useEffect, useRef, useState } from 'react';
import { axios } from '../../api'
import { motion } from 'framer-motion';
import { heading } from '../../utils/motion';
import { chevronLeft, chevronRight } from '../../assets/images';
import MovieCard from '../../components/MovieCard/MovieCard';
// import { useMovie } from '../hooks';
import './MoviesSection.css';

function MoviesSection({ title, fetchURL, moviesData=null }) {
  const [fetchedMovies, setFetchedMovies] = useState([]);
  const sectionRef = useRef(null);
  // const { setMovies } = useMovie();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(fetchURL);
        setFetchedMovies(response.data.results);
        // setMovies(prevMovies => ({
        //   ...prevMovies,
        //   [title]: response.data.results.splice(0, 2).map(movie => ({
        //     ...movie,
        //     genre: title
        //   }))
        // }));
        return response;
      } catch(error) {
        console.log(error.message);
      }
    }
    moviesData ?? fetchData();
  }, []);

  function scrollBack() {
    sectionRef.current.scrollLeft -= 261;
  }

  function scrollNext() {
    sectionRef.current.scrollLeft += 261;
  }

  function movieCards() {
    if (!moviesData) {
      return Array.isArray(fetchedMovies) && fetchedMovies.slice(0, 6)
        .map((movie, index) => (
          (movie.backdrop_path || movie.poster_path) && (
            <MovieCard
              key={index}
              {...movie}
            />
          )
        ));
    } else {
      return Array.isArray(moviesData) && moviesData.slice(0, 6)
        .map((movie, index) => (
          (movie.backdrop_path || movie.poster_path) && (
            <MovieCard
              key={index}
              {...movie}
            />
          )
        ));
    }
  }

  return (
    <section className='py-8'>
      <div className="movies__content | relative w-11/12 max-w-7xl mx-auto">
        <motion.h2
          className="text-xl text-white font-bold md:text-2xl"
          variants={heading}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{once: true}}
        >
          {title}
        </motion.h2>

        <motion.div
          className="movies__content-cards | flex gap-4 mt-4 overflow-x-scroll scroll-smooth"
          initial="offscreen"
          whileInView="onscreen"
          transition={{staggerChildren: 0.2}}
          viewport={{once: true}}
          ref={sectionRef}
        >
          {movieCards()}
        </motion.div>
        <button
          className='movies__scroll-control | absolute top-12 bottom-0 -left-6 w-6'
          onClick={scrollBack}
        >
          <img src={chevronLeft} alt="previous" role='image' />
        </button>
        <button
          className='movies__scroll-control | absolute top-12 bottom-0 -right-6 w-6'
          onClick={scrollNext}
        >
          <img src={chevronRight} alt="next" role='image' />
        </button>
      </div>
    </section>
  );
}

export default MoviesSection;