import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Cylinder, Text3D, OrbitControls, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface HeroAvatarProps {
  spiritAnimal?: string;
  level: number;
  isAnimating?: boolean;
  size?: 'small' | 'medium' | 'large';
}

function AnimatedHero({ spiritAnimal, level, isAnimating }: { spiritAnimal?: string; level: number; isAnimating?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      if (isAnimating) {
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
      }
    }
    if (groupRef.current && isAnimating) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  const getAvatarColor = () => {
    switch (spiritAnimal) {
      case 'cheetah': return '#ff6b35';
      case 'turtle': return '#4ecdc4';
      case 'eagle': return '#45b7d1';
      case 'bear': return '#8b4513';
      default: return '#00d4ff';
    }
  };

  const particleCount = level * 5;
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4
        ],
        scale: Math.random() * 0.1 + 0.05
      });
    }
    return temp;
  }, [particleCount]);

  return (
    <group ref={groupRef}>
      {/* Main Avatar */}
      <mesh ref={meshRef}>
        <Sphere args={[0.8, 32, 32]}>
          <meshStandardMaterial 
            color={getAvatarColor()} 
            metalness={0.7}
            roughness={0.2}
            emissive={getAvatarColor()}
            emissiveIntensity={0.2}
          />
        </Sphere>
      </mesh>

      {/* Level Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
        <Cylinder args={[1.2, 1.2, 0.1, 32]}>
          <meshStandardMaterial 
            color="#00d4ff" 
            transparent 
            opacity={0.6}
            emissive="#00d4ff"
            emissiveIntensity={0.3}
          />
        </Cylinder>
      </mesh>

      {/* Energy Particles */}
      {particles.map((particle, index) => (
        <mesh key={index} position={particle.position as [number, number, number]} scale={particle.scale}>
          <Sphere args={[1, 8, 8]}>
            <meshStandardMaterial 
              color="#00d4ff" 
              emissive="#00d4ff"
              emissiveIntensity={0.5}
              transparent
              opacity={0.8}
            />
          </Sphere>
        </mesh>
      ))}

      {/* Level Text */}
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.3}
        height={0.1}
        position={[0, -1.2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        {`LV ${level}`}
        <meshStandardMaterial color="#ffffff" emissive="#00d4ff" emissiveIntensity={0.2} />
      </Text3D>
    </group>
  );
}

export function HeroAvatar({ spiritAnimal, level, isAnimating = false, size = 'medium' }: HeroAvatarProps) {
  const sizeMap = {
    small: 'h-32 w-32',
    medium: 'h-48 w-48',
    large: 'h-64 w-64'
  };

  return (
    <motion.div 
      className={`${sizeMap[size]} relative`}
      initial={{ scale: 0, rotateY: -180 }}
      animate={{ scale: 1, rotateY: 0 }}
      transition={{ duration: 1, type: "spring" }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
        <AnimatedHero spiritAnimal={spiritAnimal} level={level} isAnimating={isAnimating} />
        <Environment preset="night" />
      </Canvas>
    </motion.div>
  );
}