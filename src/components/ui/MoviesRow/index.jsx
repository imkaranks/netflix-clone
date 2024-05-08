import PropTypes from "prop-types";
import { useRef } from "react";
import { chevronLeft, chevronRight } from "@/assets/images";
import MovieCard from "@/components/ui/MovieCard";
import "./index.css";

function MoviesRow({ title, moviesData = null, favMovies = null }) {
  const sectionRef = useRef(null);

  function scrollBack() {
    sectionRef.current.scrollLeft -= 261;
  }

  function scrollNext() {
    sectionRef.current.scrollLeft += 261;
  }

  function MovieCards() {
    if (!moviesData) {
      return (
        // Array.isArray(fetchedMovies) &&
        // fetchedMovies
        //   .slice(0, 6)
        //   .map(
        //     (movie, index) =>
        //       (movie.backdrop_path || movie.poster_path) && (
        //         <MovieCard key={index} {...movie} />
        //       )
        //   )
        <div>Loading...</div>
      );
    } else {
      return (
        Array.isArray(moviesData) &&
        moviesData
          .slice(0, 6)
          .map((movie) =>
            favMovies &&
            favMovies.findIndex((favMovie) => favMovie.id === movie.id) !== -1
              ? { ...movie, isFavorite: true }
              : movie
          )
          .map(
            (movie, index) =>
              (movie.backdrop_path || movie.poster_path) && (
                <MovieCard key={index} {...movie} />
              )
          )
      );
    }
  }

  return (
    <section className="py-8">
      <div className="movies__content | relative w-11/12 max-w-7xl mx-auto">
        {title && (
          <h2
            className="text-xl text-white font-bold md:text-2xl"
            // variants={heading}
            // initial="offscreen"
            // whileInView="onscreen"
            // viewport={{ once: true }}
          >
            {title}
          </h2>
        )}

        <div
          className="movies__content-cards | flex gap-4 mt-4 overflow-x-scroll scroll-smooth"
          // initial="offscreen"
          // whileInView="onscreen"
          // transition={{ staggerChildren: 0.2 }}
          // viewport={{ once: true }}
          ref={sectionRef}
        >
          <MovieCards />
        </div>
        <button
          className="movies__scroll-control | absolute top-12 bottom-0 -left-6 w-6"
          onClick={scrollBack}
        >
          <img src={chevronLeft} alt="previous" role="image" />
        </button>
        <button
          className="movies__scroll-control | absolute top-12 bottom-0 -right-6 w-6"
          onClick={scrollNext}
        >
          <img src={chevronRight} alt="next" role="image" />
        </button>
      </div>
    </section>
  );
}

MoviesRow.propTypes = {
  title: PropTypes.string.isRequired,
  moviesData: PropTypes.array,
  favMovies: PropTypes.array,
};

export default MoviesRow;
