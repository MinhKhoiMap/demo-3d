import * as THREE from "three";
import { useLayoutEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ScrollControls,
  useScroll,
  useGLTF,
  MeshTransmissionMaterial,
  EnvironmentCube,
  useTexture,
  Image,
} from "@react-three/drei";
import { easing } from "maath";
import "./util";
import Word from "./components/Word";
import { page } from "./constants";
import Tunnel from "./components/Tunnel";
import Project from "./components/Project";

import "lenis/dist/lenis.css";
import GlassBroke from "./components/GlassBroke";
import SceneTemp from "./components/SceneTemp";
import Cursor from "./components/Cursor";

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
        vec3 color = mix(vec3(0.3, 0.0, 0.0), vec3(0.5, 0.5, 0.5), t);

        // --- Tạo chấm tròn nhỏ ---
        float aspect = 16.0 / 9.0; // ví dụ tỉ lệ màn hình của bạn
        vec2 grid = vUv * vec2(130.0, 130.0);
        vec2 cell = fract(grid) - 0.5;
        cell.x *= aspect; // chỉnh tỉ lệ theo màn hình

        float d = length(cell);
        float dotMask = smoothstep(0.10, 0.08, d);

        vec3 dotColor = vec3(0.5);
        color = mix(color, dotColor, dotMask * 0.4);

        gl_FragColor = vec4(color, 1.0);
      }
    `,
  };

  return (
    <mesh scale={[20, 20, 1]} position={[0, 0, -1]} renderOrder={-1}>
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
  const [showProject, setShowProject] = useState(false);

  return (
    <div className="w-screen h-screen">
      <Canvas
        camera={{ position: [-2, 0, 13], fov: 13 }}
        gl={{
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        style={{ zIndex: 0 }}
      >
        <GradientBackground />
        <ScrollControls pages={page}>
          <Model setShowProject={setShowProject} />
          Page 1
          {["PROJECT:E", "CREATIVE", "PRODUCTION"].map((item, index) => {
            return <Word key={index} children={item} order={index} />;
          })}
          Page 2
          <Banner position={[0, 0.5 + 1.8, 0]} text="/decoration.png" />
          <Banner position={[0, 0.5 + 1.8 * 2, 0]} text="/event.png" />
          <Banner position={[0, 0.5 + 1.8 * 3, 0]} text="/exhibition.png" />
          <Banner position={[0, 0.5 + 1.8 * 4, 0]} text="/festival.png" />
          <Banner position={[0, 0.5 + 1.8 * 5, 0]} text="/posm.png" />
          <Banner position={[0, 0.5 + 1.8 * 6, 0]} text="/set design.png" />
          Page 3
          <Tunnel />
          {/* <SceneTemp /> */}
          {/* <GlassBroke /> */}
        </ScrollControls>
        <EnvironmentCube
          preset="dawn"
          environmentIntensity={0.3}
          backgroundIntensity={0.2}
        />
      </Canvas>
      {showProject && <Project />}

      {/* <Cursor /> */}
    </div>
  );
}

function Banner(props) {
  const textRef = useRef();
  const backsideTextRef = useRef();
  const ringRef = useRef();
  const [isHovered, setIsHoverd] = useState(false);

  useFrame((state, delta) => {
    textRef.current.rotation.y += 0.01;
    // backsideTextRef.current.rotation.y += 0.01;
    easing.damp3(textRef.current.scale, isHovered ? 1.1 : 1, 0.1, delta);
    easing.damp(
      textRef.current.material,
      "roughness",
      isHovered ? 4 : 0.9,
      0.2,
      delta
    );
    easing.damp3(ringRef.current.scale, isHovered ? 1.1 : 1, 0.1, delta);
    easing.damp(
      ringRef.current.material,
      "roughness",
      isHovered ? 4 : 0.9,
      0.2,
      delta
    );
  });

  const texture = useTexture(props.text);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <group {...props}>
      <mesh
        ref={ringRef}
        onPointerEnter={() => setIsHoverd(true)}
        onPointerLeave={() => setIsHoverd(false)}
        renderOrder={3}
      >
        <cylinderGeometry args={[1.6, 1.6, 1, 64, 1, true]} />
        <MeshTransmissionMaterial
          // map={texture}
          // map-anisotropy={16}
          // map-repeat={[3, 1]}
          thickness={0.2}
          transmission={1}
          ior={0.9}
          side={THREE.DoubleSide}
          toneMapped={false}
          anisotropy={0}
          color={"#ccc"}
        />
      </mesh>

      <mesh ref={textRef} renderOrder={2}>
        <cylinderGeometry args={[1.6, 1.6, 1, 64, 1, true]} />
        <meshBasicMaterial
          map={texture}
          map-anisotropy={16}
          map-repeat={[3, 1]}
          transparent
          opacity={1}
          depthWrite={false}
          depthTest={false} // 👈 Cực kỳ quan trọng
          alphaTest={0.5}
          toneMapped={false}
          side={THREE.FrontSide}
          color={"#f5f5f5"}
        />
      </mesh>

      <mesh ref={backsideTextRef} renderOrder={2}>
        <cylinderGeometry args={[1.6, 1.6, 1, 64, 1, true]} />
        <meshBasicMaterial
          map={texture}
          // map-anisotropy={16}
          map-repeat={[3, 1]}
          transparent
          opacity={1}
          depthWrite={false}
          // depthTest={false} // 👈 Cực kỳ quan trọng
          side={THREE.BackSide}
          color={"#f5f5f5"}
        />
      </mesh>
    </group>
  );
}

function Model({ setShowProject }) {
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
    const currentPage = Math.floor(scroll.offset * page);
    if (currentPage >= 6 && currentPage < 13) {
      ref.current.position.y =
        (scroll.offset - 1 / page) * (1.8 + 1.5) * numberOfBanner;
      ref.current.rotation.y = -(scroll.offset - 1 / page) * (Math.PI * 3);
      state.camera.lookAt(
        0,
        (scroll.offset - 1 / page) * (1.8 + 1.5) * numberOfBanner,
        0
      );
      state.camera.position.y =
        (scroll.offset - 1 / page) * (1.8 + 1.5) * (numberOfBanner / 2);
      ref.current.position.z = 0;
    } else if (currentPage <= 5) {
      state.camera.position.y = 0;
      ref.current.position.y = 0;
      state.camera.lookAt(0, 0, 0);
      ref.current.rotation.y = 0;
      ref.current.position.z = 0;
    } else if (currentPage >= 13) {
      setShowProject(true);
      ref.current.rotation.y = 0;
      ref.current.position.y = 0.5 + 1.8 * 7.3;
      ref.current.position.x = 0.5;
      ref.current.position.z = -5;
      state.camera.lookAt(0, 0.5 + 1.8 * 7.3, 0);
      state.camera.position.y = 0.5 + 1.8 * 7.3;
    }
  });

  return (
    <group ref={ref} renderOrder={2} position={[0, 0, 1]}>
      <mesh geometry={nodes.Retopo_Curve001.geometry} scale={18}>
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
      <mesh geometry={nodes.Retopo_Curve003.geometry} scale={18}>
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
