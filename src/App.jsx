import Footer from "./components/Footer";
import { Hero } from "./components/Hero";
import { Routes, Route } from "react-router-dom";
import EventPage from "./components/EventPage";
import { useLocation } from "react-router-dom";

import { ProfileCard } from "./components/ProfileCard";
import { ChristmasLights } from "./components/ChristmasLights";
import { useState, useEffect, useRef } from "react";

import dustin from "./assets/Dustin.webp";
import eleven from "./assets/Eleven.webp";
import hopper from "./assets/Hopper.webp";

import Jhonathan from "./assets/Jhonathan.webp";
import joyce from "./assets/Joyce.webp";
import lucas from "./assets/Lucas.webp";
import mike from "./assets/Mike.webp";
import murray from "./assets/Murray.webp";
import nancy from "./assets/Nancy.webp";
import robin from "./assets/Robin.jpg";
import steve from "./assets/Steve.webp";
import will from "./assets/Will.webp";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function App() {
    const [isScrolling, setIsScrolling] = useState(false);
  const sectionRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [isPinned, setIsPinned] = useState(false); // rename for clarity

useEffect(() => {
  if (location.pathname === "/") {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    ScrollTrigger.refresh();
  } else {
    setIsScrolling(false);
  }
}, [location.pathname]);

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsLoading(false),
    });

    tl.to("#loader", {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      delay: 1,
    }).set("#loader", { display: "none" });
  }, []);

useEffect(() => {
  if (location.pathname !== "/") {
    setIsScrolling(false);
    window.scrollTo(0, 0);
  }
}, [location.pathname]); 


  //Profile card 

  useEffect(() => {
  if (location.pathname !== "/") return;

  const timeout = setTimeout(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      gsap.to(".cards", {
        x: -2400,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2000",
          scrub: 1,
          pin: true,
          onEnter: () => setIsPinned(true),
          onLeave: () => setIsPinned(false),
          onLeaveBack: () => setIsPinned(false),
          onEnterBack: () => setIsPinned(true),
        },
      });
    });

    mm.add("(max-width: 1023px)", () => {
      const cards = gsap.utils.toArray(".card");
      gsap.set(cards, {
        position: "absolute",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${cards.length * window.innerHeight * 2}`,
          scrub: 0.5,
          pin: true,
          onEnter: () => setIsPinned(true),
          onLeave: () => setIsPinned(false),
          onLeaveBack: () => setIsPinned(false),
          onEnterBack: () => setIsPinned(true),
        },
      });

      cards.forEach((card, index) => {
        if (index === 0) return;
        tl.fromTo(card,
          { y: 300, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
        );
      });
    });

    ScrollTrigger.refresh();
  }, 100);

  return () => {
    clearTimeout(timeout);
    setIsPinned(false); // 👈 force reset on cleanup
    ScrollTrigger.killAll();
    gsap.killTweensOf("*");
    gsap.set(".cards", { clearProps: "all" });
  };
}, [location.pathname]);


  return (
<>    <ChristmasLights active={isPinned} />
     <Routes>
    <Route
      path="/"
      element={
        <div>
          <Hero />

          <section
            ref={sectionRef}
            className="h-screen overflow-hidden flex justify-center relative"
          >

        
            {/* <ChristmasLights active={isScrolling} style={{ position: "fixed" }}/> */}

            <div
              className="
                cards
                relative
                w-full
                h-screen
                lg:flex
                lg:flex-row
                gap-10
                lg:px-20
                lg:pt-20
              "
            >
              <ProfileCard id={1} name="Lucas" image={lucas} isScrolling={isPinned} />
              <ProfileCard id={2} name="Eleven" image={eleven} isScrolling={isPinned}/>
              <ProfileCard id={3} name="Dustin" image={dustin} isScrolling={isPinned}/>
              <ProfileCard id={4} name="Will" image={will} isScrolling={isPinned}/>
              <ProfileCard id={5} name="Hopper" image={hopper} isScrolling={isPinned}/>
              <ProfileCard id={6} name="Natalie" image={mike} isScrolling={isPinned}/>
              <ProfileCard id={7} name="Natalie" image={Jhonathan} isScrolling={isPinned}/>
              <ProfileCard id={8} name="Natalie" image={joyce} isScrolling={isPinned}/>
              <ProfileCard id={9} name="Natalie" image={robin} isScrolling={isPinned}/>
              <ProfileCard id={10} name="Natalie" image={nancy} isScrolling={isPinned}/>
            </div>
          </section>

          <Footer />
        </div>
      }
    />

    <Route path="/event/:id" element={<EventPage />} />
  </Routes>
  </>
  );
};

export default App;
