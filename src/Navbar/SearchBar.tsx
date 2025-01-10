import { useState, useRef, useEffect } from "react";

import SearchIcon from "../assets/icons/Search.svg";

function SearchBar() {
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearchClick = () => {
    setIsVisible((prevVal) => !prevVal);
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [isVisible, inputRef]);

  return (
    <div className="flex items-center justify-center relative min-w-10 h-10">
      {isVisible ? (
        <input
          type="text"
          name="search"
          id="search"
          className="h-full w-56 rounded-full bg-neutral-200 text-neutral-900 px-4 outline-none border-none"
          onBlur={() => setIsVisible(false)}
          ref={inputRef}
        />
      ) : (
        <button onClick={handleSearchClick}>
          <img src={SearchIcon} alt="search" />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
