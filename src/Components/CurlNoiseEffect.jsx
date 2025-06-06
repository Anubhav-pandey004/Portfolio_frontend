import * as THREE from "three";
import { useFrame, extend } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";

// Extend Three.js to use DepthOfField
extend({ DepthOfField });

const Particles = () => {
  const particles = useRef();
  const count = window.innerWidth > 1200 ? 700 : 500; // Number of particles

  // Create circular texture
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.arc(64, 64, 64, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  // Create geometry and material for particles
  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      array[i * 3] = (Math.random() - 0.5) * 10;
      array[i * 3 + 1] = (Math.random() - 0.5) * 10;
      array[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return array;
  }, [count]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    particles.current.rotation.y = time * 0.01; // Rotate particles over time
    particles.current.rotation.x = time * 0.02;
  });

  return (
    <>
      <points ref={particles} >
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            itemSize={3}
            count={count}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="white"
          sizeAttenuation={true}
          transparent={true}
          depthWrite={false}
          map={texture} // Circular texture
        />
      </points>

      {/* Apply Depth of Field effect */}
      <EffectComposer>
        <DepthOfField focusDistance={0.2} focalLength={1.2} bokehScale={1.5} />
      </EffectComposer>
    </>
  );
};

export default Particles;
