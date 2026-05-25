import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export function ProfileCard({ id, name, image, isScrolling } ) {
  const navigate = useNavigate();
  const cardRef = useRef(null);


 const timerRef = useRef(null);
const rafRef = useRef(null);
const flickerRef = useRef(null);

useEffect(() => {
  const card = cardRef.current;
  if (!card) return;

  function flicker() {
    const opacity = (0.5 + Math.random() * 0.5).toFixed(2);
    card.style.setProperty("--flicker-opacity", opacity);
    rafRef.current = requestAnimationFrame(() => {
      flickerRef.current = setTimeout(flicker, 40 + Math.random() * 80);
    });
  }

  function stopFlicker() {
    cancelAnimationFrame(rafRef.current);
    clearTimeout(flickerRef.current);
    card.style.setProperty("--flicker-opacity", "0");
  }

  if (isScrolling) {
    card.classList.add("scrolling");
    flicker();
  } else {
    card.classList.remove("scrolling");
    stopFlicker();
  }

  return () => stopFlicker();
}, [isScrolling]);

  return (
    <div
      className="card absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:relative lg:left-auto lg:top-auto lg:translate-x-0 lg:translate-y-0 flex justify-center items-center"
      onClick={() => {
  console.log("clicked", id);
  navigate(`/event/${id}`);
}} // ← passes the id
    >

      
      <div
        ref={cardRef}
        className="profile-card w-96 bg-[oklch(21%_0.034_264.665)] rounded-2xl overflow-hidden shadow-xl relative"
      >
        <div className="h-[500px] overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover object-top"
          />

 <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none">
  <div className="animate-bounce flex flex-col items-center">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </svg>
    <p className="text-white/80 text-sm tracking-widest text-center">click</p>
  </div>
</div>




          
        </div>
        <div className="text-center py-6">
          <h2 className="custom-fontt">{name}</h2>
        </div>
      </div>
    </div>
  );
}
