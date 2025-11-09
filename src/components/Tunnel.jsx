import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import frag from "../shaders/tunnel.glsl?raw";
import { useScroll } from "@react-three/drei";

export default function Tunnel({ props }) {
  const { setSize } = useThree();
  const ref = useRef();

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

  const scroll = useScroll();

  useFrame((state, delta) => {
    uniform.iTime.value += 0.05;

    // ref.current.position.y = scroll.offset * 200;
  });

  useEffect(() => {
    window.onresize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setSize(width, height);
      uniform.iResolution.value.set(width, height);
    };
  }, []);

  return (
    <mesh ref={ref} position={[0, 20, 0]} {...props}>
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
  );
}
