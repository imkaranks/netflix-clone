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
      className="relative py-16 isolate min-h-screen grid items-center"
      style={heroStyles}
    >
      <div className="w-11/12 max-w-screen-2xl mx-auto grid gap-4">
        <div className="max-w-[70ch] grid gap-4">
          <span className="w-fit text-white font-semibold px-4 py-2 rounded-full bg-white/20 backdrop-blur-md">
            New Movie
          </span>
          <h1 className="text-5xl text-white font-bold sm:text-6xl md:text-7xl lg:text-[84px]">
            {movieName}
          </h1>
          <p className="leading-relaxed">{truncate(movie?.overview)}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <motion.button
            className="bg-neutral-100 inline-flex items-center gap-2 border border-white py-2 px-6 text-black font-semibold rounded-full"
            variants={button}
            whileHover="hover"
            whileTap="tap"
            onClick={() =>
              handleClick(
                movieName,
                `https://image.tmdb.org/t/p/original${moviePoster}`
              )
            }
          >
            <img src={play} alt="" className="w-8 aspect-square" role="image" />
            Play Now
          </motion.button>
          <Link to={`/movie/${movie.id}`}>
            <motion.button
              className="bg-white/5 backdrop-blur-sm inline-flex items-center gap-2 border border-white py-2 px-6 text-white font-semibold rounded-full"
              variants={button}
              whileHover="hover"
              whileTap="tap"
            >
              <img
                src={info}
                alt=""
                className="w-8 aspect-square"
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
