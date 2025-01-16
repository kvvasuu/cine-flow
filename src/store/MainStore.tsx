import { createContext, useState, useEffect, ReactNode, useRef } from "react";

import { List } from "../types";

interface Context {
  lists: List[];
  selectedMovieId: number;
  isTVSeries: boolean;
  setLists: (listName: string) => void;
  deleteList: (listName: string) => void;
  setSelectedMovieId: (id: number) => void;
  addMovieToList: (listName: string, movieId: number) => void;
  removeMovieFromList: (listName: string, movieId: number) => void;
  selectItem: (type: string, id: number) => void;
}

export const MainStore = createContext<Context>({
  lists: [],
  selectedMovieId: 0,
  isTVSeries: false,
  setLists: () => {},
  deleteList: () => {},
  setSelectedMovieId: () => {},
  addMovieToList: () => {},
  removeMovieFromList: () => {},
  selectItem: () => {},
});

export default function MainStoreProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [lists, setLists] = useState<List[]>([
    { name: "Favourites", movies: [] },
  ]);
  const [selectedMovieId, setSelectedMovieId] = useState<number>(0);
  const isTVSeries = useRef(false);

  const updateLists = (listName: string) => {
    setLists((prevValue) => {
      const updatedLists = [...prevValue];
      updatedLists.push({
        name: listName,
        movies: [],
      });
      localStorage.setItem("lists", JSON.stringify(updatedLists));
      return updatedLists;
    });
  };

  const deleteList = (listName: string) => {
    setLists((prevValue) => {
      const updatedLists = [...prevValue].filter(
        (list) => list.name !== listName
      );
      localStorage.setItem("lists", JSON.stringify(updatedLists));
      return updatedLists;
    });
  };

  const addMovieToList = (listName: string, movieId: number) => {
    setLists((prevValue) => {
      const updatedLists = prevValue.map((list) =>
        list.name === listName
          ? { ...list, movies: [movieId, ...list.movies] }
          : list
      );

      localStorage.setItem("lists", JSON.stringify(updatedLists));
      return updatedLists;
    });
  };

  const removeMovieFromList = (listName: string, movieId: number) => {
    setLists((prevValue) => {
      const updatedLists = prevValue.map((list) =>
        list.name === listName
          ? { ...list, movies: [...list.movies].filter((id) => id !== movieId) }
          : list
      );

      localStorage.setItem("lists", JSON.stringify(updatedLists));
      return updatedLists;
    });
  };

  const selectItem = (type: string, id: number) => {
    setSelectedMovieId(id);
    type === "movie"
      ? (isTVSeries.current = false)
      : (isTVSeries.current = true);
  };

  const ctxValue = {
    lists,
    selectedMovieId,
    isTVSeries: isTVSeries.current,
    setLists: updateLists,
    setSelectedMovieId,
    addMovieToList,
    removeMovieFromList,
    deleteList,
    selectItem,
  };

  useEffect(() => {
    const lists = localStorage.getItem("lists");
    if (lists) {
      setLists(JSON.parse(lists));
    }
  }, []);

  return <MainStore.Provider value={ctxValue}>{children}</MainStore.Provider>;
}
