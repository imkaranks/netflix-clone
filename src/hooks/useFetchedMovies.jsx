import { useEffect, useState } from "react";
import { requests } from "@/api";

export default function useFetchedMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchRequests = Object.entries(requests)
      .filter((request) => typeof request[1] !== "function")
      .map((request) => {
        const category = request[0];
        return fetch(`https://api.themoviedb.org/3${request[1]}`)
          .then((raw) => raw.json())
          .then((data) => ({ category, data }));
      });
    Promise.all(fetchRequests)
      .then((responses) => {
        const moviesByCategory = {};
        responses.forEach(({ category, data }) => {
          moviesByCategory[category] = data.results;
        });
        setMovies(moviesByCategory);
        return moviesByCategory;
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return { movies, loading };
}
