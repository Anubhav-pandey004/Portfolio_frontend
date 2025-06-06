import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, Html, useProgress } from '@react-three/drei';

// ✅ Preload the robot model early
useGLTF.preload('/scene.gltf');

// Loader for fallback UI
const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <p className="text-white text-lg animate-pulse">Loading {progress.toFixed(0)}%</p>
    </Html>
  );
};

const Robot = ({ position }) => {
  const { scene } = useGLTF('/scene.gltf');
  const robotRef = useRef();

  useFrame(({ mouse }) => {
    if (robotRef.current) {
      const rotationX = -(Math.PI / 0.1 + mouse.y * 0.2);
      const rotationY = (4.3 + mouse.x * 0.5);
      robotRef.current.rotation.set(rotationX, rotationY, 0.1);
    }
  });

  return (
    <primitive
      ref={robotRef}
      object={scene}
      scale={1.2}
      position={position}
      rotation={[Math.PI / 0.1, 4.3, 0.1]}
    />
  );
};

const ResponsiveRobot = () => {
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  const xPosition = isMobile ? -0.2 : viewport.width / 3.9;
  const yPosition = isMobile ? -6 : -3;
  return <Robot position={[xPosition, 0, yPosition]} />;
};

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 1, 5], fov: 50 }} style={{ width: '100vw', height: '100vh' }}>
      <Suspense fallback={<Loader />}>
        <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/exr/1k/thatch_chapel_1k.exr" />
        <ResponsiveRobot />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
