import SliderList from "../components/SliderList";

import MoviePoster from "../assets/images/MoviePoster.png";
import Play from "../assets/icons/Play.png";
import Info from "../assets/icons/Info.png";

interface Props {
  movie: string;
}

function HighligtedMovie({ movie }: Props) {
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
    <section className="flex flex-col justify-end w-full h-[60rem] relative shrink-0">
      <img
        src={MoviePoster}
        alt="Movie poster"
        className="w-full min-h-[60rem] absolute top-0 left-0 pointer-events-none object-cover"
      />
      <div className="w-full min-h-[60rem] absolute top-0 left-0 pointer-events-none object-cover z-10 bg-gradient-small"></div>
      <div className="flex flex-col items-start gap-4 z-10 w-1/2 max-w-2xl p-16">
        <h2 className="text-5xl font-bold text-neutral-50 select-none">
          {movie}
        </h2>
        <h4 className="text-xl text-neutral-100">
          Emir, who learned to take care of himself at a young age and worked
          hard to reach an important position in the business world, one day
          meets a street singer girl and his life changes.
        </h4>
        <div className="flex gap-4 mb-6">
          <button className="flex items-center justify-center gap-4 font-bold text-neutral-950 bg-neutral-50 rounded py-3 px-8 hover:bg-neutral-200">
            <img src={Play} alt="" className="w-6 h-6" />
            Play
          </button>
          <button className="flex items-center justify-center gap-4 font-bold text-neutral-50 bg-neutral-50/30 hover:bg-neutral-50/40 rounded py-3 px-8">
            <img src={Info} alt="" className="w-6 h-6" />
            More info
          </button>
        </div>
      </div>
      <SliderList movies={movies} category="Recently Added"></SliderList>
    </section>
  );
}

export default HighligtedMovie;
