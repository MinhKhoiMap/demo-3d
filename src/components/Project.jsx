import React, { useCallback, useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  "/projects/02_2.png",
  "/projects/03.png",
  "/projects/AURORA_S CRY.png",
  "/projects/DTAN.png",
  "/projects/Enscape_2025-06-19-11-05-52 fix.png",
  "/projects/hinh4.png",
  "/projects/NQ.jpg",
  "/projects/OURSONG.jpg",
  "/projects/R6-1.jpg",
  "/projects/SET01.jpg",
  "/projects/SET09.jpg",
  "/projects/TIGER VIP ROOM.png",
];

export default function Project() {
  const initialZ = useRef(-22500);
  const zStep = useRef(2500);
  const totalSlides = projects.length;

  const generateProjects = useCallback(() => {
    const slider = document.querySelector(".slider");
    slider.innerHTML = "";

    for (let i = 0; i < projects.length; i++) {
      const slide = document.createElement("div");
      slide.className = "slide";
      slide.id = `slide-${i}`;

      const slideImg = document.createElement("div");
      slideImg.className = "slide-img";

      const img = document.createElement("img");
      img.src = projects[i];
      img.alt = "";

      slideImg.appendChild(img);
      slide.appendChild(slideImg);
      slider.appendChild(slide);

      const zPos = initialZ.current + (i - 1) * zStep.current;
      const xPos = i % 2 === 0 ? "30%" : "70%";
      const opacity = i === totalSlides ? 1 : i === totalSlides - 1 ? 0 : 0;

      gsap.set(slide, {
        top: "50%",
        left: xPos,
        xPercent: -50,
        yPercent: -50,
        z: zPos,
        opacity: opacity,
      });
    }
  }, []);

  useEffect(() => {
    generateProjects();

    ScrollTrigger.refresh();

    const slides = gsap.utils.toArray(".slide");

    function getInitialTranslateZ(slide) {
      return gsap.getProperty(slide, "z");
    }

    function mapRange(val, inMin, inMax, outMin, outMax) {
      return ((val - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }

    slides.forEach((slide) => {
      const initialZ = getInitialTranslateZ(slide);

      ScrollTrigger.create({
        trigger: ".container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const zIncrement = progress * 22500;
          const currentZ = initialZ + zIncrement;
          let opacity;

          if (self.progress > 0) {
            if (currentZ >= -2500) {
              opacity = mapRange(currentZ, -2500, 0, 0, 1);
            } else {
              opacity = mapRange(currentZ, -5000, -2500, 0, 0);
            }
          } else opacity = 0;

          slide.style.opacity = opacity;
          slide.style.transform = `translateX(-50%) translateY(-50%) translateZ(${currentZ}px)`;
        },
      });
    });

    gsap.fromTo(
      ".container",
      { opacity: 0 },
      {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".container",
          start: "top 90%",
          end: "top 70%",
          scrub: 0.15,
        },
      }
    );

    gsap.fromTo(
      ".container",
      { opacity: 1 },
      {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#page3",
          start: "top 90%",
          end: "top 60%",
          scrub: 0.15,
          // markers: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="container opacity-0">
      <div className="slider"></div>
    </div>
  );
}
