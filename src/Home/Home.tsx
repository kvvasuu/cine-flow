import SliderList from "../components/SliderList";

import HighlightedMovie from "./HighlightedMovie.tsx";

function Home() {
  const movies = [
    "New Amsterdam",
    "New Amsterdam",
    "New Amsterdam",
    "New Amsterdam",
    "New Amsterdam",
    "New Amsterdam",
    "New Amsterdam",
    "New Amsterdam",
    "New Amsterdam",
    "New Amsterdam",
    "New Amsterdam",
  ];
  return (
    <div className="w-full pb-8 flex flex-col gap-8">
      <HighlightedMovie movie="Dummy Movie"></HighlightedMovie>
      <SliderList movies={movies} category="Top 10"></SliderList>
      <SliderList movies={movies} category="Watch Again"></SliderList>
      <SliderList movies={movies} category="My List"></SliderList>
    </div>
  );
}

export default Home;
