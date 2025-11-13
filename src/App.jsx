import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ScrollControls,
  MeshTransmissionMaterial,
  EnvironmentCube,
} from "@react-three/drei";
import "./util";
import Word from "./components/Word";
import { page } from "./constants";
import Tunnel from "./components/Tunnel";
import Project from "./components/Project";

import "lenis/dist/lenis.css";
import GlassBroke from "./components/GlassBroke";
import SceneTemp from "./components/SceneTemp";
import Cursor from "./components/Cursor";
import Banner from "./components/Banner";
import Background from "./components/Background";
import Model from "./components/Model";

export default function App() {
  const [showProject, setShowProject] = useState(false);

  const wordRefs = useRef([]);

  useEffect(() => {}, []);

  return (
    <div className="w-screen h-screen">
      <Canvas
        camera={{ position: [-2, 0, 13], fov: 13 }}
        gl={{
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        style={{ zIndex: 0 }}
      >
        <Background />
        <ScrollControls pages={page}>
          <Model setShowProject={setShowProject} />
          Page 1
          {["PROJECT:E", "CREATIVE", "PRODUCTION"].map((item, idx) => {
            return <Word key={idx} children={item} order={idx} />;
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
      <div id="page1"></div>
      <div id="page2"></div>
      <div id="page3"></div>

      {showProject && <Project />}

      {/* <Cursor /> */}
    </div>
  );
}
