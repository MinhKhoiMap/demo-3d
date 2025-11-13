import { useTexture } from "@react-three/drei";
import { forwardRef } from "react";
import * as THREE from "three";

export default forwardRef(function Overlay(props, ref) {
  const texture = useTexture("/second scene.png");
  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <mesh
      ref={ref}
      position={[0, (0.5 + 1.8) * 7.03, 0]}
      scale={[3, 3, 0]}
      rotation={[0, -0.1, 0]}
    >
      {/* Tạo mặt phẳng */}
      <planeGeometry args={[2, 1.5]} /> {/* width, height */}
      {/* Dán ảnh vào mặt phẳng */}
      <meshBasicMaterial
        map={texture}
        transparent={true} // cho phép phần trong suốt
        alphaTest={1} // cắt bỏ pixel alpha < 0.5 (giúp loại bỏ viền xám)
        lightMapIntensity={0}
      />
    </mesh>
  );
});
