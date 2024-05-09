import { Routes, Route, Outlet } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import MovieDetails from "@/pages/MovieDetails";
import SearchMovie from "@/pages/SearchMovie";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import ProtectedRoute from "@/components/ProtectedRoute";
import Favorites from "@/pages/Favorites";
import Profile from "@/pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route path="me" element={<Profile />} />
          <Route path="movie/:id" element={<MovieDetails />} />
          <Route path="search" element={<SearchMovie />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
