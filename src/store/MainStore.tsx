import { createContext } from "react";

import { List } from "../types";

interface Context {
  lists: List[];
  selectedMovieId: number;
  setLists: (listName: string) => void;
  setSelectedMovieId: (id: number) => void;
}

export const MainStore = createContext<Context>({
  lists: [],
  selectedMovieId: 0,
  setLists: () => {},
  setSelectedMovieId: () => {},
});
