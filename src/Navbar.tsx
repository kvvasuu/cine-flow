import ProfileIMG from "./assets/images/ProfileIMG.png";
import SearchIcon from "./assets/icons/Search.svg";
import GiftIcon from "./assets/icons/GiftBox.svg";
import BellIcon from "./assets/icons/NotificationBell.svg";
import Logo from "./assets/images/logo.png";

function Navbar() {
  return (
    <header className="w-full h-20 flex items-center justify-between px-14">
      <div id="header-left" className="flex items-center gap-12">
        <img
          id="logo"
          src={Logo}
          alt="Cineflow"
          className="h-8 select-none drop-shadow-[0_0_3px_rgba(185,9,11,0.5)]"
        />

        <nav id="navbar">
          <ol className="flex items-center justify-center gap-5 text-sm text-neutral-200 cursor-pointer">
            <li className="font-bold text-neutral-50">Home</li>
            <li>TV Shows</li>
            <li>Movies</li>
            <li>Recently Added</li>
            <li>My List</li>
          </ol>
        </nav>
      </div>
      <div id="header-right">
        <div className="flex items-center justify-center gap-5 text-neutral-200">
          <button>
            <img src={SearchIcon} alt="search" />
          </button>
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

export default Navbar;
