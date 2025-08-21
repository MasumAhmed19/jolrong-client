import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";
import ScrollToTop from "./lib/ScrollToTop";
import Header2 from "./components/Header2";
import ContainerWidth from "./layout/ContainerWidth";


function App() {
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
    <>
      <ScrollToTop />
      <Header2 />
      {/* <Header3 /> */}

      <ContainerWidth>
        <Outlet />
      </ContainerWidth>
      <Footer />
    </>
  );
}

export default App;
