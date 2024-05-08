// import { requests } from "@/api";
import useVideo from "@/hooks/useVideo";
import MoviesSection from "@/components/MoviesSection/MoviesSection";
import Hero from "@/components/Hero";
import Player from "@/components/Player";
import useMovies from "@/hooks/useMovies";
import useFavoriteMovies from "@/hooks/useFavoriteMovies";

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
            <MoviesSection
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
