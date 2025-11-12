import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import React, { useEffect, useRef } from "react";

export default function GlassBroke() {
  const ref = useRef();

  const { scene, nodes, animations } = useGLTF(
    "/models/GLASS_PROJECTE (1).glb"
  );
  const { actions, names } = useAnimations(animations, ref);

  useEffect(() => {
    console.log(animations, actions);
    if (actions && names.length > 0) {
      const action = actions[names[0]];
      action.play();
    }
  }, [actions, names]);

  return (
    <>
      <primitive ref={ref} object={scene} rotation={[0, 180, 0]} />
      <OrbitControls />
    </>
  );
}
