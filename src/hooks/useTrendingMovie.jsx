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
      const randomInt = Math.floor(
        Math.random() * response.data.results.length - 1
      );
      if (
        results[randomInt]?.backdrop_path ||
        results[randomInt]?.poster_path
      ) {
        setMovie(results[randomInt]);
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
