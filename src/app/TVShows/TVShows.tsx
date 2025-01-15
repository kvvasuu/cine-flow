import { useEffect, useState } from "react";

import axios from "axios";

import { Movie } from "../../types.tsx";

import SliderList from "../../components/SliderList.tsx";
import SliderListSkeleton from "../../components/skeletons/SliderListSkeleton.tsx";

export default function TVShows() {
  const [airingToday, setAiringToday] = useState<Movie[]>([]);
  const [onTheAir, setOnTheAir] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          airingResponse,
          onTheAirResponse,
          popularResponse,
          topRatedResponse,
        ] = await Promise.all([
          axios.get(
            "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1"
          ),
          axios.get(
            "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=2"
          ),
          axios.get(
            "https://api.themoviedb.org/3/tv/popular?language=en-US&page=3"
          ),
          axios.get(
            "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1"
          ),
        ]);

        setAiringToday(airingResponse.data.results);
        setOnTheAir(onTheAirResponse.data.results);
        setPopular(popularResponse.data.results);
        setTopRated(topRatedResponse.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="w-full pb-8 mt-20 flex flex-col gap-8">
        {airingToday.length > 0 ? (
          <SliderList movies={airingToday} category="Airing Today"></SliderList>
        ) : (
          <SliderListSkeleton></SliderListSkeleton>
        )}

        {onTheAir.length > 0 ? (
          <SliderList movies={onTheAir} category="On The Air"></SliderList>
        ) : (
          <SliderListSkeleton></SliderListSkeleton>
        )}

        {popular.length > 0 ? (
          <SliderList movies={popular} category="Popular"></SliderList>
        ) : (
          <SliderListSkeleton></SliderListSkeleton>
        )}

        {topRated.length > 0 ? (
          <SliderList movies={topRated} category="Top Rated"></SliderList>
        ) : (
          <SliderListSkeleton></SliderListSkeleton>
        )}
      </div>
    </>
  );
}
