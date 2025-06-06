// WavyGradientMaterial.jsx
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { extend } from "@react-three/fiber";

const WavyGradientMaterial = shaderMaterial(
  {
    color1: new THREE.Color("#ff00ff"),
    color2: new THREE.Color("#0000ff"),
    time: 0,
  },
  // Vertex Shader
  `
  uniform float time;
varying vec2 vUv;
varying float vWave;

void main() {
  vUv = uv;
  vec3 pos = position;

  // 👇 Slower speed and vertical-only wave
  float wave = sin(pos.x * 30.0 + time * 0.5) * 0.02;
  pos.y += wave;

  vWave = wave;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}


  `,
  // Fragment Shader
  `uniform vec3 color1;
uniform vec3 color2;
varying vec2 vUv;
varying float vWave;

// Diamond (rhombus) tiling with spacing
float rhombusPattern(vec2 uv, float tiles, float gap) {
  uv *= tiles;
  uv = fract(uv);        // repeat
  uv = abs(uv - 0.5);    // center diamonds
  float diamond = smoothstep(0.5 - gap, 0.5, uv.x + uv.y); // shrink for gap
  return 1.0 - diamond;  // 1.0 inside rhombus, 0.0 outside
}

void main() {
  vec3 baseColor = mix(color1, color2, vUv.y + vWave);

  float rhombus = rhombusPattern(vUv, 40.0, 0.04); // 40 tiles, 0.04 gap
  vec3 darkColor = baseColor * 0.6; // slightly darker rhombus color

  // Mix: inside rhombus gets dark gradient, outside gets base gradient
  vec3 finalColor = mix(baseColor, darkColor, rhombus);

  gl_FragColor = vec4(finalColor, 1.0);
}

  `
);

extend({ WavyGradientMaterial });
