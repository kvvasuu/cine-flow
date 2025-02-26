import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import SearchBar from "./SearchBar.tsx";
import ProfileIMG from "../../assets/images/ProfileIMG.png";
import GiftIcon from "../../assets/icons/GiftBox.svg";
import BellIcon from "../../assets/icons/NotificationBell.svg";
import "./Navbar.css";

export default function Navbar() {
  const [hasBackground, setHasBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.body.scrollTop;
      setHasBackground(scrollTop > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={
        "w-full h-16 flex items-center justify-between px-14 fixed top-0 left-0 z-40 transition-all" +
        (hasBackground ? " bg-neutral-900" : "")
      }
    >
      <div id="header-left" className="flex items-center gap-12">
        <NavLink to="/">
          <h2 className="text-4xl font-clash font-bold text-ruby">Cineflow</h2>
        </NavLink>

        <nav id="navbar">
          <ol className="flex items-center justify-center gap-5 text-sm text-neutral-200 cursor-pointer">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/shows">TV Shows</NavLink>
            <NavLink to="/movies">Movies</NavLink>
            <NavLink to="/myLists">My Lists</NavLink>
          </ol>
        </nav>
      </div>
      <div id="header-right">
        <div className="flex items-center justify-center gap-5 text-neutral-200">
          <SearchBar></SearchBar>
          <p className="font-semibold cursor-pointer">Guest</p>
          <button>
            <img src={GiftIcon} alt="gifts" />
          </button>
          <button>
            <img src={BellIcon} alt="notifications" />
          </button>
          <button className="flex items-center gap-2">
            <img src={ProfileIMG} alt="profileIMG" />
            <i className="fa-solid fa-caret-down"></i>
          </button>
        </div>
      </div>
    </header>
  );
}
