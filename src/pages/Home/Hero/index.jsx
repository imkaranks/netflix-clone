import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { play, info } from "@/assets/images";
import { truncate } from "@/utils";
import { button } from "@/utils/motion";
import useVideo from "@/hooks/useVideo";
import useTrendingMovie from "@/hooks/useTrendingMovie";

function Hero() {
  const { handleClick } = useVideo();
  const { movie } = useTrendingMovie();

  const movieName = movie?.name || movie?.title || movie?.original_name;
  const moviePoster = movie?.backdrop_path || movie?.poster_path;

  const heroStyles = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original${moviePoster})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  };

  const overlayStyles = {
    backgroundImage:
      "linear-gradient(90deg, hsl(0 0% 0% / 65%) 35%, transparent)",
  };

  return (
    <section
      className="relative isolate grid min-h-screen items-center py-16"
      style={heroStyles}
    >
      <div className="mx-auto grid w-11/12 max-w-screen-2xl gap-4">
        <div className="grid max-w-[70ch] gap-4">
          <span className="w-fit rounded-full bg-white/20 px-4 py-2 font-semibold text-white backdrop-blur-md">
            New Movie
          </span>
          <h1 className="text-5xl font-bold text-white sm:text-6xl md:text-7xl lg:text-[84px]">
            {movieName}
          </h1>
          <p className="leading-relaxed">{truncate(movie?.overview)}</p>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <motion.button
            className="inline-flex items-center gap-2 rounded-full border border-white bg-neutral-100 px-6 py-2 font-semibold text-black"
            variants={button}
            whileHover="hover"
            whileTap="tap"
            onClick={() =>
              handleClick(
                movieName,
                `https://image.tmdb.org/t/p/original${moviePoster}`,
              )
            }
          >
            <img src={play} alt="" className="aspect-square w-8" role="image" />
            Play Now
          </motion.button>
          <Link to={`/movie/${movie.id}`}>
            <motion.button
              className="inline-flex items-center gap-2 rounded-full border border-white bg-white/5 px-6 py-2 font-semibold text-white backdrop-blur-sm"
              variants={button}
              whileHover="hover"
              whileTap="tap"
            >
              <img
                src={info}
                alt=""
                className="aspect-square w-8"
                role="image"
              />
              More Info
            </motion.button>
          </Link>
        </div>
      </div>
      <div className="absolute inset-0 -z-10" style={overlayStyles}></div>
    </section>
  );
}

export default Hero;
