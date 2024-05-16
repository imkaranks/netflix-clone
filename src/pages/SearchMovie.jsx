import { useState } from "react";
import { requests, axios } from "@/api";
import Loader from "@/components/Loader";
import MovieCard from "@/components/ui/MovieCard";
import { search } from "@/assets/images";

function SearchMovie() {
  const [keyword, setKeyword] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function searchKeyword(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.get(requests.searchMovieByKeyword(keyword));
      setMovies(response.data.results);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
  }

  if (error) {
    return (
      <div className="grid min-h-screen place-items-center">
        <h1>{error.message || "No Data Found"}</h1>
      </div>
    );
  }
  return isLoading ? (
    <Loader />
  ) : (
    <div className="relative mx-auto w-11/12 max-w-screen-2xl py-20">
      <form
        onSubmit={searchKeyword}
        className="mx-auto flex max-w-4xl items-center gap-2 rounded-md bg-black p-2"
      >
        <input
          type="text"
          className="flex-1 bg-transparent outline-none"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search by name"
        />
        <button type="submit">
          <img src={search} alt="Search" />
        </button>
      </form>
      {movies && movies.length !== 0 ? (
        <div className="mt-14 flex flex-wrap justify-center gap-4">
          {movies.map((movie, idx) => (
            <MovieCard key={idx} {...movie} />
          ))}
        </div>
      ) : (
        <div className="mt-20 text-center">
          <h1 className="text-3xl text-white sm:text-4xl">Nothing to see 😔</h1>
        </div>
      )}
    </div>
  );
}

export default SearchMovie;
