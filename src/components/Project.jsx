import React, { useCallback, useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const projects = [
  // "/projects/transparent.png",
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

gsap.registerPlugin(ScrollTrigger);

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
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    generateProjects();

    ScrollTrigger.refresh();

    const slides = gsap.utils.toArray(".slide");

    function getInitialTranslateZ(slide) {
      return gsap.getProperty(slide, "z");
    }

    function mapRange(val, inMin, inMax, outMin, outMax) {
      return ((val - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }

    ScrollTrigger.create({
      trigger: ".container",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    });

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
          if (currentZ >= -2500) {
            opacity = mapRange(currentZ, -2500, 0, 0, 1);
          } else {
            opacity = mapRange(currentZ, -5000, -2500, 0, 0);
          }

          slide.style.opacity = opacity;
          slide.style.transform = `translateX(-50%) translateY(-50%) translateZ(${currentZ}px)`;
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="container">
      <div className="slider"></div>
    </div>
  );
}
