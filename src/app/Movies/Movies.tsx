import { useEffect, useState } from "react";

import axios from "axios";

import { Movie } from "../../types.tsx";

import SliderList from "../../components/SliderList.tsx";
import SliderListSkeleton from "../../components/skeletons/SliderListSkeleton.tsx";

function Movies() {
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);
  const [fantasyMovies, setFantasyMovies] = useState<Movie[]>([]);
  const [romanceMovies, setRomanceMovies] = useState<Movie[]>([]);
  const [horrorMovies, setHorrorMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          actionResponse,
          comedyResponse,
          fantasyResponse,
          romanceResponse,
          horrorResponse,
        ] = await Promise.all([
          axios.get(
            "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28"
          ),
          axios.get(
            "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc&with_genres=35"
          ),
          axios.get(
            "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=3&sort_by=popularity.desc&with_genres=14"
          ),
          axios.get(
            "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=4&sort_by=popularity.desc&with_genres=10749"
          ),
          axios.get(
            "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=5&sort_by=popularity.desc&with_genres=27"
          ),
        ]);

        setActionMovies(actionResponse.data.results);
        setComedyMovies(comedyResponse.data.results);
        setFantasyMovies(fantasyResponse.data.results);
        setRomanceMovies(romanceResponse.data.results);
        setHorrorMovies(horrorResponse.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="w-full pb-8 mt-20 flex flex-col gap-8">
        {actionMovies.length > 0 ? (
          <SliderList movies={actionMovies} category="Action"></SliderList>
        ) : (
          <SliderListSkeleton></SliderListSkeleton>
        )}

        {comedyMovies.length > 0 ? (
          <SliderList movies={comedyMovies} category="Comedy"></SliderList>
        ) : (
          <SliderListSkeleton></SliderListSkeleton>
        )}

        {fantasyMovies.length > 0 ? (
          <SliderList movies={fantasyMovies} category="Fantasy"></SliderList>
        ) : (
          <SliderListSkeleton></SliderListSkeleton>
        )}

        {romanceMovies.length > 0 ? (
          <SliderList movies={romanceMovies} category="Romance"></SliderList>
        ) : (
          <SliderListSkeleton></SliderListSkeleton>
        )}

        {horrorMovies.length > 0 ? (
          <SliderList movies={horrorMovies} category="Horror"></SliderList>
        ) : (
          <SliderListSkeleton></SliderListSkeleton>
        )}
      </div>
    </>
  );
}

export default Movies;
