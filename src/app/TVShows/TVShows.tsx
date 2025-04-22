import { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "../../types.tsx";
import SliderList from "../../components/SliderList.tsx";
import SliderListSkeleton from "../../components/skeletons/SliderListSkeleton.tsx";
import { motion } from "motion/react"


export default function TVShows() {
  const [airingToday, setAiringToday] = useState<Movie[]>([]);
  const [onTheAir, setOnTheAir] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const storedAiringToday = sessionStorage.getItem("airingToday");
      const storedOnTheAir = sessionStorage.getItem("onTheAir");
      const storedPopular = sessionStorage.getItem("popular");
      const storedTopRated = sessionStorage.getItem("topRated");

      if (
        storedAiringToday &&
        storedOnTheAir &&
        storedPopular &&
        storedTopRated
      ) {
        setAiringToday(JSON.parse(storedAiringToday));
        setOnTheAir(JSON.parse(storedOnTheAir));
        setPopular(JSON.parse(storedPopular));
        setTopRated(JSON.parse(storedTopRated));
      } else {
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

          const airingData = airingResponse.data.results.map((el: any) => ({
            ...el,
            title: el.name,
            release_date: el.first_air_date,
          }));
          const onTheAirData = onTheAirResponse.data.results.map((el: any) => ({
            ...el,
            title: el.name,
            release_date: el.first_air_date,
          }));
          const popularData = popularResponse.data.results.map((el: any) => ({
            ...el,
            title: el.name,
            release_date: el.first_air_date,
          }));
          const topRatedData = topRatedResponse.data.results.map((el: any) => ({
            ...el,
            title: el.name,
            release_date: el.first_air_date,
          }));

          setAiringToday(airingData);
          setOnTheAir(onTheAirData);
          setPopular(popularData);
          setTopRated(topRatedData);

          sessionStorage.setItem("airingToday", JSON.stringify(airingData));
          sessionStorage.setItem("onTheAir", JSON.stringify(onTheAirData));
          sessionStorage.setItem("popular", JSON.stringify(popularData));
          sessionStorage.setItem("topRated", JSON.stringify(topRatedData));
        } catch (error) {
          console.error("Error fetching TV shows:", error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full pb-8 mt-20 flex flex-col gap-8">
      {airingToday.length > 0 ? (
        <SliderList
          isTV
          movies={airingToday}
          category="Airing Today"
        ></SliderList>
      ) : (
        <SliderListSkeleton></SliderListSkeleton>
      )}

      {onTheAir.length > 0 ? (
        <SliderList isTV movies={onTheAir} category="On The Air"></SliderList>
      ) : (
        <SliderListSkeleton></SliderListSkeleton>
      )}

      {popular.length > 0 ? (
        <SliderList isTV movies={popular} category="Popular"></SliderList>
      ) : (
        <SliderListSkeleton></SliderListSkeleton>
      )}

      {topRated.length > 0 ? (
        <SliderList isTV movies={topRated} category="Top Rated"></SliderList>
      ) : (
        <SliderListSkeleton></SliderListSkeleton>
      )}
    </motion.div>
  );
}
