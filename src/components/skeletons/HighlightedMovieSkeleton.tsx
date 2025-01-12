import SliderListSkeleton from "../skeletons/SliderListSkeleton.tsx";

function HighligtedMovieSkeleton() {
  return (
    <section className="flex flex-col justify-end w-full h-[60rem] relative shrink-0 overflow-hidden">
      <div className="w-full min-h-[60rem] absolute top-0 left-0 pointer-events-none bg-neutral-800"></div>
      <div className="w-full min-h-[60rem] absolute top-0 left-0 pointer-events-none object-cover z-10 bg-gradient-small"></div>
      <div className="flex flex-col items-start gap-2 z-10 w-1/2 max-w-2xl p-16 animate-pulse">
        <div className="w-40 h-12 bg-neutral-700 rounded-full mb-2"></div>
        <div className="w-96 h-6 bg-neutral-700 rounded-full"></div>
        <div className="w-80 h-6 bg-neutral-700 rounded-full"></div>
        <div className="w-96 h-6 bg-neutral-700 rounded-full"></div>
        <div className="flex gap-4 mb-6 mt-6">
          <div className="h-12 w-28 bg-neutral-700 rounded"></div>
          <div className="h-12 w-36 bg-neutral-700 rounded"></div>
        </div>
      </div>
      <SliderListSkeleton></SliderListSkeleton>
    </section>
  );
}

export default HighligtedMovieSkeleton;
