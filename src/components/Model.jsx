import {
  MeshTransmissionMaterial,
  useGLTF,
  useScroll,
} from "@react-three/drei";
import { forwardRef, useLayoutEffect, useRef } from "react";
import * as THREE from "three";

export default forwardRef(function Model({ setShowProject }, ref) {
  // const numberOfBanner = 6;
  // const ref = useRef();
  const scroll = useScroll();
  const { nodes } = useGLTF("/models/LOGO WEB NEW.glb");
  useLayoutEffect(() =>
    Object.values(nodes).forEach(
      (node) => (node.receiveShadow = node.castShadow = true)
    )
  );

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
          ior={20}
          color={"#fff"}
          transmission={1}
        />
      </mesh>
    </group>
  );
});
