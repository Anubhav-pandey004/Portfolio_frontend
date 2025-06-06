import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import "./WavyGradientMaterial";

export default function FancySphere() {
  const sphereRef = useRef();
  const materialRef = useRef();
  const ringRefs = useRef([]);

  const numRings = 6;
  const pointsPerRing = 100;
  const radius = 1.4;

  // Create 6 evenly spaced horizontal rings
  const ringGeometries = useMemo(() => {
    return new Array(numRings).fill().map((_, i) => {
      const y = -0.9 + (i * 1.8) / (numRings - 1); // From -0.9 to 0.9

      const points = [];
      for (let j = 0; j <= pointsPerRing; j++) {
        const angle = (j / pointsPerRing) * Math.PI * 2;
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * radius,
            y,
            Math.sin(angle) * radius
          )
        );
      }

      return new THREE.BufferGeometry().setFromPoints(points);
    });
  }, []);

  // Animate slight waves
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (sphereRef.current) sphereRef.current.rotation.y = t * 0.2;
    if (materialRef.current) materialRef.current.uniforms.time.value = t;

    ringRefs.current.forEach((ring, index) => {
      const geom = ring.geometry;
      const pos = geom.attributes.position.array;
      const baseY = -0.9 + (index * 1.8) / (numRings - 1);
      for (let i = 0; i < pos.length; i += 3) {
        const x = pos[i];
        const z = pos[i + 2];
        const angle = Math.atan2(z, x);
        pos[i + 1] = baseY + Math.sin(angle * 4 + t * 2) * 0.03; // tiny wave
      }
      geom.attributes.position.needsUpdate = true;
    });
  });

  return (
    <>
      {/* Rotating Inner Sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <wavyGradientMaterial
          ref={materialRef}
          color1="#ff00ff"
          color2="#0000ff"
        />
      </mesh>

      {/* Outer Static Wireframe */}
      <mesh scale={1.7}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#440044" // Darker purple
          wireframe
          opacity={0.6} // More visible
          transparent
        />
      </mesh>

    </>
  );
}
