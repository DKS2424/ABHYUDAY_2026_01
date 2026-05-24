import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const pinContainerRef = useRef(null);
  const heroImageRef = useRef(null);
  const leftTreesRef = useRef(null);
  const rightTreesRef = useRef(null);
  const mainTextRef = useRef(null);
  const kidsRef = useRef(null);
  const revealWrapperRef = useRef(null);
  const abWrapperRef = useRef(null);
  const creepyBgRef = useRef(null);

  // New specific refs to guarantee the fade-out targets the elements perfectly
  const leftHudRef = useRef(null);
  const rightHudRef = useRef(null);
  const redGlowRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const container = pinContainerRef.current;
    const image = heroImageRef.current;

    if (!container || !image) return;

    // 1. Main pinned section
    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "+=5000",
      pin: true,
      markers: false,
    });

    // 2. Initial entry/scroll parralax animations
    gsap.to(image, {
      scale: 1.15,
      y: -50,
      ease: "none",
      scrollTrigger: { trigger: container, start: 0, end: 1000, scrub: true },
    });

    gsap.to(leftTreesRef.current, {
      x: -200,
      y: -50,
      scale: 1.25,
      ease: "none",
      scrollTrigger: { trigger: container, start: 0, end: 1000, scrub: true },
    });

    gsap.to(rightTreesRef.current, {
      x: 200,
      y: -50,
      scale: 1.25,
      ease: "none",
      scrollTrigger: { trigger: container, start: 0, end: 1000, scrub: true },
    });

    gsap.to(mainTextRef.current, {
      y: -150,
      opacity: 0,
      ease: "none",
      scrollTrigger: { trigger: container, start: 0, end: 1000, scrub: true },
    });

    gsap.to(kidsRef.current, {
      y: -150,
      scale: 2,
      ease: "none",
      scrollTrigger: { trigger: container, start: 0, end: 1000, scrub: true },
    });

    gsap.to(revealWrapperRef.current, {
      y: "-100vh",
      ease: "none",
      scrollTrigger: { trigger: container, start: 500, end: 2700, scrub: true },
    });

    // Metadata Reveal
    gsap.set(".metadata-inner", {
      yPercent: 120,
      clipPath: "inset(0 0 100% 0)",
    });

    gsap.to(".metadata-inner", {
      yPercent: 0,
      clipPath: "inset(0 0 0% 0)",
      stagger: { each: 0.08 },
      ease: "power4.out",
      scrollTrigger: {
        trigger: container,
        start: 1900,
        end: 2800,
        scrub: true,
      },
    });

    // Letters animation
    const letterOffsets = [-10, 25, -18, 12, -30, 18, -15, 28];
    gsap.set(".ab-letter", { yPercent: (i) => letterOffsets[i] });

    gsap.to(".ab-letter", {
      yPercent: 0,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: 1700,
        end: 2500,
        scrub: true,
      },
    });

    // Creepy Background clip mask reveal
    gsap.set(creepyBgRef.current, {
      clipPath: "inset(100% 0 0 0)",
      yPercent: 8,
    });
    gsap.to(creepyBgRef.current, {
      clipPath: "inset(0% 0 0 0)",
      yPercent: 0,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: 1800,
        end: 3200,
        scrub: true,
      },
    });

    // --- THE TOTAL BLACKOUT SYSTEM ---
    // Targets refs explicitly so class refactors can't break the animation timeline
    const terminalExitTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "3500",
        end: "4800",
        scrub: true,
      },
    });

    terminalExitTimeline
      // 1. Instantly clear main central content wrapper out of frame view
      .to(
        abWrapperRef.current,
        {
          scale: 0.9,
          opacity: 0,
          yPercent: -10,
          ease: "power2.in",
        },
        0,
      )

      // 2. Pull the side HUD grids up/away and drop opacity to 0
      .to(
        [leftHudRef.current, rightHudRef.current],
        {
          y: -50,
          opacity: 0,
          ease: "power2.in",
        },
        0,
      )

      // 3. Make the red center core flare out dynamically like an imploding tube monitor
      // .to(
      //   redGlowRef.current,
      //   {
      //     scale: 1.4,
      //     opacity: 0.4,
      //     backgroundColor: "rgba(220, 38, 38, 0.4)",
      //     ease: "power1.out",
      //   },
      //   0,
      // )

      // 4. Force collapse the environmental elements to zero
      .to(
        [redGlowRef.current, creepyBgRef.current],
        {
          opacity: 0,
          ease: "power3.in",
        },
        0,
      )

      // 5. Hard hide everything from layout at the absolute end to avoid pointer ghosts
      .set(
        [
          abWrapperRef.current,
          leftHudRef.current,
          rightHudRef.current,
          redGlowRef.current,
          creepyBgRef.current,
        ],
        {
          display: "none",
        },
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div>
      <div
        ref={pinContainerRef}
        className="relative bg-black" // Added solid black base backing canvas
        style={{
          height: "100dvh",
          width: "100%",
        }}
      >
        {/* --- SCENE 1: OVERWORLD --- */}
        <div
          ref={revealWrapperRef}
          className="absolute inset-0 overflow-hidden"
          style={{ zIndex: 1 }}
        >
          <img
            ref={heroImageRef}
            src="/hero-bg.jpg"
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 1,
            }}
          />

          <img
            ref={leftTreesRef}
            src="/trees-left.png"
            alt=""
            style={{
              position: "absolute",
              top: 0,
              height: "100%",
              width: "auto",
              maxWidth: "none",
              zIndex: 2,
            }}
            className="ml-[-650px] sm:ml-[-700px] md:ml-[-650px] lg:ml-[-600px] xl:ml-[-500px] 2xl:ml-[-350px]"
          />

          <img
            ref={rightTreesRef}
            src="/trees-right.png"
            alt=""
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              height: "100%",
              width: "auto",
              maxWidth: "none",
              zIndex: 2,
            }}
            className="mr-[-650px] sm:mr-[-700px] md:mr-[-650px] lg:mr-[-600px] xl:mr-[-500px] 2xl:mr-[-350px]"
          />

          <div
            ref={mainTextRef}
            className="absolute top-[10%] w-full text-center text-white px-4"
            style={{ zIndex: 3 }}
          >
            <p className="tracking-[0.25em] text-sm md:text-base">
              WELCOME TO THE
            </p>
            <h1 className="font-bold leading-none mt-2 text-[clamp(2.25rem,5vw,4rem)]">
              UPSIDE <span>DOWN</span>
            </h1>
            <p className="tracking-[0.25em] mt-2 text-sm md:text-base">
              MCA, MSRIT
            </p>
          </div>

          <img
            ref={kidsRef}
            src="/strange-kids.png"
            alt="Kids"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 min-w-[1200px]"
            style={{ zIndex: 4 }}
          />
        </div>

        {/* --- SCENE 2: THE UPSIDE DOWN HUD TERMINAL --- */}
        <div
          className="absolute inset-0 overflow-hidden bg-black"
          style={{ zIndex: 0 }}
        >
          <img
            ref={creepyBgRef}
            src="/creepy-background.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover brightness-[1.2] contrast-[1]"
          />

          {/* Red atmospheric glow */}
          <div className="absolute inset-0 z-[2] pointer-events-none">
            <div
              ref={redGlowRef}
              className="
                absolute top-1/2 left-1/2
                w-[320px] md:w-[900px]
                h-[220px] md:h-[500px]
                -translate-x-1/2 -translate-y-1/2
                bg-red-600/15
                blur-[70px] md:blur-[140px]
              "
            />
          </div>

          {/* Scanlines layer */}
          <div className="scanlines absolute inset-0 z-[3] pointer-events-none opacity-60 md:opacity-100" />

          {/* Corner HUD - Left */}
          <div
            ref={leftHudRef}
            className="
              absolute top-4 md:top-10 left-4 md:left-10 z-[4]
              text-red-500 font-mono uppercase text-[8px] sm:text-[9px] md:text-sm
              tracking-[0.12em] md:tracking-[0.2em] max-w-[140px] md:max-w-none
            "
          >
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500 animate-pulse" />
              REC
            </div>
            <p>Transmission 07</p>
            <p className="mt-1">Theta Network [LIVE]</p>
            <p className="mt-1 text-red-300 break-words">
              Feed: ABHYUDAY_SIGNAL_1986
            </p>
          </div>

          {/* Right HUD */}
          <div
            ref={rightHudRef}
            className="
              absolute top-4 md:top-10 right-4 md:right-10 z-[4]
              text-right font-mono uppercase text-[8px] sm:text-[9px] md:text-sm
              tracking-[0.12em] md:tracking-[0.2em] max-w-[120px] md:max-w-none
            "
          >
            <p>UPSIDE DOWN FREQUENCY</p>
            <p className="text-lg md:text-2xl mt-1 md:mt-2 text-red-500">
              88.6 MHz
            </p>
            <p className="mt-1 md:mt-2">CHANNEL v1.0</p>
          </div>

          {/* Main content viewport block */}
          <div
            ref={abWrapperRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5] w-full px-4 md:px-6 text-center text-white"
          >
            <p className="text-red-500 uppercase tracking-[0.28em] md:tracking-[0.5em] text-[10px] md:text-sm mb-4 md:mb-6 font-mono">
              ENTER THE UPSIDE DOWN
            </p>

            <h1
              className="flex justify-center flex-nowrap whitespace-nowrap text-[clamp(3.8rem,18vw,16rem)] font-black uppercase leading-[0.82] tracking-[-0.06em] text-white select-none"
              style={{
                fontFamily:
                  'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
              }}
            >
              {"ABHYUDAY".split("").map((letter, index) => (
                <span key={index} className="ab-letter inline-block">
                  {letter}
                </span>
              ))}
            </h1>

            {/* Oscilloscope/Signal Bar */}
            <div className="mt-4 md:mt-6 flex justify-center">
              <div className="w-[88vw] md:w-[70vw] max-w-[900px] h-[1px] bg-red-500 relative overflow-hidden">
                <div className="absolute inset-0 waveform" />
              </div>
            </div>

            <p className="mt-4 md:mt-5 text-red-500 uppercase tracking-[0.28em] md:tracking-[0.4em] text-[10px] md:text-sm font-mono">
              SIGNAL DETECTED
            </p>

            {/* Metadata Cluster wrapper */}
            <div className="mt-10 md:mt-14 w-full max-w-6xl mx-auto">
              {/* Mobile View matrix */}
              <div className="flex flex-col gap-3 md:hidden">
                {[
                  { label: "LOCATION", value: "MSRIT CAMPUS" },
                  { label: "TRANSMISSION", value: "ACTIVE" },
                  { label: "STATUS", value: "OPEN" },
                  { label: "DATE", value: "OCT 10 1986" },
                  { label: "CHANNEL", value: "v1.0" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="metadata-item overflow-hidden border border-red-500/10 bg-black/20 px-4 py-3"
                  >
                    <div className="metadata-inner flex items-center justify-between gap-4">
                      <p className="text-[9px] uppercase tracking-[0.22em] text-red-500/60 font-mono shrink-0">
                        {item.label}
                      </p>
                      <p className="text-[11px] tracking-[0.08em] text-white font-mono text-right">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop View grid */}
              <div className="hidden md:grid grid-cols-5 gap-6 text-left font-mono">
                {[
                  { label: "Location", value: "MSRIT CAMPUS" },
                  { label: "Transmission", value: "ACTIVE" },
                  { label: "Status", value: "OPEN" },
                  { label: "Date", value: "OCT 10 1986" },
                  { label: "Channel", value: "v1.0" },
                ].map((item, index) => (
                  <div key={index} className="metadata-item overflow-hidden">
                    <div className="metadata-inner">
                      <p className="text-red-500/60 text-[10px] uppercase tracking-[0.3em]">
                        {item.label}
                      </p>
                      <p className="text-white text-lg tracking-[0.15em] mt-2">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive CTA */}
            <button className="mt-10 md:mt-14 border border-red-500 px-8 md:px-12 py-3 md:py-4 text-red-500 uppercase tracking-[0.24em] md:tracking-[0.4em] font-mono text-[10px] md:text-sm hover:bg-red-500 hover:text-black transition-all duration-300">
              ENTER EXPERIENCE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
