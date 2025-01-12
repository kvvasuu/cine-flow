function SliderListSkeleton() {
  return (
    <div className="w-full flex flex-col z-10 gap-2 relative animate-pulse">
      <div className="px-16 mb-2">
        <div className="w-32 h-8 rounded-full bg-neutral-700"></div>
      </div>

      <div className="w-full h-full flex items-center justify-start overflow-x-auto snap-x scroll-px-16 gap-2 px-16 no-scrollbar scroll-smooth">
        <div className="w-[284px] h-40 flex flex-col relative shrink-0 overflow-hidden rounded snap-start bg-neutral-700"></div>
        <div className="w-[284px] h-40 flex flex-col relative shrink-0 overflow-hidden rounded snap-start bg-neutral-700"></div>
        <div className="w-[284px] h-40 flex flex-col relative shrink-0 overflow-hidden rounded snap-start bg-neutral-700"></div>
        <div className="w-[284px] h-40 flex flex-col relative shrink-0 overflow-hidden rounded snap-start bg-neutral-700"></div>
        <div className="w-[284px] h-40 flex flex-col relative shrink-0 overflow-hidden rounded snap-start bg-neutral-700"></div>
        <div className="w-[284px] h-40 flex flex-col relative shrink-0 overflow-hidden rounded snap-start bg-neutral-700"></div>
        <div className="w-[284px] h-40 flex flex-col relative shrink-0 overflow-hidden rounded snap-start bg-neutral-700"></div>
      </div>
    </div>
  );
}

export default SliderListSkeleton;
