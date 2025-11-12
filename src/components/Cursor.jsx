import React, { useEffect, useRef } from "react";
import cursor from "../script";

export default function Cursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      cursor(canvasRef.current);
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="fluid"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1,
        backgroundColor: "transparent !important",
        pointerEvents: "none",
        opacity: "0.5",
      }}
    />
  );
}
