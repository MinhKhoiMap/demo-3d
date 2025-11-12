import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function SceneTemp() {
  const texture = useTexture("/second scene.png");
  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <mesh position={[0, 0.5 + 1.8 * 7.3, 0]} scale={[2, 2, 0]}>
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
}
