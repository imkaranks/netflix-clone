import useVideo from "@/hooks/useVideo";
import useMovies from "@/hooks/useMovies";
import useFavoriteMovies from "@/hooks/useFavoriteMovies";
import MoviesRow from "@/components/ui/MoviesRow";
import Hero from "@/pages/Home/Hero";
import Player from "@/components/Player";

function Home() {
  const { playerHidden } = useVideo();
  const { movies, loading } = useMovies();
  const { movies: favMovies } = useFavoriteMovies();

  return (
    <>
      <Hero />
      <main id="main-content">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          Object.entries(movies).map((row, idx) => (
            <MoviesRow
              key={idx}
              title={row[0]}
              moviesData={row[1]}
              favMovies={favMovies}
            />
          ))
        )}

        {!playerHidden && <Player />}
      </main>
    </>
  );
}

export default Home;
