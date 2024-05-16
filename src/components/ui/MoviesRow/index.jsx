import PropTypes from "prop-types";
import { useRef } from "react";
import { chevronLeft, chevronRight } from "@/assets/images";
import MovieCard from "@/components/ui/MovieCard";
import "./index.css";

function MoviesRow({ title, moviesData = null, favMovies = null }) {
  const sectionRef = useRef(null);

  const scrollBack = () => {
    sectionRef.current.scrollLeft -= 261;
  };

  const scrollNext = () => {
    sectionRef.current.scrollLeft += 261;
  };

  const MovieCards = () => {
    if (!moviesData) {
      return <div>Loading...</div>;
    } else {
      return (
        Array.isArray(moviesData) &&
        moviesData
          .slice(0, 6)
          .map((movie) =>
            favMovies &&
            favMovies.findIndex((favMovie) => favMovie.id === movie.id) !== -1
              ? { ...movie, isFavorite: true }
              : movie,
          )
          .map(
            (movie, index) =>
              (movie.backdrop_path || movie.poster_path) && (
                <MovieCard key={index} {...movie} />
              ),
          )
      );
    }
  };

  return (
    <section className="py-8">
      <div className="movies__content | relative mx-auto w-11/12 max-w-screen-2xl">
        {title && (
          <h2 className="text-xl font-bold text-white md:text-2xl">{title}</h2>
        )}

        <div
          className="movies__content-cards | mt-4 flex gap-4 overflow-x-auto scroll-smooth"
          ref={sectionRef}
        >
          <MovieCards />
        </div>
        <button
          className="movies__scroll-control | absolute -left-6 bottom-0 top-12 w-6"
          onClick={scrollBack}
        >
          <img src={chevronLeft} alt="previous" role="image" />
        </button>
        <button
          className="movies__scroll-control | absolute -right-6 bottom-0 top-12 w-6"
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
