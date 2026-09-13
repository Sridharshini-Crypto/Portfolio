'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { soundFX } from '@/lib/audio';

interface SpatialWorldProps {
  activeSector: string;
}

const SECTOR_CAMERAS: Record<string, { pos: [number, number, number]; lookAt: [number, number, number] }> = {
  identity: { pos: [0, 0, 10], lookAt: [0, 0, 0] },
  mindset: { pos: [0, 0, 7], lookAt: [0, 0, 0] },
  projects: { pos: [0, 3.5, -8], lookAt: [0, 1, -16] },
  intelligence: { pos: [-10, 1.5, -2], lookAt: [-15, 0, -8] },
  journey: { pos: [10, 1.5, -2], lookAt: [15, 0, -8] },
  archive: { pos: [0, -6, -4], lookAt: [0, -10, -12] },
  connect: { pos: [0, -1, -18], lookAt: [0, -2, -26] },
};

export function SpatialWorld({ activeSector }: SpatialWorldProps) {
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const pointsRef = useRef<THREE.Points>(null);
  const ringRef = useRef<THREE.Group>(null);

  // Exact Technical Cyber Green Palette
  const gridPrimary = '#059669';
  const gridSecondary = '#022c22';
  const particleColor = '#34D399';
  const ringColorPrimary = '#10B981';
  const ringColorSecondary = '#047857';

  useEffect(() => {
    const config = SECTOR_CAMERAS[activeSector] || SECTOR_CAMERAS.mindset;

    soundFX.playTravelWhoosh();

    gsap.to(camera.position, {
      x: config.pos[0],
      y: config.pos[1],
      z: config.pos[2],
      duration: 1.2,
      ease: 'power2.inOut',
    });

    gsap.to(currentLookAt.current, {
      x: config.lookAt[0],
      y: config.lookAt[1],
      z: config.lookAt[2],
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        camera.lookAt(currentLookAt.current);
      },
    });
  }, [activeSector, camera]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x += delta * 0.01;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.05;
      ringRef.current.rotation.x += delta * 0.02;
    }
  });

  // Generate 800 glowing green telemetry nodes
  const particleCount = 800;
  const positions = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 60;
      pos[i + 1] = (Math.random() - 0.5) * 40;
      pos[i + 2] = (Math.random() - 0.5) * 60;
    }
    return pos;
  }, [particleCount]);

  return (
    <>
      <fog attach="fog" args={['#050807', 15, 65]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 20, 15]} intensity={0.8} color="#10B981" />
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#34D399" distance={30} />

      {/* Cyber Green Ground Grid */}
      <gridHelper
        args={[80, 50, gridPrimary, gridSecondary]}
        position={[0, -5, 0]}
      />

      {/* Cyber Green Ceiling Grid */}
      <gridHelper
        args={[80, 50, gridPrimary, gridSecondary]}
        position={[0, 15, 0]}
        rotation={[Math.PI, 0, 0]}
      />

      {/* West Grid (The Network Sector) */}
      <gridHelper
        args={[24, 24, gridPrimary, gridSecondary]}
        position={[-16, -3, -8]}
      />

      {/* East Grid (Journey Sector) */}
      <gridHelper
        args={[24, 24, gridPrimary, gridSecondary]}
        position={[16, -3, -8]}
      />

      {/* Lower Vault Grid (Archive Sector) */}
      <gridHelper
        args={[20, 20, gridSecondary, gridPrimary]}
        position={[0, -12, -12]}
      />

      {/* Cyber Floating Green Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color={particleColor}
          transparent
          sizeAttenuation
          opacity={0.65}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Geometric Telemetry Rings at Core */}
      <group ref={ringRef} position={[0, 0, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.8, 3.95, 64]} />
          <meshBasicMaterial
            color={ringColorPrimary}
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <ringGeometry args={[5.2, 5.3, 64]} />
          <meshBasicMaterial
            color={ringColorSecondary}
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </>
  );
}

export default SpatialWorld;
