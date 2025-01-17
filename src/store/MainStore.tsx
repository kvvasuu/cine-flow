import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useReducer,
  Dispatch,
} from "react";

import { List } from "../types";

type Action =
  | {
      type: "addList";
      payload: {
        listName: string;
      };
    }
  | {
      type: "deleteList";
      payload: {
        listName: string;
      };
    }
  | {
      type: "addMovie";
      payload: {
        listName: string;
        movie: { id: number; type: "movie" | "series" };
      };
    }
  | {
      type: "deleteMovie";
      payload: {
        listName: string;
        movieId: number;
      };
    }
  | {
      type: "initialSet";
      payload: {
        lists: List[];
      };
    };

interface Context {
  listState: List[];
  selectedMovieId: number;
  selectedSeriesId: number;
  setSelectedMovieId: (id: number) => void;
  setSelectedSeriesId: (id: number) => void;
  listDispatch: Dispatch<Action>;
}

export const MainStore = createContext<Context>({
  listState: [],
  selectedMovieId: 0,
  selectedSeriesId: 0,
  setSelectedMovieId: () => {},
  setSelectedSeriesId: () => {},
  listDispatch: () => {},
});

export default function MainStoreProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedMovieId, setSelectedMovieId] = useState<number>(0);
  const [selectedSeriesId, setSelectedSeriesId] = useState<number>(0);

  const listReducer = (state: List[], action: Action): List[] => {
    const { type, payload } = action;

    switch (type) {
      case "initialSet":
        return payload.lists;

      case "addList":
        const addedList = [
          ...state,
          {
            name: payload.listName,
            movies: [],
          },
        ];
        localStorage.setItem("lists", JSON.stringify(addedList));
        return addedList;

      case "deleteList":
        const deletedList = state.filter(
          (list) => list.name !== payload.listName
        );
        localStorage.setItem("lists", JSON.stringify(deletedList));
        return deletedList;

      case "addMovie":
        const addedMovie = state.map((list) =>
          list.name === payload.listName
            ? { ...list, movies: [payload.movie, ...list.movies] }
            : list
        );
        localStorage.setItem("lists", JSON.stringify(addedMovie));
        return addedMovie;

      case "deleteMovie":
        const deletedMovie = state.map((list) =>
          list.name === payload.listName
            ? {
                ...list,
                movies: list.movies.filter(
                  (movie) => movie.id !== payload.movieId
                ),
              }
            : list
        );
        localStorage.setItem("lists", JSON.stringify(deletedMovie));
        return deletedMovie;

      default:
        return state;
    }
  };

  const initialState: List[] = [
    {
      name: "Favourites",
      movies: [],
    },
  ];

  const [listState, listDispatch] = useReducer(listReducer, initialState);

  const ctxValue = {
    listState,
    listDispatch,
    selectedMovieId,
    selectedSeriesId,
    setSelectedMovieId,
    setSelectedSeriesId,
  };

  useEffect(() => {
    const lists = localStorage.getItem("lists");
    if (lists) {
      listDispatch({
        type: "initialSet",
        payload: {
          lists: JSON.parse(lists),
        },
      });
    }
  }, []);

  return <MainStore.Provider value={ctxValue}>{children}</MainStore.Provider>;
}
