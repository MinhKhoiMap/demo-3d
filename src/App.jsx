import * as THREE from "three";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Image,
  Environment,
  ScrollControls,
  useScroll,
  useTexture,
  Scroll,
  useGLTF,
  MeshTransmissionMaterial,
  Outlines,
  Float,
} from "@react-three/drei";
import "./util";
import { easing } from "maath";

export default function App() {
  return (
    <div className="w-screen h-screen">
      <Canvas
        camera={{ position: [0, -1, 13], fov: 13 }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.Uncharted2ToneMapping;
          // gl.setClearColor(new THREE.Color("pink"));
        }}
      >
        <ScrollControls pages={10}>
          <Model scale={18} />
          {/* <Scroll> */}
          <Banner
            position={[0, 1.8, 0]}
            text={["immersive live-scene performance", "reality shows"]}
          />
          <Banner position={[0, 3.6, 0]} text={["gameshows", "TVCs"]} />
          <Banner
            position={[0, 5.4, 0]}
            text={["music videos", "livestreams", "technical execution"]}
          />
          {/* </Scroll> */}
        </ScrollControls>
        <ambientLight intensity={0.5 * Math.PI} />
        <Environment
          near={1}
          far={1000}
          resolution={256}
          preset="dawn"
          background
          frames={Infinity}
        ></Environment>
      </Canvas>
    </div>
  );
}

function Rig(props) {
  const ref = useRef();
  // const scroll = useScroll();
  useFrame((state, delta) => {
    // ref.current.rotation.y = -scroll.offset * (Math.PI * 2); // Rotate contents
    state.events.update(); // Raycasts every frame rather than on pointer-move
    // easing.damp3(state.camera.position, [-2, 1.5, 10], 0.3, delta); // Move camera
    // state.camera.lookAt(0, 0, 0); // Look at center
  });
  return <group ref={ref} {...props} />;
}

function Carousel({ radius = 1.4, count = 8 }) {
  const myMesh = useRef();
  useFrame(() => {
    myMesh.current.rotation.y += 0.005;
  });

  return (
    <mesh ref={myMesh}>
      {Array.from({ length: count }, (_, i) => (
        <Card
          key={i}
          url={`/img${Math.floor(i % 10) + 1}_.jpg`}
          position={[
            Math.sin((i / count) * Math.PI * 2) * radius,
            0,
            Math.cos((i / count) * Math.PI * 2) * radius,
          ]}
          rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
        />
      ))}
    </mesh>
  );
}

function Card({ url, ...props }) {
  const ref = useRef();
  return (
    <Image
      ref={ref}
      url={url}
      transparent
      side={THREE.DoubleSide}
      radius={0.1}
      {...props}
    >
      <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
    </Image>
  );
}

function Banner(props) {
  const ref = useRef();
  const topLineRef = useRef();
  const bottomLineRef = useRef();
  const [isHovered, setIsHoverd] = useState(false);

  useFrame((state, delta) => {
    ref.current.rotation.y += 0.01;

    easing.damp3(ref.current.scale, isHovered ? 1.1 : 1, 0.1, delta);
    easing.damp3(topLineRef.current.scale, isHovered ? 1.1 : 1, 0.1, delta);
    easing.damp3(bottomLineRef.current.scale, isHovered ? 1.1 : 1, 0.1, delta);
    easing.damp(
      ref.current.material,
      "roughness",
      isHovered ? 4 : 0.9,
      0.2,
      delta
    );

    // console.log(ref.current.position);
  });

  useEffect(() => {
    // Canvas for drawing text
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");

    // Background transparent to let transmission work
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.font = "bold 200px 'Bricolage Grotesque'";
    ctx.fillText("set design", 0, 150);

    props.text.map((t, i) => {
      const ctx1 = canvas.getContext("2d");
      ctx1.fillStyle = "rgba(255,255,255,0.1)";
      ctx1.fillRect(0, 0, canvas.width, canvas.height);

      ctx1.fillStyle = "black";
      ctx1.font = "bold 40px 'Bricolage Grotesque'";
      ctx1.fillText(t, 0, 200 + i * 40);
    });

    // Make texture from canvas
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.set(5, 1); // repeat text around

    // Assign to material later
    ref.current.material.map = texture;
    ref.current.material.needsUpdate = true;
  }, []);

  useEffect(() => {}, []);

  return (
    <group>
      <mesh
        ref={ref}
        {...props}
        onPointerEnter={() => setIsHoverd(true)}
        onPointerLeave={() => setIsHoverd(false)}
      >
        <cylinderGeometry args={[1.6, 1.6, 1, 64, 1, true]} />
        <MeshTransmissionMaterial
          thickness={0.1}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.5}
          side={THREE.DoubleSide}
          toneMapped={false}
          anisotropy={0}
        />
      </mesh>

      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          position={[
            props.position[0],
            props.position[2],
            -(Math.abs(props.position[1]) + (isHovered ? 0.55 : 0.5)),
          ]}
          ref={topLineRef}
        >
          <torusGeometry args={[1.6, 0.001, 16, 100]} />
          <meshBasicMaterial color="#000" />
        </mesh>

        <mesh
          position={[
            props.position[0],
            props.position[2],
            -(Math.abs(props.position[1]) - (isHovered ? 0.55 : 0.5)),
          ]}
          ref={bottomLineRef}
        >
          <torusGeometry args={[1.6, 0.001, 16, 100]} />
          <meshBasicMaterial color="#000" />
        </mesh>
      </group>
    </group>
  );
}

function Model(props) {
  const ref = useRef();
  const scroll = useScroll();
  const { scene, nodes } = useGLTF("/models/epj.glb");
  useLayoutEffect(() =>
    Object.values(nodes).forEach(
      (node) => (node.receiveShadow = node.castShadow = true)
    )
  );
  useFrame((state, delta) => {
    ref.current.position.y = scroll.offset * 1.8 * 5;
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2);
    state.camera.lookAt(0, scroll.offset * 1.8 * 5, 0);
    // state.camera.position.y = scroll.offset * 1.8 * 3;
    easing.damp(state.camera.position, "y", scroll.offset * 1.8 * 3, 5 * delta);
  });

  // return <primitive ref={ref} object={scene} {...props} />;

  return (
    <group ref={ref}>
      <mesh geometry={nodes.Retopo_Curve001.geometry} scale={18}>
        <MeshTransmissionMaterial
          backside
          backsideThickness={1}
          samples={16}
          thickness={0.2}
          anisotropicBlur={0.1}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          clearcoat={1}
          envMapIntensity={0.5}
        />

        {/* <mesh geometry={nodes.Sphere.geometry}>
          <MeshTransmissionMaterial
            samples={6}
            resolution={512}
            thickness={-1}
            anisotropy={0.25}
          />
        </mesh> */}
      </mesh>
      <mesh geometry={nodes.Retopo_Curve003.geometry} scale={18}>
        <MeshTransmissionMaterial
          backside
          backsideThickness={1}
          samples={16}
          thickness={0.2}
          anisotropicBlur={0.1}
          ior={1}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          clearcoat={1}
          envMapIntensity={0.5}
          color={"#EA2626"}
        />
      </mesh>
    </group>
  );
}
