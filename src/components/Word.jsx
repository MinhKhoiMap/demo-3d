import * as THREE from "three";
import { Text, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Word({ children, order, ...props }) {
  const fontProps = {
    font: "/fonts/Boldonse-Regular.ttf",
    fontSize: 0.8,
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
    const currentPage = Math.floor(scroll.offset * 6);
    if (scroll.offset != scrollHis) {
      // const box = new THREE.Box3().setFromObject(ref.current);
      // const size = new THREE.Vector3();
      // box.getSize(size);
      // const width = size.x;
      // const height = size.y;

      // console.log(width, height);

      if (order <= currentPage) {
        isShow = false;
      } else {
        isShow = true;
      }

      if (!isShow) {
        ref.current.position.x += scroll.offset * (order + 1) * -1;
        ref.current.position.y += scroll.offset * (order + 1) * -1;
        ref.current.position.z += scroll.offset * (order + 1) * 0.2;
        ref.current.rotation.y += scroll.offset * (order + 1) * (Math.PI / 30);
      } else {
        ref.current.position.x += scroll.offset * (order + 1) * -0.5;
        ref.current.position.y +=
          ref.current.position.y <= 0 ? scroll.offset * (order + 1) * 0.5 : 0;
        ref.current.position.z -= scroll.offset * (order + 1) * 0.2;
        // ref.current.rotation.y += -scroll.offset * (order + 1) * (Math.PI / 30);
      }

      scrollHis = scroll.offset;
    } else {
      // if (order <= currentPage) {
      //   isShow = true;
      // } else {
      //   isShow = false;
      // }
      // if (!isShow) {
      //   ref.current.position.x += scroll.offset * -2;
      //   ref.current.position.y += scroll.offset * -0.5;
      //   ref.current.position.z += scroll.offset * 0.2;
      //   ref.current.rotation.y += scroll.offset * (Math.PI / 30);
      // } else {
      //   ref.current.position.x += scroll.offset * -2;
      //   ref.current.position.y += scroll.offset * 0.5;
      //   ref.current.position.z += scroll.offset * 0.2;
      //   ref.current.rotation.y += -scroll.offset * (Math.PI / 30);
      // }
    }
  });
  return (
    <Text
      ref={ref}
      position={[order * 5, -order * 2, 0]}
      // rotation={[0, order * (Math.PI / 30), 0]}
      {...fontProps}
      {...props}
      children={children}
      maxWidth={5}
    />
  );
}
