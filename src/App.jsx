import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { MovieProvider } from './context/MovieContext';
import { VideoProvider } from './context/VideoContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import SearchMovie from './pages/SearchMovie';

function App() {

  return (
    <MovieProvider>
      <VideoProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='movie/:id' element={<MovieDetails />} />
            <Route path='search' element={<SearchMovie />} />
          </Route>
        </Routes>
      </VideoProvider>
    </MovieProvider>
  );
}

export default App;