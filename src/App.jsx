import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import { MovieProvider } from './context/MovieContext';
import { VideoProvider } from './context/VideoContext';
import Home from './pages/Home';
import Layout from './components/Layout';
import MovieDetails from './components/MovieDetails';

function App() {

  return (
    <MovieProvider>
      <VideoProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='movie/:id' element={<MovieDetails />} />
          </Route>
        </Routes>
      </VideoProvider>
    </MovieProvider>
  );
}

export default App;