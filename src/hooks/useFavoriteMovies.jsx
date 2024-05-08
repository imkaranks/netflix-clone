import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";

export default function useFavoriteMovies() {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, "users", user.email), (doc) => {
        if (doc.data()) {
          setMovies(doc.data().favorites);
        }
      });
    } else {
      setMovies([]);
    }
  }, [user]);

  return { movies: movies.map((movie) => ({ ...movie, isFavorite: true })) };
}
