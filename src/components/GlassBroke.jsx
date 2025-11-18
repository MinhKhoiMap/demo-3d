import { useAnimations, useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { forwardRef, useEffect, useRef } from "react";

useGLTF.preload("/models/glass broken.glb");

gsap.registerPlugin(ScrollTrigger);

export default forwardRef(function GlassBroke(props, ref) {
  const { scene, animations } = useGLTF("/models/glass broken final.glb");
  const { actions, mixer } = useAnimations(animations, scene);

  useEffect(() => {
    ScrollTrigger.refresh();

    const clips = animations;
    const duration = Math.max(...clips.map((c) => c.duration));

    Object.values(actions).forEach((action) => {
      action.reset();
      action.paused = true;
      action.play();
    });

    const scrub = { t: 0 };

    gsap.to(scrub, {
      t: duration,
      ease: "none",
      scrollTrigger: {
        trigger: "#page4",
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1,
        // markers: true,
      },
      onUpdate: () => {
        Object.values(actions).forEach((action) => {
          action.time = scrub.t;
        });

        mixer.update(0);
      },
    });
  }, []);

  return (
    <primitive
      ref={ref}
      object={scene}
      position={[0.5, (0.5 + 1.8) * 12, -22]}
      rotation={[0, 190, 0]}
      scale={[120, 4, 4]}
    />
  );
});
