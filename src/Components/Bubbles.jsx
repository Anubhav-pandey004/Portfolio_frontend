import React, { useMemo, useReducer, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { Physics, RigidBody, BallCollider } from '@react-three/rapier'
import { EffectComposer, N8AO } from '@react-three/postprocessing'

const accents = ['#4060ff', '#20ffa0', '#ff4060', '#ffcc00']

function Bubbles() {
  const [accent, click] = useReducer((state) => ++state % accents.length, 0)
  const connectors = useMemo(() => Array(30).fill(), [accent])

  return (
    <Canvas onClick={click} shadows camera={{ position: [0, 0, 25], fov: 25 }}>
      {/* Solid background for contrast */}
      <color attach="background" args={['#141622']} />
      
      <Physics gravity={[0, 0, 0]}>
        <Pointer />
        {connectors.map((_, i) => (
          <Connector key={i} position={randomPosition()} accent={accents[accent]} />
        ))}
      </Physics>

      <EffectComposer multisampling={8}>
        <N8AO distanceFalloff={1} aoRadius={1} intensity={4} />
      </EffectComposer>

      <Environment preset="city" />
      <OrbitControls enableRotate={true} enableZoom={false} />
    </Canvas>
  )
}

function Connector({ position, accent }) {
  const ref = useRef();
  const material = useRef();
  const meshRef = useRef();
  
  // Generate a random rotation direction for each axis
  const rotationSpeed = useMemo(() => ({
    x: THREE.MathUtils.randFloat(-0.05, 0.2),
    y: THREE.MathUtils.randFloat(-0.08, 0.06),
    z: THREE.MathUtils.randFloat(-0.09, 0.03),
  }), []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed.x * delta;
      meshRef.current.rotation.y += rotationSpeed.y * delta;
      meshRef.current.rotation.z += rotationSpeed.z * delta;
    }
    if (material.current) {
      material.current.color.lerp(new THREE.Color(accent), 0.2 * delta);
    }
  });

  return (
    <RigidBody ref={ref} position={position} colliders={false}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[2, 0.4, 0.4]} />
        <meshStandardMaterial
          ref={material}
          color={accent}
          metalness={1}
          roughness={0.2}
          envMapIntensity={1}
        />
      </mesh>
    </RigidBody>
  );
}

function Pointer() {
  const ref = useRef()
  const { mouse, viewport, camera } = useThree()

  useFrame(() => {
    if (!ref.current) return
    // Convert 2D mouse coordinates to a 3D point at a fixed distance from the camera
    const vec = new THREE.Vector3(mouse.x, mouse.y, 0.5)
    vec.unproject(camera)
    const dir = vec.sub(camera.position).normalize()
    const distance = 10
    const pos = camera.position.clone().add(dir.multiplyScalar(distance))
    ref.current.setNextKinematicTranslation(pos)
  })

  return (
    <RigidBody ref={ref} type="kinematicPosition" colliders="ball">
      <BallCollider args={[1.5]} />
    </RigidBody>
  )
}

const randomPosition = () => [
  THREE.MathUtils.randFloatSpread(20),
  THREE.MathUtils.randFloatSpread(20),
  THREE.MathUtils.randFloatSpread(20)
]

export default Bubbles
