import { createContext } from "react";

import { List } from "../types";

interface Context {
  lists: List[];
  selectedMovieId: number;
  setLists: (listName: string) => void;
  deleteList: (listName: string) => void;
  setSelectedMovieId: (id: number) => void;
  addMovieToList: (listName: string, movieId: number) => void;
  removeMovieFromList: (listName: string, movieId: number) => void;
}

export const MainStore = createContext<Context>({
  lists: [],
  selectedMovieId: 0,
  setLists: () => {},
  deleteList: () => {},
  setSelectedMovieId: () => {},
  addMovieToList: () => {},
  removeMovieFromList: () => {},
});
