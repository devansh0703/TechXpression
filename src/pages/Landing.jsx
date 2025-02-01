import React, { useEffect, useRef } from "react";
import { Vortex } from "../components/ui/vortex";
import gsap from "gsap";

export function Landing() {
  const textRef = useRef(null);

  useEffect(() => {
    const targetText = "ASSET";
    const chars =
      "!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    gsap.to(textRef.current, {
      duration: 2,
      ease: "power1.out",
      onUpdate: function () {
        let progress = this.progress(); // Get animation progress (0 to 1)
        let scrambled = targetText
          .split("")
          .map((char, i) => {
            if (Math.random() > progress) {
              return chars[Math.floor(Math.random() * chars.length)];
            }
            return targetText[i]; // Gradually reveal correct letters
          })
          .join("");

        textRef.current.textContent = scrambled;
      },
      onComplete: function () {
        textRef.current.textContent = targetText; // Ensure final text is correct
      },
    });
  }, []);

  return (
    <div className="h-screen w-full">
      <div className="w-full mx-auto h-screen overflow-hidden">
        <Vortex
          backgroundColor="black"
          rangeY={800}
          particleCount={500}
          baseHue={120}
          className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
        >
          <h2
            ref={textRef}
            className="text-white text-7xl md:text-6xl font-bold text-center"
          >
            ASSET
          </h2>
          <p className="text-white text-xl md:text-2xl max-w-xl mt-6 text-center">
            Anti-Social Engineering Security & Education Toolkit
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            <a
              href="http://localhost:5174/Info"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
                Check SMS/Email
              </button>
            </a>
          </div>
        </Vortex>
      </div>
    </div>
  );
}
