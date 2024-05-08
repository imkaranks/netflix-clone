import MoviesRow from "@/components/ui/MoviesRow";
import useFavoriteMovies from "@/hooks/useFavoriteMovies";

export default function Favorites() {
  const { movies } = useFavoriteMovies();

  return (
    <div className="grid min-h-screen items-center">
      {movies.length && <MoviesRow title="Favorites" moviesData={movies} />}
    </div>
  );
}
