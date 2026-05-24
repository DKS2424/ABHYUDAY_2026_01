import { useEffect, useRef } from "react";

const COLORS = ["#ff2200", "#ff6600", "#ff0044", "#cc0000", "#ff0044"];

export function ChristmasLights({ active }) {
  const bulbRefs = useRef([]);
  const timeoutRef = useRef(null);

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

  return (
    <div
      style={{
        position: "fixed",
        top: "4%",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        padding: "8px 16px",
        zIndex: 9999,
        justifyContent: "center",
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
              background: "#333",
              border: "1.5px solid #444",
            }}
          />
          {i < 15 && (
            <div
              style={{
                width: 20,
                height: 1.5,
                background: "#444",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}