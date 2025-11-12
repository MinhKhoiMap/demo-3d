export default function Background() {
  const shader = {
    uniforms: {},
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;

      void main() {
       float t = vUv.y / 0.7;        
          t = clamp(t, 0.0, 1.0);  
      
        // Gradient from red (bottom) to black (top)
        vec3 color = mix(vec3(0.3, 0.0, 0.0), vec3(0.5, 0.5, 0.5), t);

        // --- Tạo chấm tròn nhỏ ---
        float aspect = 16.0 / 9.0; // ví dụ tỉ lệ màn hình của bạn
        vec2 grid = vUv * vec2(130.0, 130.0);
        vec2 cell = fract(grid) - 0.5;
        cell.x *= aspect; // chỉnh tỉ lệ theo màn hình

        float d = length(cell);
        float dotMask = smoothstep(0.10, 0.08, d);

        vec3 dotColor = vec3(0.5);
        color = mix(color, dotColor, dotMask * 0.4);

        gl_FragColor = vec4(color, 1.0);
      }
    `,
  };

  return (
    <mesh scale={[20, 20, 1]} position={[0, 0, -1]} renderOrder={-1}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        args={[shader]}
        position={[0, 0, -1]}
        depthWrite={false}
      />
    </mesh>
  );
}
