import { Outlet, useLocation } from "react-router";
import Footer from "./components/Footer";
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";
import ScrollToTop from "./lib/ScrollToTop";
import Header2 from "./components/Header2";
import Header3 from "./components/Header3";
import WhatsAppFloat from "./components/WhatsAppFloat";


function App() {
  const location = useLocation();
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      // smoothTouch: false,
      touchMultiplier: 2,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);


  return (

    <div className="">
      <ScrollToTop />
        {location.pathname === "/" ? <Header3 /> : <Header2 />}

      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

export default App;
