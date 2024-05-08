import { useState, useEffect } from "react";
import { axios, requests } from "@/api";

export default function useMovieById(id) {
  const [movie, setMovie] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(requests.fetchMovieById(id));
        if (response.status !== 200) {
          throw new Error("Something went wrong");
        }
        setMovie(response.data);
        return response;
      } catch (error) {
        setError(true);
      }
    }
    fetchData();
  }, [id]);

  return { movie, error };
}
