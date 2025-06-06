import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';

const Robot = ({ position }) => {
  const { scene } = useGLTF('/scene.gltf');
  const robotRef = useRef();

  // Mouse tracking logic
  useFrame(({ mouse }) => {
    if (robotRef.current) {
      const rotationX = -(Math.PI / 0.1 + mouse.y * 0.2); // Adjust vertical tilt
      const rotationY = (4.3 + mouse.x * 0.5); // Adjust horizontal rotation

      robotRef.current.rotation.set(rotationX, rotationY, 0.1);
    }
  });

  return (
    <primitive
      ref={robotRef}
      object={scene}
      scale={1.2}
      position={position}
      rotation={[Math.PI / 0.1, 4.3, 0.1]} // Initial rotation
    />
  );
};

// 🛠 Helper component to adjust position dynamically
const ResponsiveRobot = () => {
  const { viewport } = useThree();
  const isMobile = viewport.width < 5; // Adjust based on device width
  const xPosition = isMobile ? -0.2 : viewport.width / 3.9; // Center on mobile, right on desktop
  const yPosition = isMobile ? -6 : -3;
  return <Robot position={[xPosition, 0, yPosition]} />;
};
// -3 on window and -6 on mobile

const Scene = () => {
  return (
    <Canvas 
      camera={{ position: [0, 1, 5], fov: 50 }} 
      style={{ width: '100vw', height: '100vh' }} 

    >
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/exr/1k/thatch_chapel_1k.exr"  />
      <ResponsiveRobot />
    </Canvas>
  );
};

export default Scene;
