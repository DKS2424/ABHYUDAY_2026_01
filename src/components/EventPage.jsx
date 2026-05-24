import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { events } from "./Events";

export default function EventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find((e) => e.id === Number(id));
  const canvasRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Floating dust particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.8 + 0.5,
      dy: -(Math.random() * 0.4 + 0.15),
      dx: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.55 + 0.15,
      color: Math.random() > 0.55 ? "#cc2200" : "#8800bb",
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        p.y += p.dy;
        p.x += p.dx;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  if (!event) {
    return (
      <div className="bg-black min-h-screen flex flex-col items-center justify-center gap-6">
        <p
          className="text-red-600 tracking-[0.4em] text-sm"
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
        >
          [ EVENT NOT FOUND IN THE UPSIDE DOWN ]
        </p>
        <button
          onClick={() => navigate(-1)}
          className="text-xs tracking-widest text-gray-500 border border-gray-800 px-5 py-2 rounded hover:border-red-900 hover:text-red-600 transition-colors"
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
        >
          ◀ RETURN
        </button>
      </div>
    );
  }

  return (
    <div
      className="bg-black min-h-screen overflow-x-hidden relative"
      style={{ fontFamily: "'Share Tech Mono', monospace" }}
    >
      {/* Google font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Creepster&family=Share+Tech+Mono&display=swap');

        @keyframes flicker {
          0%,18%,20%,22%,25%,53%,55%,100% { opacity: 1; }
          19%,21%,54% { opacity: 0.35; }
        }
        @keyframes flicker-slow {
          0%,90%,100% { opacity: 1; }
          92%,96% { opacity: 0.5; }
          94% { opacity: 0.1; }
        }
        @keyframes pulse-red {
          0%,100% { box-shadow: 0 0 0px #cc220000; border-color: rgba(204,34,0,0.25); }
          50% { box-shadow: 0 0 18px #cc220033; border-color: rgba(204,34,0,0.55); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow-blink {
          0%,100% { opacity: 0.7; }
          50%      { opacity: 1; }
        }
        .anim-slide { animation: slide-up 0.55s ease both; }
        .anim-slide-d1 { animation: slide-up 0.55s 0.1s ease both; }
        .anim-slide-d2 { animation: slide-up 0.55s 0.2s ease both; }
        .anim-slide-d3 { animation: slide-up 0.55s 0.3s ease both; }
        .anim-slide-d4 { animation: slide-up 0.55s 0.4s ease both; }
        .anim-slide-d5 { animation: slide-up 0.55s 0.5s ease both; }

        .scanlines {
          background-image: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.07) 2px,
            rgba(0,0,0,0.07) 4px
          );
        }

        .btn-whatsapp:hover { background: rgba(37,211,102,0.13) !important; }
        .btn-register:hover { background: rgba(204,34,0,0.2) !important; }

        .rule-row:hover .rule-num {
          background: #ff4422;
          transform: scale(1.1);
        }
      `}</style>

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.65 }}
      />

      {/* Scanline overlay */}
      <div className="scanlines fixed inset-0 pointer-events-none z-10" />

      {/* Deep radial bg glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(80,0,120,0.18) 0%, transparent 70%)",
        }}
      />

      {/* ── CONTENT ── */}
      {visible && (
        <div className="relative z-20 max-w-md mx-auto px-5 pb-24">

          {/* Back button */}
          <div className="anim-slide pt-6 pb-2">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[11px] tracking-[0.3em] text-red-700 border border-red-900/50 px-4 py-2 rounded transition-colors hover:bg-red-950/40 hover:text-red-500"
            >
              ◀ BACK TO HAWKINS
            </button>
          </div>

          {/* Top wire decoration */}
          <div className="anim-slide mt-6 mb-2 flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, #cc220055)" }} />
            <span className="text-[9px] tracking-[0.5em] text-red-900">HAWKINS LAB FILE</span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #cc220055, transparent)" }} />
          </div>

          {/* Category tag */}
          <div className="anim-slide-d1 text-center mt-6 mb-3">
            <span
              className="text-[9px] tracking-[0.5em] px-3 py-1 rounded border"
              style={{
                color: "#cc2200",
                borderColor: "rgba(204,34,0,0.35)",
                background: "rgba(204,34,0,0.07)",
                animation: "glow-blink 2.2s ease-in-out infinite",
              }}
            >
              ▌ {event.category} ▐
            </span>
          </div>

          {/* Event title */}
          <h1
            className="anim-slide-d1 text-center leading-tight mb-3"
            style={{
              fontFamily: "'Creepster', cursive",
              fontSize: "clamp(2rem, 10vw, 3rem)",
              color: "#ff6644",
              letterSpacing: "0.08em",
              textShadow: "0 0 24px rgba(204,34,0,0.5), 0 0 60px rgba(204,34,0,0.2)",
              animation: "flicker-slow 6s infinite",
            }}
          >
            {event.eventName}
          </h1>

          {/* Character name */}
          <p
            className="anim-slide-d1 text-center text-xs tracking-[0.3em] mb-2"
            style={{ color: "#555" }}
          >
            PRESENTED BY — <span style={{ color: "#888" }}>{event.name}</span>
          </p>

          {/* Description */}
          <p
            className="anim-slide-d2 text-center text-xs leading-relaxed tracking-wider mb-8 px-2"
            style={{ color: "#666" }}
          >
            {event.description}
          </p>

          {/* Info chips */}
          <div className="anim-slide-d2 grid grid-cols-2 gap-3 mb-6">
            {[
              { label: "DATE", value: event.date, icon: "◈" },
              { label: "TIME", value: event.time, icon: "◷" },
            ].map(({ label, value, icon }) => (
              <div
                key={label}
                className="rounded-xl p-4 text-center border"
                style={{
                  background: "rgba(204,34,0,0.04)",
                  borderColor: "rgba(204,34,0,0.2)",
                  animation: "pulse-red 3s ease-in-out infinite",
                }}
              >
                <p className="text-[9px] tracking-[0.4em] mb-2" style={{ color: "#444" }}>
                  {icon} {label}
                </p>
                <p
                  className="text-sm font-bold tracking-wider"
                  style={{ color: "#ff6644" }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Venue */}
          <div
            className="anim-slide-d3 rounded-xl p-5 mb-6 border"
            style={{
              background: "rgba(8,4,16,0.9)",
              borderColor: "rgba(204,34,0,0.18)",
              animation: "pulse-red 4s 1s ease-in-out infinite",
            }}
          >
            <p className="text-[9px] tracking-[0.5em] mb-3" style={{ color: "#cc2200" }}>
              ▶ LOCATION
            </p>
            <p className="text-sm leading-relaxed tracking-wide" style={{ color: "#aaa" }}>
              {event.venue}
            </p>
          </div>

          {/* Divider */}
          <div className="anim-slide-d3 flex items-center gap-3 mb-5">
            <div className="flex-1 h-px" style={{ background: "rgba(204,34,0,0.2)" }} />
            <span className="text-[9px] tracking-[0.4em]" style={{ color: "#cc2200" }}>
              RULES OF ENGAGEMENT
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(204,34,0,0.2)" }} />
          </div>

          {/* Rules */}
          <div className="anim-slide-d4 flex flex-col gap-3 mb-8">
            {event.rules.map((rule, i) => (
              <div
                key={i}
                className="rule-row flex gap-4 items-start rounded-xl p-4 border transition-colors"
                style={{
                  background: "rgba(8,4,16,0.8)",
                  borderColor: "rgba(204,34,0,0.12)",
                }}
              >
                <span
                  className="rule-num text-[10px] font-bold flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 transition-all duration-200"
                  style={{
                    background: "#cc2200",
                    color: "#fff",
                    boxShadow: "0 0 8px rgba(204,34,0,0.4)",
                  }}
                >
                  {i + 1}
                </span>
                <p
                  className="text-xs leading-relaxed tracking-wide"
                  style={{ color: "#888" }}
                >
                  {rule}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom wire */}
          <div className="anim-slide-d4 flex items-center gap-3 mb-8">
            <div className="flex-1 h-px" style={{ background: "rgba(204,34,0,0.15)" }} />
            <span className="text-[8px] tracking-[0.5em]" style={{ color: "#333" }}>
              ◆ ◆ ◆
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(204,34,0,0.15)" }} />
          </div>

          {/* CTA Buttons */}
          <div className="anim-slide-d5 flex flex-col gap-4">
            <a
              href={event.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp block w-full py-4 text-center text-xs tracking-[0.3em] rounded-xl border transition-all"
              style={{
                background: "rgba(37,211,102,0.05)",
                borderColor: "rgba(37,211,102,0.28)",
                color: "#25d366",
              }}
            >
              ⬡ &nbsp; JOIN WHATSAPP PORTAL
            </a>

            <a
              href={event.register}
              target="_blank"
              rel="noreferrer"
              className="btn-register block w-full py-4 text-center text-xs tracking-[0.3em] rounded-xl border transition-all"
              style={{
                background: "rgba(204,34,0,0.07)",
                borderColor: "rgba(204,34,0,0.45)",
                color: "#ff6644",
                animation: "pulse-red 2s ease-in-out infinite",
              }}
            >
              ▶ &nbsp; REGISTER — ENTER THE VOID
            </a>
          </div>

          {/* Footer stamp */}
          <p
            className="text-center text-[9px] tracking-[0.4em] mt-10"
            style={{ color: "#222" }}
          >
            HAWKINS NATIONAL LABORATORY — CLASSIFIED
          </p>
        </div>
      )}
    </div>
  );
}
