import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { EnvironmentCube } from "@react-three/drei";
import "./util";
import Project from "./components/Project";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scene } from "./components/Scene";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  return (
    <div className="w-screen min-h-screen">
      <div id="page1" style={{ height: "100vh" }}></div>
      <div id="page2" className="bg-black" style={{ height: "100vh" }}></div>
      {/* <div id="page3" style={{ height: "50vh" }}></div> */}
      {/* <div id="page4" style={{ height: "100vh" }}></div> */}

      <Canvas
        camera={{ position: [-2, 0, 13], fov: 13 }}
        gl={{
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <Scene />
        <EnvironmentCube
          // preset="dawn"
          files="/hdr/shutterstock-1258104736.hdr"
          environmentIntensity={0.28}
          // backgroundIntensity={0.2}
        />
      </Canvas>

      <Project />

      {/* <Cursor /> */}
    </div>
  );
}
