import MoviePoster from "../assets/images/MoviePoster.png";
import Play from "../assets/icons/Play.png";
import Info from "../assets/icons/Info.png";

interface Props {
  movie: string;
}

function SliderList({ movie }: Props) {
  return (
    <section className="flex flex-col justify-end w-full p-16">
      <img
        src={MoviePoster}
        alt="Movie poster"
        className="w-full max-w-full absolute top-0 left-0 pointer-events-none"
      />
      <div className="flex flex-col items-start gap-4 z-10 w-1/2">
        <h2 className="text-5xl font-bold text-neutral-50">Yanimda Kal</h2>
        <h4 className="text-xl text-neutral-100">
          Küçük yaşta başının çaresine bakmayı öğrenen ve çok çalışarak iş
          dünyasında önemli bir konuma gelen Emir, bir gün sokak şarkıcısı bir
          kızla karşılaşır ve hayatı değişir.
        </h4>
        <div className="flex gap-4">
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
    </section>
  );
}

export default SliderList;
