import * as THREE from "three";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { page } from "../constants";

const Word = forwardRef(function Word({ children, order }, ref) {
  const fontProps = {
    font: "/fonts/Boldonse-Regular.ttf",
    fontSize: 0.35,
    letterSpacing: -0.05,
    lineHeight: 1,
    "material-toneMapped": false,
  };

  const wrapper = useRef();
  const meshRef = useRef();

  useImperativeHandle(ref, () => wrapper.current);

  return (
    <group ref={wrapper} position={[order * 5, 0, 0]}>
      <Text
        ref={meshRef}
        rotation={[0, order * (Math.PI / 30), 0]}
        {...fontProps}
        // {...props}
        maxWidth={5}
      >
        {children}
      </Text>
    </group>
  );
});

export default Word;
