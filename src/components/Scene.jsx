import { useRef, useEffect } from "react";
import { EnvironmentCube } from "@react-three/drei";
import gsap from "gsap";
import { useThree } from "@react-three/fiber";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Background from "./Background";
import Model from "./Model";
import Word from "./Word";
import GlassBroke from "./GlassBroke";
import Overlay from "./Overlay";
import Cursor from "./Cursor";
import Banner from "./Banner";
import Tunnel from "./Tunnel";

gsap.registerPlugin(ScrollTrigger);

export function Scene({ setShowProject }) {
  const text1 = useRef();
  const text2 = useRef();
  const text3 = useRef();
  const overlay = useRef();
  const tunnel = useRef();

  const model = useRef();

  const camera = useThree((state) => state.camera);

  // Controller Page1
  useEffect(() => {
    if (!text1.current || !text2.current || !text3.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#page1",
          start: "top top",
          end: "bottom top",
          scrub: true,
          // markers: true,
        },
      });

      tl.fromTo(text1.current.position, { x: 0 }, { x: -5, ease: "none" }, 0)
        .fromTo(text2.current.position, { x: 4 }, { x: -5, ease: "none" }, 0)
        .fromTo(
          text3.current.position,
          { x: 5 },
          { x: -10, ease: "none" },
          0.2
        );

      // ScrollTrigger.create({
      //   trigger: "#page1",
      //   onToggle: (self) => console.log("toggle", self.isActive),
      //   onUpdate: (self) => console.log("progress", self.progress),
      // });
    });

    return () => ctx.revert();
  }, []);

  // PAGE 2 – Camera animation
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#page2",
        start: "top top",
        end: "bottom top",
        scrub: true,
        // markers: true,
      },
    });

    const unit = 1.8 + 0.5;

    tl.to(
      model.current.position,
      {
        y: unit * 7,
        ease: "none",
        stagger: "",
      },
      0
    )
      .to(model.current.rotation, { y: -2 * Math.PI, ease: "none" }, 0)
      .to(model.current.position, { x: 0.1, ease: "none" }, 0.5)
      .to(
        model.current.scale,
        {
          x: 0.7,
          y: 0.7,
          z: 0.7,
          ease: "none",
        },
        0.4
      )
      .to(model.current.position, { z: -15, ease: "none" }, 0.5)
      .to(model.current.scale, { x: 0.5, y: 0.5, z: 0.5, ease: "none" }, 0.5)
      .to(overlay.current.position, { z: 5, ease: "none" }, 0.5)
      .to(camera.position, { z: -3, ease: "none" }, 0.5)
      .to(tunnel.current.position, { y: unit * 10, ease: "none" }, 0.4);

    tl.to(
      camera.position,
      {
        y: unit * 7, // camera đi ít hơn model
        ease: "none",
      },
      0
    );

    // tl.to(
    //   camera.position,
    //   {
    //     y: unit * 7, // camera bắt kịp model tại cuối Page2
    //     ease: "none",
    //   },
    //   "0.6"
    // );
  }, []);

  return (
    <>
      <Background />
      <Model ref={model} setShowProject={setShowProject} />

      {/* PAGE 1 - 3 chữ */}
      <Word ref={text1} order={0}>
        PROJECT:E
      </Word>
      <Word ref={text2} order={1}>
        CREATIVE
      </Word>
      <Word ref={text3} order={2}>
        PRODUCTION
      </Word>

      {/* Sau này thêm PAGE 2, PAGE 3 ở đây */}

      {/* PAGE 2 */}
      <Banner position={[0, 0.5 + 1.8, 0]} text="/decoration.png" />
      <Banner position={[0, 0.5 + 1.8 * 2, 0]} text="/event.png" />
      <Banner position={[0, 0.5 + 1.8 * 3, 0]} text="/exhibition.png" />
      <Banner position={[0, 0.5 + 1.8 * 4, 0]} text="/festival.png" />
      <Banner position={[0, 0.5 + 1.8 * 5, 0]} text="/posm.png" />
      <Banner position={[0, 0.5 + 1.8 * 6, 0]} text="/set design.png" />

      {/* PAGE 3 */}
      <Overlay ref={overlay} />

      <Tunnel ref={tunnel} />
    </>
  );
}
