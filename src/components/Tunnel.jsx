import { useFrame, useThree } from "@react-three/fiber";
import React, { forwardRef, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
// import { easing } from "maath";

import frag from "../shaders/tunnel.glsl?raw";
import gsap from "gsap";
import { page } from "../constants";
import { useScroll } from "@react-three/drei";

export default forwardRef(function Tunnel(props, ref) {
  const { setSize } = useThree();

  const uniform = useMemo(
    () => ({
      iTime: { value: 0 },
      iResolution: {
        value: new THREE.Vector2(
          window.innerWidth * 1.1,
          window.innerHeight / 0.8
        ),
      },
      iDepth: { value: 10 },
      scrollOffset: { value: 0 },
    }),
    []
  );

  useEffect(() => {
    window.onresize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setSize(width, height);
      uniform.iResolution.value.set(width, height);
    };

    gsap.timeline({
      scrollTrigger: {
        trigger: ".container",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: () => {
          uniform.iTime.value += 0.05;
        },
      },
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: "#page3",
        start: "top 90%",
        end: "bottom bottom",
        scrub: true,
        // markers: true,
        onUpdate: (self) => {
          const step = 0.1;

          if (self.direction == 1) {
            uniform.iDepth.value = Math.max(uniform.iDepth.value - step, 1);
          } else {
            uniform.iDepth.value = Math.min(uniform.iDepth.value + step, 10);
          }
        },
      },
    });
  }, []);

  return (
    <>
      <mesh ref={ref} position={[3, (0.5 + 1.8) * 12, -18]} {...props}>
        <planeGeometry args={[20, 20]} />
        <shaderMaterial
          uniforms={uniform}
          vertexShader="
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          "
          fragmentShader={frag}
        />
      </mesh>
    </>
  );
});
