import { Link, useParams } from "react-router-dom";
import useVideo from "@/hooks/useVideo";
import Loader from "@/components/Loader";
import Player from "@/components/Player";
import useMovieById from "@/hooks/useMovieById";

function MovieDetails() {
  const { id } = useParams();
  const { handleClick, playerHidden } = useVideo();
  const { movie, error } = useMovieById(id);

  function formatTime(n) {
    let num = n;
    let hours = num / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return rhours + "h " + rminutes + "min";
  }

  if (error) {
    return (
      <div className="grid h-screen place-items-center">
        <div className="w-11/12 max-w-3xl text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Looks like our data decided to take a spontaneous road trip.
            We&apos;ll have it back on the information highway in no time!
          </h1>
          <Link className="mt-6 inline-block cursor-pointer underline" to="/">
            Go Home
          </Link>
        </div>
      </div>
    );
  }
  return Object.keys(movie).length === 0 ? (
    <Loader />
  ) : (
    <>
      <article className="flex min-h-screen flex-col sm:flex-row">
        <div className='relative max-h-96 overflow-hidden before:absolute before:inset-0 before:z-10 before:bg-gradient-to-b before:from-black/75 before:from-0% before:to-transparent before:to-20% before:content-[""] sm:max-h-none sm:w-2/5'>
          <img
            className="h-full max-h-screen w-full object-cover object-center"
            src={`https://image.tmdb.org/t/p/original${
              movie.backdrop_path || movie.poster_path
            }`}
            alt={movie.name || movie.title || movie.original_name}
          />
        </div>
        <div className="px-4 py-6 text-[#999] sm:max-h-screen sm:flex-1 sm:self-center sm:overflow-y-auto sm:px-8 sm:py-20 md:px-14">
          <h2 className="text-3xl font-semibold leading-none text-white sm:text-4xl">
            {movie.name || movie.title || movie.original_name}
          </h2>

          <ul className="mt-2 flex flex-wrap items-center gap-2 text-sm font-medium">
            {movie.release_date && (
              <li>{movie.release_date.substring(0, 4)}</li>
            )}
            <li>{movie.adult ? "R-Rated" : "PG-13"}</li>
            {movie.runtime && <li>{formatTime(movie.runtime)}</li>}
          </ul>

          {movie.genres && (
            <div className="mt-4 flex flex-wrap items-center gap-1">
              {movie.genres.map((genre, i) => (
                <span
                  key={i}
                  className="rounded-full bg-black px-3 py-0.5 text-sm font-medium text-white"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          <ul className="my-6 flex items-center border-b-4 border-b-white/10 text-xs font-medium md:text-sm">
            <li className='relative px-3 py-2 text-white before:absolute before:-bottom-1 before:left-0 before:right-0 before:border-b-4 before:border-b-white before:content-[""] md:px-4'>
              <button>Overview</button>
            </li>
            <li className="px-3 py-2 md:px-4">
              <button>Trailer</button>
            </li>
            <li className="px-3 py-2 md:px-4">
              <button>More like this</button>
            </li>
            <li className="px-3 py-2 md:px-4">
              <button>Details</button>
            </li>
          </ul>

          {movie.overview ? (
            <p>{movie.overview}</p>
          ) : (
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              molestiae nisi nihil et expedita cupiditate ducimus perferendis,
              natus nobis totam, consequuntur laudantium nemo animi vitae
              laborum? Eum, facilis reprehenderit. Cum.
            </p>
          )}
          <button
            className="ease mt-6 rounded-md border-2 border-red-600 px-6 py-1.5 font-medium text-red-600 transition-colors duration-300 hover:bg-red-600 hover:text-black"
            onClick={() =>
              handleClick(movie.name || movie.title || movie.original_name)
            }
          >
            Watch Trailer
          </button>
        </div>
      </article>
      {!playerHidden && <Player />}
    </>
  );
}

export default MovieDetails;
