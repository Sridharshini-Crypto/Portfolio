'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function SystemGrid() {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate a neat, structured matrix of architectural coordinates
  const count = 120;
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 10;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime() * 0.08;
    pointsRef.current.rotation.y = time * 0.5;
    pointsRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
  });

  return (
    <group>
      {/* Subtle infinite coordinate grid floor */}
      <gridHelper
        args={[30, 30, '#5F91C7', '#E8EDF2']}
        position={[0, -4, 0]}
        rotation={[0.1, 0, 0]}
      />

      {/* Floating telemetry coordinates */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#245C9A"
          transparent
          opacity={0.35}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

