import { useEffect, useState } from "react";
import { axios, requests } from "@/api";

export default function useTrendingMovie() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(requests["Trending"]);
      const {
        data: { results },
      } = response;
      const randomIdx = Math.floor(
        Math.random() * response.data.results.length - 1
      );
      if (
        results[randomIdx]?.backdrop_path ||
        results[randomIdx]?.poster_path
      ) {
        setMovie(results[randomIdx]);
      } else {
        setMovie(
          results.find((result) => result.backdrop_path || result.poster_path)
        );
      }
      return response;
    }
    fetchData();
  }, []);

  return { movie };
}
