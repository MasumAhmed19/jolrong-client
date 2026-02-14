import { Outlet, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import Preloader from "./components/Preloader";
import Footer from "./components/Footer";
import Lenis from "@studio-freight/lenis";
import { useEffect, useState } from "react";
import ScrollToTop from "./lib/ScrollToTop";
import Header2 from "./components/Header2";
import Header3 from "./components/Header3";
import WhatsAppFloat from "./components/WhatsAppFloat";
import Preloader2 from "./components/Preloader2";
import { useGetActiveSlidersQuery } from "./redux/api/slider/slider.api";


function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isLoading, setIsLoading] = useState(isHomePage);

  // Fetch slider data only on home page
  const { data: sliderData, isLoading: isSliderLoading } = useGetActiveSlidersQuery(undefined, {
    skip: !isHomePage, // Only fetch on home page
  });

  useEffect(() => {
    if (!isHomePage) {
      setIsLoading(false);
      return;
    }

    // Wait for slider data to load
    if (isSliderLoading) return;

    // Get the first slider image URL
    const firstImageUrl = sliderData?.data?.[0]?.imageUrl;

    if (!firstImageUrl) {
      // No slider data, hide preloader after minimum time
      const timer = setTimeout(() => setIsLoading(false), 2000);
      return () => clearTimeout(timer);
    }

    // Preload the first image
    const img = new Image();
    img.src = firstImageUrl;

    const handleImageLoad = () => {
      // Add minimum delay for smooth transition
      setTimeout(() => setIsLoading(false), 500);
    };

    const handleImageError = () => {
      // If image fails to load, hide preloader anyway
      setTimeout(() => setIsLoading(false), 1000);
    };

    img.addEventListener("load", handleImageLoad);
    img.addEventListener("error", handleImageError);

    // Fallback timeout in case something goes wrong
    const fallbackTimer = setTimeout(() => setIsLoading(false), 5000);

    return () => {
      img.removeEventListener("load", handleImageLoad);
      img.removeEventListener("error", handleImageError);
      clearTimeout(fallbackTimer);
    };
  }, [isHomePage, isSliderLoading, sliderData]);

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
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
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
