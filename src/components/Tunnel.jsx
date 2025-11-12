import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
// import { easing } from "maath";

import frag from "../shaders/tunnel.glsl?raw";
import gsap from "gsap";
import { page } from "../constants";
import { useScroll } from "@react-three/drei";

export default function Tunnel({ props }) {
  const { setSize } = useThree();
  const ref = useRef();

  const scroll = useScroll();

  const uniform = useMemo(
    () => ({
      iTime: { value: 0 },
      iResolution: {
        value: new THREE.Vector2(
          window.innerWidth * 1.2,
          window.innerHeight / 0.8
        ),
      },
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
  }, []);

  useFrame((state, delta) => {
    const currentPage = Math.floor(scroll.offset * page);
    if (currentPage < 13) {
      ref.current.scale.set(0, 0, 0);
    } else {
      ref.current.scale.set(1, 1, 1);
    }

    gsap.to(uniform.iTime, {
      value: 1000,
      scrollTrigger: {
        trigger: ".container",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  });

  return (
    <>
      <mesh ref={ref} position={[0, 0.5 + 1.8 * 7.3, -5]} {...props}>
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
}
