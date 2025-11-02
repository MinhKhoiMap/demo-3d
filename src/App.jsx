import * as THREE from "three";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  ScrollControls,
  useScroll,
  useGLTF,
  MeshTransmissionMaterial,
  EnvironmentCube,
  useTexture,
} from "@react-three/drei";
import { easing } from "maath";
import "./util";

function GradientBackground() {
  const shader = {
    uniforms: {},
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;

      void main() {
       float t = vUv.y / 0.7;          // scale vUv.y so 0.3 -> 1
          t = clamp(t, 0.0, 1.0);  
      
        // Gradient from red (bottom) to black (top)
        vec3 color = mix(vec3(0.3, 0.0, 0.0), vec3(0.0), t);

        gl_FragColor = vec4(color, 1.0);
      }
    `,
  };

  return (
    <mesh scale={[2, 2, 1]} position={[0, 0, -1]} renderOrder={-1}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        args={[shader]}
        position={[0, 0, -1]}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function App() {
  return (
    <div className="w-screen h-screen">
      <Canvas camera={{ position: [-2, 0, 13], fov: 13 }}>
        <GradientBackground />
        <ScrollControls pages={6}>
          <Model scale={18} />
          <Banner position={[0, 1.8, 0]} text="/decoration.png" />
          <Banner position={[0, 1.8 * 2, 0]} text="/event.png" />
          <Banner position={[0, 1.8 * 3, 0]} text="/exhibition.png" />
          <Banner position={[0, 1.8 * 4, 0]} text="/festival.png" />
          <Banner position={[0, 1.8 * 5, 0]} text="/posm.png" />
          <Banner position={[0, 1.8 * 6, 0]} text="/set design.png" />
        </ScrollControls>
        <EnvironmentCube preset="dawn" environmentIntensity={0.5} />
      </Canvas>
    </div>
  );
}

function Banner(props) {
  const ref = useRef();
  const [isHovered, setIsHoverd] = useState(false);

  useFrame((state, delta) => {
    ref.current.rotation.y += 0.01;

    easing.damp3(ref.current.scale, isHovered ? 1.1 : 1, 0.1, delta);
    easing.damp(
      ref.current.material,
      "roughness",
      isHovered ? 4 : 0.9,
      0.2,
      delta
    );
  });

  const texture = useTexture(props.text);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <mesh
      ref={ref}
      {...props}
      onPointerEnter={() => setIsHoverd(true)}
      onPointerLeave={() => setIsHoverd(false)}
    >
      <cylinderGeometry args={[1.6, 1.6, 1, 64, 1, true]} />
      <MeshTransmissionMaterial
        map={texture}
        map-anisotropy={16}
        map-repeat={[3, 1]}
        thickness={0.1}
        transmission={1}
        ior={1.5}
        chromaticAberration={0.5}
        side={THREE.DoubleSide}
        toneMapped={false}
        anisotropy={0}
      />
    </mesh>
  );
}

function Model(props) {
  const numberOfBanner = 6;
  const ref = useRef();
  const scroll = useScroll();
  const { nodes } = useGLTF("/models/LOGO WEB NEW.glb");
  useLayoutEffect(() =>
    Object.values(nodes).forEach(
      (node) => (node.receiveShadow = node.castShadow = true)
    )
  );
  useFrame((state, delta) => {
    ref.current.position.y = scroll.offset * 1.8 * numberOfBanner;
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2);
    state.camera.lookAt(0, scroll.offset * 1.8 * numberOfBanner, 0);
    state.camera.position.y = scroll.offset * 1.8 * (numberOfBanner / 2);
    easing.damp(state.camera.position, "y", scroll.offset * 1.8 * 3, delta);
  });

  return (
    <group ref={ref}>
      <mesh geometry={nodes.Retopo_Curve001.geometry} scale={props.scale}>
        <MeshTransmissionMaterial
          backside
          backsideThickness={0.4}
          ior={1}
          transmission={0}
          metalness={1}
          color={"red"}
          thickness={1}
        />
      </mesh>
      <mesh geometry={nodes.Retopo_Curve003.geometry} scale={props.scale}>
        <MeshTransmissionMaterial
          thickness={0}
          ior={3}
          color={"#fff"}
          transmission={1}
        />
      </mesh>
    </group>
  );
}
