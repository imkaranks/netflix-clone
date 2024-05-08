import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import MovieDetails from "@/pages/MovieDetails";
import SearchMovie from "@/pages/SearchMovie";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import ProtectedRoute from "@/components/ProtectedRoute";
import Favorites from "@/pages/Favorites";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="movie/:id" element={<MovieDetails />} />
        <Route path="search" element={<SearchMovie />} />
        <Route path="favorites" element={<Favorites />} />
      </Route>

      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
