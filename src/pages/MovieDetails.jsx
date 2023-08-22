import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { axios, requests } from '../api';
import { useVideo } from '../hooks';
import Loader from '../components/Loader';
import Player from '../components/Player';

function MovieDetails() {
  const { id } = useParams();
  const { handleClick, playerHidden } = useVideo();
  const [movie, setMovie] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(requests.fetchMovieById(id));
        if (response.status !== 200) {
          setError(true);
          return;
        }
        setMovie(response.data);
        return response;
      } catch (error) {
        setError(true);
      }
    }
    fetchData();
  }, []);

  function formatTime(n) {
    let num = n;
    let hours = (num / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return rhours + "h " + rminutes + "min";
  }

  if (error) {
    return <div className='h-screen grid place-items-center'>
      <h1 className='text-3xl sm:text-4xl text-white font-bold'>No Data Available</h1>
    </div>
  }
  return (
    Object.keys(movie).length === 0
      ? <Loader />
      : <>
        <article className='flex flex-col min-h-screen sm:flex-row'>
          <div className='max-h-96 overflow-hidden sm:w-2/5 sm:max-h-none relative before:content-[""] before:absolute before:inset-0 before:z-10 before:bg-gradient-to-b before:from-black/75 before:from-0% before:to-transparent before:to-20%'>
            <img
              className='w-full h-full max-h-screen object-cover object-center'
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
              alt={movie.name || movie.title || movie.original_name}
            />
          </div>
          <div className='text-[#999] sm:max-h-screen sm:overflow-y-auto sm:self-center sm:flex-1 px-4 sm:px-8 md:px-14 py-6 sm:py-20'>
            <h2 className='text-white text-3xl sm:text-4xl font-semibold leading-none'>{movie.name || movie.title || movie.original_name}</h2>

            <ul className='flex mt-2 flex-wrap gap-2 items-center text-sm font-medium'>
              {movie.release_date && <li>{movie.release_date.substring(0, 4)}</li>}
              <li>{movie.adult ? 'R-Rated' : 'PG-13'}</li>
              {movie.runtime && <li>{formatTime(movie.runtime)}</li>}
            </ul>

            {
              movie.genres && <div className='flex flex-wrap gap-1 items-center mt-4'>
                {movie.genres.map((genre, i) => (
                  <span key={i} className='text-sm font-medium bg-black text-white py-0.5 px-3 rounded-full'>{genre.name}</span>
                ))}
              </div>
            }

            <ul className='flex text-xs md:text-sm items-center font-medium my-6 border-b-4 border-b-white/10'>
              <li className='px-3 py-2 md:px-4 text-white relative before:content-[""] before:absolute before:left-0 before:right-0 before:-bottom-1 before:border-b-4 before:border-b-white'>
                <button>Overview</button>
              </li>
              <li className='px-3 py-2 md:px-4'>
                <button>Trailer</button>
              </li>
              <li className='px-3 py-2 md:px-4'>
                <button>More like this</button>
              </li>
              <li className='px-3 py-2 md:px-4'>
                <button>Details</button>
              </li>
            </ul>

            {
              movie.overview
                ? <p>{movie.overview}</p>
                : <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora molestiae nisi nihil et expedita cupiditate ducimus perferendis, natus nobis totam, consequuntur laudantium nemo animi vitae laborum? Eum, facilis reprehenderit. Cum.</p>
            }
            <button
              className='mt-6 px-6 py-1.5 border-2 border-red-600 text-red-600 font-medium rounded-md transition-colors duration-300 ease hover:bg-red-600 hover:text-black'
              onClick={() => handleClick(movie.name || movie.title || movie.original_name)}
            >
              Watch Trailer
            </button>
          </div>
        </article>
        {
          !playerHidden && <Player />
        }
      </>
  )
}

export default MovieDetails