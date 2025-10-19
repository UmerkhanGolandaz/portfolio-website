import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, useGLTF, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Animated Character/Avatar
const AnimatedCharacter = () => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(time * 0.3) * 0.2;
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={meshRef}>
        {/* Head */}
        <mesh position={[0, 1.5, 0]} castShadow>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color={hovered ? '#38bdf8' : '#0ea5e9'}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>

        {/* Body */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.5, 1.5, 32]} />
          <meshStandardMaterial
            color="#6366f1"
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>

        {/* Arms */}
        <mesh position={[-0.7, 0.8, 0]} rotation={[0, 0, 0.5]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
          <meshStandardMaterial color="#818cf8" roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh position={[0.7, 0.8, 0]} rotation={[0, 0, -0.5]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
          <meshStandardMaterial color="#818cf8" roughness={0.4} metalness={0.6} />
        </mesh>

        {/* Legs */}
        <mesh position={[-0.25, -0.5, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
          <meshStandardMaterial color="#4f46e5" roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh position={[0.25, -0.5, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
          <meshStandardMaterial color="#4f46e5" roughness={0.4} metalness={0.6} />
        </mesh>

        {/* Interactive hitbox */}
        <mesh
          position={[0, 0.5, 0]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <boxGeometry args={[2, 3, 1]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </group>
    </Float>
  );
};

// Floating Particles
const Particles = () => {
  const particlesRef = useRef();
  const particleCount = 100;

  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#38bdf8"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Orbiting Rings
const OrbitRings = () => {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.5;
      ring1Ref.current.rotation.x = Math.PI / 2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.3;
      ring2Ref.current.rotation.x = Math.PI / 3;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = time * 0.4;
      ring3Ref.current.rotation.y = Math.PI / 4;
    }
  });

  return (
    <>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2, 0.02, 16, 100]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.5} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.3, 0.02, 16, 100]} />
        <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.5} />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[2.6, 0.02, 16, 100]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.5} />
      </mesh>
    </>
  );
};

const Scene3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 1, 5]} fov={50} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#0ea5e9" />

        {/* Scene Elements */}
        <AnimatedCharacter />
        <OrbitRings />
        <Particles />

        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial
            color="#0f172a"
            roughness={0.8}
            metalness={0.2}
            transparent
            opacity={0.5}
          />
        </mesh>

        {/* Environment */}
        <Environment preset="city" />
        
        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;

