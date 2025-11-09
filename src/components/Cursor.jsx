import React from "react";

export default function Cursor() {
  return (
    <mesh>
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
