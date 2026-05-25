import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useState} from "react";
 

const COLORS = ["#ff2200", "#ff6600", "#ff0044", "#cc0000", "#ff0044"];

export function ChristmasLights({ active }) {
  const [mounted, setMounted] = useState(false);  
  const bulbRefs = useRef([]);
  const timeoutRef = useRef(null);
    useEffect(() => {
    setMounted(true);  // 👈 DOM is ready now
  }, []);

  useEffect(() => {
    function flicker() {
      bulbRefs.current.forEach((b, i) => {
        if (!b) return;

        const on = Math.random() > 0.3;
        const color = COLORS[i % COLORS.length];

        b.style.background = on ? color : "#333";
        b.style.boxShadow = on ? `0 0 8px 2px ${color}` : "none";
        b.style.borderColor = on ? color : "#444";
      });

      timeoutRef.current = setTimeout(
        flicker,
        60 + Math.random() * 100
      );
    }

    if (active) {
      flicker();
    } else {
      clearTimeout(timeoutRef.current);

      bulbRefs.current.forEach((b) => {
        if (!b) return;
        b.style.background = "#333";
        b.style.boxShadow = "none";
        b.style.borderColor = "#444";
      });
    }

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [active]);
   if (!mounted || !active) return null; 

  return createPortal(
   <div
  style={{
    position: "fixed",
    top: "10%",
    left: "50%",                    // ✅ true center
    transform: "translateX(-50%)",  // ✅ offset by own width
    display: "flex",
    alignItems: "center",
    padding: "8px 16px",
    justifyContent: "center",
    // ❌ removed overflow: hidden — was clipping the glow
  }}
>
  {Array.from({ length: 16 }).map((_, i) => (
    <div key={i} style={{ display: "flex", alignItems: "center" }}>
      <div
        ref={(el) => (bulbRefs.current[i] = el)}
        style={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: "#555",       // ✅ visible when off
          border: "1.5px solid #888", // ✅ visible when off
        }}
      />
      {i < 15 && (
        <div
          style={{
            width: 20,
            height: 1.5,
            background: "#666",     // ✅ brighter wire
          }}
        />
      )}
    </div>
  ))}
</div>,
 document.body 
  );
}