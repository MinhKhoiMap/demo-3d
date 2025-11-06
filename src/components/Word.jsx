import * as THREE from "three";
import { Text, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Word({ children, order, ...props }) {
  const fontProps = {
    font: "/fonts/Boldonse-Regular.ttf",
    fontSize: 0.5,
    letterSpacing: -0.05,
    lineHeight: 1,
    "material-toneMapped": false,
  };

  const scroll = useScroll();
  const ref = useRef();
  let scrollHis = 0,
    isShow = true;

  // Tie component to the render-loop
  useFrame((state, delta) => {
    const currentPage = Math.floor(scroll.offset * 10);
    // console.log(currentPage);
    if (scroll.offset != scrollHis && currentPage < 5) {
      if (order <= currentPage) {
        isShow = false;
      } else {
        isShow = true;
      }

      if (!isShow) {
        const fadeIn = scroll.range(0.1 * order, 0.1 * (order + 1));
        ref.current.position.x = THREE.MathUtils.lerp(order * 5, -6, fadeIn);

        // ref.current.position.x += (10 / scroll.offset) * (order + 1) * -1;
        // ref.current.position.y += scroll.offset * (order + 1) * -0.5;
        // ref.current.position.z += scroll.offset * (order + 1) * 0.2;
        // ref.current.rotation.y += scroll.offset * (order + 1) * (Math.PI / 10);
      } else {
        const fadeIn = scroll.range(0.1 * order, 0.1 * (order + 1));
        ref.current.position.x = THREE.MathUtils.lerp(order * 5, 0, fadeIn);

        // ref.current.position.x += (10 / scroll.offset) * (order + 1) * -0.5;
        // ref.current.position.y +=
        //   ref.current.position.y <= 0 ? scroll.offset * (order + 1) * 0.5 : 0;
        // ref.current.position.z -= scroll.offset * (order + 1) * 0.2;
        // ref.current.rotation.y += -scroll.offset * (order + 1) * (Math.PI / 30);
      }

      // const

      scrollHis = scroll.offset;
    }
  });
  return (
    <Text
      ref={ref}
      position={[order * 5, 0, 0]}
      // rotation={[0, order * (Math.PI / 30), 0]}
      {...fontProps}
      {...props}
      children={children}
      maxWidth={5}
    />
  );
}
