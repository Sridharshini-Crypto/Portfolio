'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import {
  Cpu,
  Shield,
  Code2,
  Terminal,
  Wrench,
  Globe,
  Sparkles,
  Compass,
} from 'lucide-react';
import { soundFX } from '@/lib/audio';

export interface GlobeHub {
  id: string;
  label: string;
  shortLabel: string;
  category: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export const GLOBE_HUBS: GlobeHub[] = [
  {
    id: 'cybersecurity',
    label: 'Cybersecurity',
    shortLabel: 'CYBER DEFENSE',
    category: 'Cybersecurity',
    city: 'Chennai (CIT)',
    country: 'India',
    lat: 13.0827,
    lon: 80.2707,
    icon: Shield,
    color: '#10B981',
  },
  {
    id: 'ai-ml',
    label: 'AI / ML',
    shortLabel: 'APPLIED AI',
    category: 'AI / ML',
    city: 'San Francisco',
    country: 'USA',
    lat: 37.7749,
    lon: -122.4194,
    icon: Cpu,
    color: '#34D399',
  },
  {
    id: 'full-stack',
    label: 'Full-Stack',
    shortLabel: 'SYSTEMS',
    category: 'Full-Stack',
    city: 'Frankfurt',
    country: 'Germany',
    lat: 50.1109,
    lon: 8.6821,
    icon: Code2,
    color: '#10B981',
  },
  {
    id: 'programming',
    label: 'Programming',
    shortLabel: 'CORE COMPUTATION',
    category: 'Programming',
    city: 'Tokyo',
    country: 'Japan',
    lat: 35.6762,
    lon: 139.6503,
    icon: Terminal,
    color: '#6EE7B7',
  },
  {
    id: 'tools',
    label: 'Tools',
    shortLabel: 'DEV WORKFLOWS',
    category: 'Tools',
    city: 'London',
    country: 'UK',
    lat: 51.5074,
    lon: -0.1278,
    icon: Wrench,
    color: '#34D399',
  },
];

// Network Data Arcs connecting hubs
const NETWORK_CONNECTIONS: [string, string][] = [
  ['cybersecurity', 'ai-ml'],
  ['cybersecurity', 'programming'],
  ['cybersecurity', 'full-stack'],
  ['full-stack', 'tools'],
  ['ai-ml', 'tools'],
  ['ai-ml', 'programming'],
];

// Helper to convert Lat/Lon to 3D Cartesian Vector
function latLonToVector3(lat: number, lon: number, radius: number = 2): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Check if a coordinate falls approximately on Earth's major landmasses
function isLandCoordinate(lat: number, lon: number): boolean {
  // North America
  if (lat >= 15 && lat <= 70 && lon >= -168 && lon <= -52) {
    if (lat < 30 && lon < -115) return false;
    if (lat > 50 && lon > -60 && lat < 60) return false;
    return true;
  }
  // South America
  if (lat >= -56 && lat <= 13 && lon >= -82 && lon <= -34) {
    if (lat < -20 && lon < -72) return true;
    if (lon > -40 && lat < -30) return false;
    return true;
  }
  // Europe
  if (lat >= 36 && lat <= 71 && lon >= -10 && lon <= 45) {
    if (lat > 60 && lon > 35) return true;
    return true;
  }
  // Africa
  if (lat >= -35 && lat <= 37 && lon >= -18 && lon <= 52) {
    if (lat < 0 && lon < 10 && lon > -10 && lat < -15) return true;
    return true;
  }
  // Asia & India
  if (lat >= 5 && lat <= 75 && lon >= 45 && lon <= 180) {
    if (lat <= 38 && lon >= 68 && lon <= 92) return true; // India subcontinent
    if (lat <= 10 && lon < 95) return false;
    return true;
  }
  // Australia
  if (lat >= -44 && lat <= -10 && lon >= 112 && lon <= 154) {
    return true;
  }
  // Japan / Philippines / Indonesia
  if (lat >= -10 && lat <= 46 && lon >= 95 && lon <= 146) {
    return true;
  }
  // Antarctica
  if (lat <= -65) {
    return true;
  }
  return false;
}

// ── 3D ARC CURVE COMPONENT ──
function NetworkArc({
  start,
  end,
  active,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  active: boolean;
}) {
  const photonRef = useRef<THREE.Mesh>(null);

  const { curve, lineObject } = useMemo(() => {
    const distance = start.distanceTo(end);
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const alt = 2.0 + distance * 0.35;
    mid.normalize().multiplyScalar(alt);

    const c = new THREE.QuadraticBezierCurve3(start, mid, end);
    const pts = c.getPoints(40);
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({
      color: active ? '#34D399' : '#10B981',
      transparent: true,
      opacity: active ? 0.75 : 0.3,
    });
    return { curve: c, lineObject: new THREE.Line(geo, mat) };
  }, [start, end, active]);

  useFrame(({ clock }) => {
    if (photonRef.current) {
      const t = (clock.getElapsedTime() * 0.45 + (start.x > 0 ? 0.5 : 0)) % 1;
      const pos = curve.getPoint(t);
      photonRef.current.position.copy(pos);
    }
  });

  return (
    <group>
      {/* Curved Arc Line */}
      <primitive object={lineObject} />

      {/* Traveling Data Packet Photon */}
      <mesh ref={photonRef}>
        <sphereGeometry args={[active ? 0.035 : 0.024, 12, 12]} />
        <meshBasicMaterial color="#6EE7B7" />
      </mesh>
    </group>
  );
}

// ── EARTH CONTINENTS POINT CLOUD ──
function EarthPointCloud() {
  const { landPositions, oceanPositions } = useMemo(() => {
    const landPos: number[] = [];
    const oceanPos: number[] = [];

    // Dense grid of points across sphere
    const latStep = 2.4;
    const lonStep = 2.8;

    for (let lat = -88; lat <= 88; lat += latStep) {
      const cosLat = Math.cos((lat * Math.PI) / 180);
      const step = lonStep / Math.max(cosLat, 0.2);

      for (let lon = -180; lon < 180; lon += step) {
        const isLand = isLandCoordinate(lat, lon);
        const radius = isLand ? 2.008 : 1.995;
        const v = latLonToVector3(lat, lon, radius);

        if (isLand) {
          landPos.push(v.x, v.y, v.z);
        } else if (Math.random() < 0.12) {
          // Low-density ocean lattice
          oceanPos.push(v.x, v.y, v.z);
        }
      }
    }

    return {
      landPositions: new Float32Array(landPos),
      oceanPositions: new Float32Array(oceanPos),
    };
  }, []);

  return (
    <group>
      {/* Glowing Landmass Points (Emerald Continents) */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[landPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.036}
          color="#34D399"
          transparent
          opacity={0.92}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* Subtle Ocean Coordinate Points */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[oceanPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#064E3B"
          transparent
          opacity={0.35}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

// ── LATITUDE & LONGITUDE GRATICULE LINES ──
function GraticuleLines() {
  const graticuleGroup = useMemo(() => {
    const group = new THREE.Group();
    const radius = 2.002;

    // Latitudes: Equator, Tropics, Arctic/Antarctic
    const latitudes = [-66.5, -23.5, 0, 23.5, 66.5];
    latitudes.forEach((lat, i) => {
      const ring: THREE.Vector3[] = [];
      for (let lon = 0; lon <= 360; lon += 6) {
        ring.push(latLonToVector3(lat, lon, radius));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(ring);
      const mat = new THREE.LineBasicMaterial({
        color: '#10B981',
        transparent: true,
        opacity: i === 2 ? 0.45 : 0.16,
      });
      group.add(new THREE.Line(geo, mat));
    });

    // Longitudes every 45 degrees
    for (let lon = 0; lon < 360; lon += 45) {
      const meridian: THREE.Vector3[] = [];
      for (let lat = -90; lat <= 90; lat += 5) {
        meridian.push(latLonToVector3(lat, lon, radius));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(meridian);
      const mat = new THREE.LineBasicMaterial({
        color: '#10B981',
        transparent: true,
        opacity: 0.16,
      });
      group.add(new THREE.Line(geo, mat));
    }

    return group;
  }, []);

  return <primitive object={graticuleGroup} />;
}

// ── 3D CATEGORY PIN & INTERACTIVE BILLBOARD ──
function HubPin({
  hub,
  isActive,
  onSelect,
}: {
  hub: GlobeHub;
  isActive: boolean;
  onSelect: (id: string) => void;
}) {
  const pos = useMemo(() => latLonToVector3(hub.lat, hub.lon, 2.01), [hub.lat, hub.lon]);
  const elevatedPos = useMemo(() => latLonToVector3(hub.lat, hub.lon, 2.18), [hub.lat, hub.lon]);
  const Icon = hub.icon;
  const pulseRef = useRef<THREE.Mesh>(null);

  const anchorLine = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints([pos, elevatedPos]);
    const mat = new THREE.LineBasicMaterial({
      color: isActive ? '#34D399' : '#10B981',
      transparent: true,
      opacity: isActive ? 0.9 : 0.4,
    });
    return new THREE.Line(geo, mat);
  }, [pos, elevatedPos, isActive]);

  useFrame(({ clock }) => {
    if (pulseRef.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 4 + hub.lat) * 0.25;
      pulseRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      {/* Surface Beacon Dot */}
      <mesh position={pos}>
        <sphereGeometry args={[isActive ? 0.045 : 0.03, 16, 16]} />
        <meshBasicMaterial color={isActive ? '#34D399' : '#10B981'} />
      </mesh>

      {/* Surface Pulsing Wave Ring */}
      <mesh ref={pulseRef} position={pos} lookAt={() => new THREE.Vector3(0, 0, 0)}>
        <ringGeometry args={[0.04, 0.08, 16]} />
        <meshBasicMaterial
          color="#34D399"
          transparent
          opacity={isActive ? 0.7 : 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Vertical Laser Anchor Line */}
      <primitive object={anchorLine} />

      {/* 3D Interactive HTML Chip Anchored to Globe */}
      <Html position={elevatedPos} center distanceFactor={7} zIndexRange={[100, 0]}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            soundFX.playClick();
            onSelect(hub.id);
          }}
          className={`group flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl border transition-all duration-300 cursor-pointer shadow-xl whitespace-nowrap backdrop-blur-md ${
            isActive
              ? 'bg-gradient-to-r from-[#047857] via-[#059669] to-[#10B981] text-white border-emerald-300 shadow-[0_0_24px_rgba(16,185,129,0.85)] scale-110 font-extrabold'
              : 'bg-[#050807]/90 text-emerald-300/90 border-emerald-500/40 hover:border-emerald-400 hover:text-white hover:scale-105 hover:bg-emerald-950/80'
          }`}
          title={`Focus on ${hub.label} (${hub.city})`}
        >
          <div
            className={`p-1 rounded-md ${
              isActive ? 'bg-emerald-950 text-emerald-200' : 'bg-[#0E1813] text-emerald-400'
            }`}
          >
            <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </div>
          <div className="text-left leading-none">
            <div className="text-[10px] sm:text-[11px] font-heading font-black tracking-wide">
              {hub.label}
            </div>
            <div className="text-[8px] font-mono text-emerald-300/70 hidden sm:block">
              {hub.city}
            </div>
          </div>
        </button>
      </Html>
    </group>
  );
}

// ── 3D SCENE ROOT ──
function GlobeScene({
  activeCategoryId,
  onSelectCategory,
}: {
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
}) {
  const globeGroupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const controlsRef = useRef<any>(null);

  // Rotate globe towards active hub
  useEffect(() => {
    const hub = GLOBE_HUBS.find((h) => h.id === activeCategoryId);
    if (hub && controlsRef.current) {
      const targetVec = latLonToVector3(hub.lat, hub.lon, 4.8);
      gsap.to(controlsRef.current.object.position, {
        x: targetVec.x,
        y: Math.max(-1.5, Math.min(2.5, targetVec.y)),
        z: targetVec.z,
        duration: 1.2,
        ease: 'power2.inOut',
      });
    }
  }, [activeCategoryId]);

  useFrame(({ clock }, delta) => {
    // Subtle background ring rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.08;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[10, 15, 10]} intensity={1.2} color="#10B981" />
      <directionalLight position={[-10, -10, -10]} intensity={0.4} color="#059669" />
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#34D399" distance={10} />

      {/* Interactive Orbit Controls with smooth damping */}
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        autoRotate={true}
        autoRotateSpeed={0.65}
        enableDamping={true}
        dampingFactor={0.06}
        minPolarAngle={Math.PI * 0.2}
        maxPolarAngle={Math.PI * 0.8}
      />

      {/* Main Globe Group */}
      <group ref={globeGroupRef}>
        
        {/* 1. Deep Core Solid Globe Sphere (Occludes back side points) */}
        <mesh>
          <sphereGeometry args={[1.98, 64, 64]} />
          <meshStandardMaterial
            color="#040906"
            roughness={0.7}
            metalness={0.2}
          />
        </mesh>

        {/* 2. Earth Landmass Continents Points */}
        <EarthPointCloud />

        {/* 3. Latitude & Longitude Graticule Coordinate Lines */}
        <GraticuleLines />

        {/* 4. Atmospheric Fresnel Outer Glow Halo */}
        <mesh>
          <sphereGeometry args={[2.08, 48, 48]} />
          <meshBasicMaterial
            color="#10B981"
            transparent
            opacity={0.12}
            side={THREE.BackSide}
          />
        </mesh>

        {/* 5. Network Arcs Connecting Global Cyber Hubs */}
        {NETWORK_CONNECTIONS.map(([srcId, dstId], idx) => {
          const srcHub = GLOBE_HUBS.find((h) => h.id === srcId);
          const dstHub = GLOBE_HUBS.find((h) => h.id === dstId);
          if (!srcHub || !dstHub) return null;

          const startVec = latLonToVector3(srcHub.lat, srcHub.lon, 2.01);
          const endVec = latLonToVector3(dstHub.lat, dstHub.lon, 2.01);
          const isActive =
            srcHub.id === activeCategoryId || dstHub.id === activeCategoryId;

          return (
            <NetworkArc
              key={`${srcId}-${dstId}-${idx}`}
              start={startVec}
              end={endVec}
              active={isActive}
            />
          );
        })}

        {/* 6. 5 Interactive Category Hub Pins & 3D Billboards */}
        {GLOBE_HUBS.map((hub) => (
          <HubPin
            key={hub.id}
            hub={hub}
            isActive={hub.id === activeCategoryId}
            onSelect={onSelectCategory}
          />
        ))}

        {/* 7. Equatorial & Inclined Luminous Orbital Cyber Rings */}
        <group ref={ring1Ref} rotation={[Math.PI / 3.5, 0, Math.PI / 6]}>
          <mesh>
            <ringGeometry args={[2.55, 2.58, 64]} />
            <meshBasicMaterial
              color="#34D399"
              transparent
              opacity={0.35}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>

        <group ref={ring2Ref} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <mesh>
            <ringGeometry args={[2.85, 2.87, 64]} />
            <meshBasicMaterial
              color="#059669"
              transparent
              opacity={0.25}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>

      </group>
    </>
  );
}

// ── MAIN EXPORTED 3D CYBER GLOBE CONTAINER ──
interface CyberGlobe3DProps {
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
}

export function CyberGlobe3D({
  activeCategoryId,
  onSelectCategory,
}: CyberGlobe3DProps) {
  const [mounted, setMounted] = useState(false);
  const activeHub = GLOBE_HUBS.find((h) => h.id === activeCategoryId) || GLOBE_HUBS[0];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full h-[480px] sm:h-[560px] md:h-[620px] bg-[#050807] border border-emerald-500/35 rounded-3xl overflow-hidden select-none shadow-[0_0_60px_rgba(0,0,0,0.95)] flex items-center justify-center group">
      
      {/* Background Cyber Grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(16, 185, 129, 0.4) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Top HUD Telemetry Ribbon */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20 text-[10px] font-mono text-emerald-400/90">
        <div className="flex items-center gap-2 bg-[#0A110D]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/30 shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold tracking-wider text-emerald-300">
            3D WEBGL CYBER EARTH // 5 ACTIVE HUBS
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 bg-[#0A110D]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/30 shadow-md">
          <span className="text-emerald-300 font-bold">{activeHub.city}</span>
          <span className="text-emerald-500/40">|</span>
          <span>
            {activeHub.lat.toFixed(2)}°N, {activeHub.lon.toFixed(2)}°E
          </span>
        </div>
      </div>

      {/* 3D Canvas WebGL Viewport */}
      {mounted ? (
        <Canvas
          camera={{ position: [0, 0, 4.8], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <GlobeScene
            activeCategoryId={activeCategoryId}
            onSelectCategory={onSelectCategory}
          />
        </Canvas>
      ) : (
        <div className="flex items-center justify-center text-emerald-400 text-xs font-mono">
          INITIALIZING 3D SPHERICAL ENGINE...
        </div>
      )}

      {/* Bottom Floating Telemetry & Drag Navigation Hint */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20 text-[10px] font-mono text-emerald-400/80">
        <div className="flex items-center gap-1.5 bg-[#0A110D]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/25 shadow-sm">
          <Compass className="w-3.5 h-3.5 text-emerald-400" />
          <span>DRAG TO ROTATE 3D EARTH</span>
        </div>
        <div className="flex items-center gap-1.5 bg-[#0A110D]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/25 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>CLICK ANY HUB TO REVEAL TOOLS</span>
        </div>
      </div>

    </div>
  );
}

export default CyberGlobe3D;

