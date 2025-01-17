import { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "../../types.tsx";
import SliderList from "../../components/SliderList.tsx";
import SliderListSkeleton from "../../components/skeletons/SliderListSkeleton.tsx";

export default function Movies() {
  const [actionMovies, setActionMovies] = useState<Movie[]>(
    JSON.parse(sessionStorage.getItem("actionMovies") || "[]")
  );
  const [comedyMovies, setComedyMovies] = useState<Movie[]>(
    JSON.parse(sessionStorage.getItem("comedyMovies") || "[]")
  );
  const [fantasyMovies, setFantasyMovies] = useState<Movie[]>(
    JSON.parse(sessionStorage.getItem("fantasyMovies") || "[]")
  );
  const [romanceMovies, setRomanceMovies] = useState<Movie[]>(
    JSON.parse(sessionStorage.getItem("romanceMovies") || "[]")
  );
  const [horrorMovies, setHorrorMovies] = useState<Movie[]>(
    JSON.parse(sessionStorage.getItem("horrorMovies") || "[]")
  );

  const [loading, setLoading] = useState(
    !actionMovies.length ||
      !comedyMovies.length ||
      !fantasyMovies.length ||
      !romanceMovies.length ||
      !horrorMovies.length
  );

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

        const action = actionResponse.data.results;
        const comedy = comedyResponse.data.results;
        const fantasy = fantasyResponse.data.results;
        const romance = romanceResponse.data.results;
        const horror = horrorResponse.data.results;

        sessionStorage.setItem("actionMovies", JSON.stringify(action));
        sessionStorage.setItem("comedyMovies", JSON.stringify(comedy));
        sessionStorage.setItem("fantasyMovies", JSON.stringify(fantasy));
        sessionStorage.setItem("romanceMovies", JSON.stringify(romance));
        sessionStorage.setItem("horrorMovies", JSON.stringify(horror));

        setActionMovies(action);
        setComedyMovies(comedy);
        setFantasyMovies(fantasy);
        setRomanceMovies(romance);
        setHorrorMovies(horror);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      fetchData();
    }
  }, [loading]);

  return (
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
  );
}
