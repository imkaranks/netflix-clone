import { useContext } from "react";
import AppContext from "@/context/AppContext";

export default function useMovies() {
  return useContext(AppContext);
}
