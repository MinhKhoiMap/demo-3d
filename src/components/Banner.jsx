import { useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { easing } from "maath";
import { MeshTransmissionMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function Banner(props) {
  const textRef = useRef();
  const backsideTextRef = useRef();
  const ringRef = useRef();
  const [isHovered, setIsHoverd] = useState(false);

  useFrame((state, delta) => {
    textRef.current.rotation.y += 0.01;
    backsideTextRef.current.rotation.y += 0.01;
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
