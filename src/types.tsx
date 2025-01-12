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
}

interface List {
  name: string;
  movies: number[];
}

export type { Movie, List };
