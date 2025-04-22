import { create } from 'zustand'
import { List } from "../types";

type State = {
  listState: List[]
  selectedMovieId: number
  selectedSeriesId: number
}

type Action = {
  setSelectedMovieId: (selectedMovieId: State['selectedMovieId']) => void,
  setSelectedSeriesId: (selectedSeriesId: State['selectedSeriesId']) => void
}

const loadLists = () => {
  if (typeof window === 'undefined') return null
  const lists = localStorage.getItem('lists')
  return !!lists ? JSON.parse(lists) : [
    {
      name: "Favourites",
      movies: [],
    },
  ];
}

const useMainStore = create<State & Action>()((set) => {

  const lists = loadLists()

  return {
    listState: lists,
    selectedMovieId: 0,
    selectedSeriesId: 0,
    setSelectedMovieId: (id) => set(() => ({ selectedMovieId: id })),
    setSelectedSeriesId: (id) => set(() => ({ selectedSeriesId: id })),
  }
})

export default useMainStore
