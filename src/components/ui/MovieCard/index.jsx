import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";
import useAuth from "@/hooks/useAuth";
import "./index.css";

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
      className={`movie | loadable group relative flex-shrink-0 basis-[200px] cursor-pointer text-white md:basis-[245px]`}
    >
      <button
        className="absolute right-2 top-2 z-10 aspect-square w-6 rounded-full border-none bg-red-500 bg-transparent"
        onClick={toggleFavorite}
      >
        {favorite ? "❤" : "🤍"}
      </button>
      <Link to={`/movie/${id}`}>
        {genre && typeof genre == "string" && (
          <span className="absolute left-2 top-2 z-10 w-fit rounded-full bg-black/40 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
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
            } ease h-[10rem] w-full rounded-md object-cover transition-transform hover:scale-110`}
            onLoad={imageLoaded}
          />
        </div>
      </Link>
    </article>
  );
}

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  backdrop_path: PropTypes.string,
  poster_path: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  original_name: PropTypes.string,
  genre: PropTypes.string,
  isFavorite: PropTypes.bool,
};

export default MovieCard;
