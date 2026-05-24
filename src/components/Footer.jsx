import React, { useEffect, useState } from "react";

// Update this to your upcoming event date in the future
const targetDate = new Date("2026-10-10T00:00:00");

const Footer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      // If the countdown is finished, lock it at zeros
      if (distance <= 0) {
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Pad with leading zeros so layout doesn't shift
      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    // Run once immediately on mount to prevent 1-second delay flash
    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      className="
        relative
        overflow-hidden
        border-t
        border-red-500/10
        bg-black
        px-4
        md:px-10
        py-14
        md:py-20
        text-white
      "
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
            absolute
            left-1/2
            top-0
            h-[300px]
            w-[300px]
            -translate-x-1/2
            rounded-full
            bg-red-600/10
            blur-[120px]
          "
        />
      </div>

      <div className="relative z-[2] max-w-7xl mx-auto">
        {/* Top section */}
        <div
          className="
            flex
            flex-col
            lg:flex-row
            items-start
            lg:items-center
            justify-between
            gap-12
          "
        >
          {/* Left */}
          <div>
            <p
              className="
                text-red-500
                uppercase
                tracking-[0.35em]
                text-[10px]
                md:text-xs
                font-mono
                mb-4
              "
            >
              Transmission Active
            </p>

            <h2
              className="
                text-[clamp(3rem,8vw,7rem)]
                leading-[0.82]
                font-black
                uppercase
                tracking-[-0.06em]
              "
              style={{
                fontFamily:
                  'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
              }}
            >
              ABHYUDAY
            </h2>

            <p
              className="
                mt-5
                max-w-md
                text-sm
                md:text-base
                text-white/60
                leading-relaxed
              "
            >
              Enter the upside down.
              <br />A cinematic technical experience at MCA, MSRIT.
            </p>
          </div>

          {/* Countdown */}
          <div
            className="
              w-full
              lg:w-auto
              border
              border-red-500/10
              bg-black/40
              px-5
              md:px-8
              py-5
              md:py-7
            "
          >
            <p
              className="
                text-red-500
                uppercase
                tracking-[0.35em]
                text-[10px]
                md:text-xs
                font-mono
                text-center
                mb-6
              "
            >
              Event Starts In
            </p>

            <div
              className="
                flex
                items-center
                justify-center
                gap-2
                md:gap-6
              "
            >
              {[
                { value: timeLeft.days, label: "Days" },
                { value: timeLeft.hours, label: "Hours" },
                { value: timeLeft.minutes, label: "Min" },
                { value: timeLeft.seconds, label: "Sec" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div
                    className="
                      border
                      border-red-500/20
                      min-w-[62px]
                      md:min-w-[100px]
                      px-3
                      md:px-5
                      py-3
                      md:py-5
                    "
                  >
                    <p
                      className="
                        text-2xl
                        md:text-5xl
                        text-red-500
                        leading-none
                        font-black
                        tabular-nums
                      "
                      style={{
                        fontFamily:
                          'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
                      }}
                    >
                      {item.value}
                    </p>
                  </div>

                  <p
                    className="
                      mt-3
                      text-[8px]
                      md:text-[10px]
                      uppercase
                      tracking-[0.3em]
                      text-white/50
                      font-mono
                    "
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-red-500/10 my-10 md:my-14" />

        {/* Bottom */}
        <div
          className="
            flex
            flex-col
            md:flex-row
            items-start
            md:items-center
            justify-between
            gap-6
          "
        >
          <div>
            <p
              className="
                text-red-500
                uppercase
                tracking-[0.3em]
                text-[10px]
                font-mono
                mb-2
              "
            >
              MCA, MSRIT
            </p>

            <p className="text-sm md:text-base text-white/50">
              Signal frequency: 88.6 MHz
            </p>
          </div>

          <div className="text-left md:text-right">
            <p
              className="
                text-white/40
                text-xs
                md:text-sm
                uppercase
                tracking-[0.25em]
                font-mono
              "
            >
              © 2026 ABHYUDAY
            </p>

            <p
              className="
                mt-2
                text-white/30
                text-[10px]
                md:text-xs
                tracking-[0.2em]
                uppercase
                font-mono
              "
            >
              Theta Network [LIVE]
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
