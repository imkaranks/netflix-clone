import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { motion } from 'framer-motion';
// import { card } from '@/utils/motion';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";
import useAuth from "@/hooks/useAuth";
import "./MovieCard.css";

function MovieCard({
  id,
  backdrop_path,
  poster_path,
  name,
  title,
  original_name,
  genre,
  isFavorite,
}) {
  const { user } = useAuth();

  const [imageLoading, setImageLoading] = useState(true);
  const [favorite, setFavorite] = useState(isFavorite || false);
  const [pulsing, setPulsing] = useState(true);

  const imageLoaded = () => {
    setImageLoading(false);
    setTimeout(() => setPulsing(false), 300);
  };

  const toggleFavorite = async () => {
    if (user) {
      const movie = {
        id,
        backdrop_path: backdrop_path || "",
        poster_path: poster_path || "",
        name: name || "",
        title: title || "",
        original_name: original_name || "",
        genre: genre || "",
      };
      const userDoc = doc(db, "users", user.email);
      console.log(user);
      try {
        if (favorite) {
          await updateDoc(userDoc, {
            favorites: arrayRemove(movie),
          });
        } else {
          await updateDoc(userDoc, {
            favorites: arrayUnion(movie),
          });
        }
        setFavorite((prevState) => !prevState);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("login to mark as favorite");
    }
  };

  return (
    <article
      className={`movie | relative basis-[200px] md:basis-[245px] flex-shrink-0 text-white loadable cursor-pointer`}
      // variants={card}
    >
      <button
        className="z-10 aspect-square bg-red-500 w-6 rounded-full absolute top-2 right-2 border-none bg-transparent"
        onClick={toggleFavorite}
      >
        {favorite ? "❤" : "🤍"}
      </button>
      <Link to={`/movie/${id}`}>
        {typeof genre == "string" && (
          <span className="absolute top-2 left-2 z-10 text-xs w-fit text-white font-semibold px-4 py-2 rounded-full bg-black/40 backdrop-blur-md">
            {genre}
          </span>
        )}
        <div className={`bg-neutral-800 ${pulsing ? "animate-pulse" : ""}`}>
          <LazyLoadImage
            src={`https://image.tmdb.org/t/p/original${
              backdrop_path || poster_path
            }`}
            height="100%"
            alt={name || title || original_name}
            className={`${
              imageLoading ? "opacity-0" : ""
            } w-full h-[10rem] object-cover rounded-md transition-transform ease hover:scale-110`}
            onLoad={imageLoaded}
          />
        </div>
      </Link>
    </article>
  );
}

export default MovieCard;
