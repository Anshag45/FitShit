import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Cylinder, Text3D, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface WorkoutVisualizationProps {
  exerciseName: string;
  progress: number;
  isActive: boolean;
}

function ExerciseVisualizer({ exerciseName, progress, isActive }: WorkoutVisualizationProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      
      if (isActive) {
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 4) * 0.1);
      }
    }

    if (particlesRef.current && isActive) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 2;
    }
  });

  const getExerciseShape = () => {
    switch (exerciseName.toLowerCase()) {
      case 'push-ups':
      case 'cosmic push-ups':
        return <Box args={[1, 0.2, 2]} />;
      case 'squats':
      case 'galactic squats':
        return <Cylinder args={[0.8, 1.2, 1.5, 8]} />;
      case 'burpees':
      case 'meteor burpees':
        return <Sphere args={[1, 16, 16]} />;
      default:
        return <Box args={[1, 1, 1]} />;
    }
  };

  const progressColor = new THREE.Color().lerpColors(
    new THREE.Color('#ff4757'),
    new THREE.Color('#00d4ff'),
    progress / 100
  );

  return (
    <group>
      {/* Main Exercise Shape */}
      <mesh ref={meshRef}>
        {getExerciseShape()}
        <meshStandardMaterial 
          color={progressColor}
          metalness={0.8}
          roughness={0.2}
          emissive={progressColor}
          emissiveIntensity={isActive ? 0.3 : 0.1}
        />
      </mesh>

      {/* Progress Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <Cylinder args={[2, 2, 0.1, 32, 1, false, 0, (progress / 100) * Math.PI * 2]}>
          <meshStandardMaterial 
            color="#00d4ff" 
            transparent 
            opacity={0.7}
            emissive="#00d4ff"
            emissiveIntensity={0.4}
          />
        </Cylinder>
      </mesh>

      {/* Energy Particles */}
      {isActive && (
        <group ref={particlesRef}>
          {[...Array(20)].map((_, i) => (
            <mesh 
              key={i} 
              position={[
                Math.cos((i / 20) * Math.PI * 2) * 3,
                Math.sin((i / 10) * Math.PI) * 0.5,
                Math.sin((i / 20) * Math.PI * 2) * 3
              ]}
            >
              <Sphere args={[0.05, 8, 8]}>
                <meshStandardMaterial 
                  color="#00d4ff" 
                  emissive="#00d4ff"
                  emissiveIntensity={0.8}
                />
              </Sphere>
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}

export function WorkoutVisualization({ exerciseName, progress, isActive }: WorkoutVisualizationProps) {
  return (
    <motion.div 
      className="h-64 w-full relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#00d4ff" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ff00ff" />
        <ExerciseVisualizer exerciseName={exerciseName} progress={progress} isActive={isActive} />
        <Environment preset="night" />
      </Canvas>
    </motion.div>
  );
}