import { Routes, Route } from "react-router";
import { useEffect, useState. useRef } from "react";
import Navbar from "./Navbar";
import Home from "./Home/Home";
import Footer from "./Footer";

function App() {
  const [navbarHasBackground, setNavbarHasBackground] = useState(false);

  const mainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      console.log("handleScroll called, scrollTop:", scrollTop);
      setNavbarHasBackground(scrollTop > 100);
    };

    if(mainRef.current){
      mainRef.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }

    
  }, []);

  return (
    <>
      <Navbar hasBackground={navbarHasBackground} />
      <div className="w-full overflow-y-auto" ref={mainRef}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shows" element={<Home />} />
          <Route path="/movies" element={<Home />} />
          <Route path="/recent" element={<Home />} />
          <Route path="/my-list" element={<Home />} />
        </Routes>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
