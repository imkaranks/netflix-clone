const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const requests = {
  Trending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  "Netflix Originals": `/discover/tv?api_key=${API_KEY}&with_network=213`,
  "Top Rated": `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  Action: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  Comedy: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  Horror: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  Romance: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  Documentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  searchOnYoutube: (query) =>
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${
      import.meta.env.VITE_YT_API_KEY
    }`,
  fetchMovieById: (id) =>
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
  searchMovieByKeyword: (keyword, page = 1) =>
    `/search/movie?query=${keyword}&api_key=${API_KEY}&page=${page}`,
};

export default requests;
