import {
  MeshTransmissionMaterial,
  useGLTF,
  useScroll,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useLayoutEffect, useRef } from "react";
import { page } from "../constants";

export default function Model({ setShowProject }) {
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
      ref.current.scale.set(1, 1, 1);
    } else if (currentPage <= 5) {
      state.camera.position.y = 0;
      ref.current.position.y = 0;
      state.camera.lookAt(0, 0, 0);
      ref.current.rotation.y = 0;
      ref.current.scale.set(1, 1, 1);
    } else if (currentPage >= 13) {
      setShowProject(true);
      ref.current.rotation.y = 0;
      ref.current.position.y = 0.5 + 1.8 * 7.3;
      ref.current.scale.set(0.5, 0.5, 0.5);
      ref.current.position.x = -0.25;
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
