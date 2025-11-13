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

  return (
    <>
      <mesh ref={ref} position={[3, (0.5 + 1.8) * 12, -20]} {...props}>
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
