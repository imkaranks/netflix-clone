import MoviesSection from "@/components/MoviesSection/MoviesSection";
import useFavoriteMovies from "@/hooks/useFavoriteMovies";

export default function Favorites() {
  const { movies } = useFavoriteMovies();

  return (
    <div className="grid min-h-screen items-center">
      {movies.length && <MoviesSection title="Favorites" moviesData={movies} />}
    </div>
  );
}
