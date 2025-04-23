import { create } from "zustand";
import { List, Movie } from "../types";

type State = {
  listState: List[];
  selectedMovieId: number;
  selectedSeriesId: number;
};

type Actions = {
  setSelectedMovieId: (selectedMovieId: State["selectedMovieId"]) => void;
  setSelectedSeriesId: (selectedSeriesId: State["selectedSeriesId"]) => void;
  addList: (listName: string) => void;
  deleteList: (listName: string) => void;
  addMovie: (
    listName: string,
    movie: { id: number; type: "movie" | "series" }
  ) => void;
  deleteMovie: (listName: string, movieId: number) => void;
};

const loadLists = () => {
  if (typeof window === "undefined") return null;
  const lists = localStorage.getItem("lists");
  return !!lists
    ? JSON.parse(lists)
    : [
        {
          name: "Favourites",
          movies: [],
        },
      ];
};

const useMainStore = create<State & Actions>()((set) => {
  const lists = loadLists();

  return {
    listState: lists,
    selectedMovieId: 0,
    selectedSeriesId: 0,
    setSelectedMovieId: (id) => set(() => ({ selectedMovieId: id })),
    setSelectedSeriesId: (id) => set(() => ({ selectedSeriesId: id })),
    addList: (listName) =>
      set((state) => {
        const updatedLists = [
          ...state.listState,
          {
            name: listName,
            movies: [],
          },
        ];
        localStorage.setItem("lists", JSON.stringify(updatedLists));
        return { listState: updatedLists };
      }),
    deleteList: (listName) =>
      set((state) => {
        const updatedLists = state.listState.filter(
          (list: List) => list.name !== listName
        );
        localStorage.setItem("lists", JSON.stringify(updatedLists));
        return { listState: updatedLists };
      }),
    addMovie: (listName, movie) =>
      set((state) => {
        const updatedLists = state.listState.map((list) =>
          list.name === listName
            ? { ...list, movies: [movie, ...list.movies] }
            : list
        );
        localStorage.setItem("lists", JSON.stringify(updatedLists));
        return { listState: updatedLists };
      }),
    deleteMovie: (listName, movieId) =>
      set((state) => {
        const updatedLists = state.listState.map((list) =>
          list.name === listName
            ? {
                ...list,
                movies: list.movies.filter((movie) => movie.id !== movieId),
              }
            : list
        );
        localStorage.setItem("lists", JSON.stringify(updatedLists));
        return { listState: updatedLists };
      }),
  };
});

export default useMainStore;
