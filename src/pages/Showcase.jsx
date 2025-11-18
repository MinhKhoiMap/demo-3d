import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useState } from "react";
import "../index.css";

gsap.registerPlugin(ScrollTrigger);

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

export default function Showcase() {
  const [navActive, setNavActive] = useState();

  useEffect(() => {
    gsap.to("#background", {
      width: "110vw",
      height: "110vh",
      ease: "none",
      scrollTrigger: {
        trigger: "#page2",
        start: "top 90%",
        end: "bottom bottom",
        scrub: true,
        markers: true,
      },
    });

    gsap.fromTo(
      "#projects-show",
      { y: "100%" },
      {
        y: "-150%",
        ease: "none",
        scrollTrigger: {
          trigger: "#page3",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.15,
        },
      }
    );

    gsap.fromTo(
      "#page-title",
      {
        position: "fixed",
        top: "50%",
        left: "50%",
        translateX: "-50%",
        translateY: "-50%",
        zIndex: 99998,
      },
      {
        position: "fixed",
        top: "180px",
        left: 0,
        translateX: "20px",
        zIndex: 99998,
        ease: "none",
        scrollTrigger: {
          trigger: "#page4",
          start: "top bottom",
          end: "top 50%",
          scrub: true,
          markers: true,
        },
      }
    );

    gsap.fromTo(
      "nav",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "#page4",
          start: "top 60%",
          end: "top 50%",
          scrub: true,
          markers: true,
        },
      }
    );

    gsap.fromTo(
      "#projects",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "#page4",
          start: "top 60%",
          end: "top 50%",
          scrub: true,
          markers: true,
        },
      }
    );
  }, []);

  return (
    <div className="">
      <nav className="fixed top-0 left-0 w-screen z-[99998] bg-black">
        <div id="top-header" className="w-full p-5 flex justify-between">
          <figure className="h-[60px]">
            <img className="w-full h-full" src="/logo.png" alt="" />
          </figure>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-white boldonse-regular inline-block p-5 hover:underline text-lg"
            >
              Showcase
            </a>
            <a
              href="#"
              className="text-white boldonse-regular inline-block p-5 hover:underline text-lg"
            >
              About us
            </a>
            <a
              href="#"
              className="text-white boldonse-regular inline-block p-5 hover:underline text-lg"
            >
              Contact
            </a>
          </div>
        </div>
        <div id="sub-header" className="w-full flex">
          <div className="w-[700px] h-[135px]"></div>
          <div className="flex-1 flex items-end justify-between gap-2 pl-10 pr-6">
            {[
              "festival",
              "decoration",
              "event",
              "set design",
              "exhibition",
              "POSM",
              "graphic",
            ].map((item, idx) => {
              const [isActive, setIsActive] = useState(idx == 0);

              return (
                <a
                  href="#"
                  key={item}
                  className={`inline-block bricolage-grotesque text-[28px] ${
                    isActive ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsActive((prev) => !prev);
                  }}
                >
                  {item}
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      <div id="page1" className="h-screen">
        <div className="relative w-full h-full">
          <video
            muted
            playsInline
            className="w-full h-full object-cover absolute bottom-0"
          >
            <source src="/videos/bgshowcase.mp4" type="video/mp4" />
          </video>

          <div
            id="background"
            className="flex items-center justify-center fixed top-1/2 left-1/2 bg-black w-[800px] h-[200px] px-[150px] py-[38px] rounded-[150px] -translate-x-1/2 -translate-y-1/2"
          ></div>
        </div>
        <h1
          id="page-title"
          className="fixed uppercase boldonse-regular text-white !text-[90px]"
        >
          Showcase
        </h1>
      </div>
      <div id="page2" className="h-screen">
        <video muted playsInline className="w-screen h-screen object-cover">
          <source src="/videos/bgshowcase.mp4" type="video/mp4" />
        </video>
      </div>
      <div id="page3" className="h-[200vh]">
        <div
          id="projects-show"
          className="pl-[45px] pr-[50px] flex flex-col gap-[40px] z-[9]"
        >
          <div className="flex w-full">
            <img
              src="/projects/02_2.png"
              alt=""
              className="w-[calc(50%-50px)] h-[500px]"
            />
          </div>
          <div className="flex flex-row-reverse w-full">
            <img
              src="/projects/02_2.png"
              alt=""
              className="w-[calc(50%-50px)] h-[500px]"
            />
          </div>
          <div className="flex w-full">
            <img
              src="/projects/02_2.png"
              alt=""
              className="w-[calc(50%-50px)] h-[500px]"
            />
          </div>
          <div className="flex flex-row-reverse w-full">
            <img
              src="/projects/02_2.png"
              alt=""
              className="w-[calc(50%-50px)] h-[500px]"
            />
          </div>
          <div className="flex w-full">
            <img
              src="/projects/02_2.png"
              alt=""
              className="w-[calc(50%-50px)] h-[500px]"
            />
          </div>
          <div className="flex flex-row-reverse w-full">
            <img
              src="/projects/02_2.png"
              alt=""
              className="w-[calc(50%-50px)] h-[500px]"
            />
          </div>
        </div>
      </div>
      <div id="page4" className="pb-8 h-[200vh]">
        <div
          id="projects"
          className="flex flex-wrap w-screen h-[357px] relative z-[999] gap-2 pb-6"
        >
          {projects.map((pj, idx) => {
            return idx === 1 ? (
              <div className="relative">
                {/* Logo gif */}
                <img
                  src="/logo.gif"
                  alt="My GIF"
                  className="object-cover absolute bottom-0"
                  style={{ scale: "2" }}
                />
              </div>
            ) : (
              <div className="overflow-hidden">
                <img src={pj} alt="" className="w-full h-full" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
