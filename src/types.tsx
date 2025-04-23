interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
  genres: { id: string; name: string }[];
  runtime: number;
  trailerKey: string;
  type: "movie" | "series";
}

interface List {
  name: string;
  movies: { id: number; type: "movie" | "series" }[];
}

export type { Movie, List };
