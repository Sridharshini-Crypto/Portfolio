'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Compass, Shield, Cpu, Code2, Terminal, Wrench } from 'lucide-react';
import { soundFX } from '@/lib/audio';

export interface CategoryInfo {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  lat: number; // in radians
  lon: number; // in radians
  color: string;
}

export const GLOBE_CATEGORIES: CategoryInfo[] = [
  {
    id: 'ai-ml',
    label: 'AI / ML',
    shortLabel: 'AI/ML',
    icon: Cpu,
    lat: 0.35,
    lon: 0.0,
    color: '#34D399',
  },
  {
    id: 'full-stack',
    label: 'Full-Stack',
    shortLabel: 'FULLSTACK',
    icon: Code2,
    lat: -0.25,
    lon: 1.25,
    color: '#10B981',
  },
  {
    id: 'programming',
    label: 'Programming',
    shortLabel: 'PROG',
    icon: Terminal,
    lat: 0.5,
    lon: 2.5,
    color: '#6EE7B7',
  },
  {
    id: 'cybersecurity',
    label: 'Cybersecurity',
    shortLabel: 'CYBERSEC',
    icon: Shield,
    lat: -0.4,
    lon: 3.8,
    color: '#059669',
  },
  {
    id: 'tools',
    label: 'Tools',
    shortLabel: 'TOOLS',
    icon: Wrench,
    lat: 0.1,
    lon: 5.0,
    color: '#34D399',
  },
];

interface ManualCyberGlobeProps {
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
}

export function ManualCyberGlobe({
  activeCategoryId,
  onSelectCategory,
}: ManualCyberGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [telemetry, setTelemetry] = useState({ yaw: 0, pitch: 15, fps: 60 });

  // Physics & Rotation State refs to prevent unnecessary React re-renders
  const stateRef = useRef({
    yaw: 0.4,
    pitch: 0.25,
    targetYaw: 0.4,
    targetPitch: 0.25,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    startYaw: 0,
    startPitch: 0,
    autoRotate: true,
    lastTime: performance.now(),
    frameCount: 0,
    lastFpsUpdate: performance.now(),
  });

  // Nodes screen positions for interactive clicking
  const [nodePositions, setNodePositions] = useState<
    { id: string; x: number; y: number; z: number; visible: boolean }[]
  >([]);

  // When activeCategoryId changes externally, optionally rotate globe towards target node
  useEffect(() => {
    const targetNode = GLOBE_CATEGORIES.find((c) => c.id === activeCategoryId);
    if (targetNode && !stateRef.current.isDragging) {
      // Set target yaw so that node faces front (lon + yaw = PI/2 or 0)
      const desiredYaw = -targetNode.lon + Math.PI / 2;
      stateRef.current.targetYaw = desiredYaw;
      stateRef.current.targetPitch = -targetNode.lat * 0.5 + 0.15;
    }
  }, [activeCategoryId]);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Generate fixed 3D surface points (Fibonacci sphere distribution)
    const NUM_POINTS = 160;
    const spherePoints: { x: number; y: number; z: number; lat: number; lon: number }[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < NUM_POINTS; i++) {
      const y = 1 - (i / (NUM_POINTS - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      spherePoints.push({
        x,
        y,
        z,
        lat: Math.asin(y),
        lon: Math.atan2(z, x),
      });
    }

    // Latitude rings definition (-60, -30, 0, 30, 60 deg)
    const latRings = [-Math.PI / 3, -Math.PI / 6, 0, Math.PI / 6, Math.PI / 3];
    // Longitude rings definition (every 30 deg)
    const lonRings = [0, Math.PI / 6, Math.PI / 3, Math.PI / 2, (2 * Math.PI) / 3, (5 * Math.PI) / 6];

    const render = (time: number) => {
      const st = stateRef.current;
      const dt = Math.min((time - st.lastTime) / 1000, 0.1);
      st.lastTime = time;

      // FPS tracking
      st.frameCount++;
      if (time - st.lastFpsUpdate >= 1000) {
        setTelemetry((prev) => ({
          ...prev,
          yaw: Math.round((((st.yaw % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) * (180 / Math.PI)),
          pitch: Math.round(st.pitch * (180 / Math.PI)),
          fps: Math.round((st.frameCount * 1000) / (time - st.lastFpsUpdate)),
        }));
        st.frameCount = 0;
        st.lastFpsUpdate = time;
      }

      // Smooth interpolation / auto rotation
      if (st.autoRotate && !st.isDragging) {
        st.targetYaw += 0.35 * dt;
      }
      st.yaw += (st.targetYaw - st.yaw) * Math.min(dt * 6, 1);
      st.pitch += (st.targetPitch - st.pitch) * Math.min(dt * 6, 1);

      // Clamp pitch to prevent gimbal flip
      st.pitch = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, st.pitch));

      // Resize canvas to display size with device pixel ratio
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const width = rect.width;
      const height = rect.height;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.36;

      // 3D Rotation helper
      const sinYaw = Math.sin(st.yaw);
      const cosYaw = Math.cos(st.yaw);
      const sinPitch = Math.sin(st.pitch);
      const cosPitch = Math.cos(st.pitch);

      const project3D = (px: number, py: number, pz: number, r: number = radius) => {
        // Rotate around Y axis (Yaw)
        const x1 = px * cosYaw - pz * sinYaw;
        const z1 = px * sinYaw + pz * cosYaw;

        // Rotate around X axis (Pitch)
        const y2 = py * cosPitch - z1 * sinPitch;
        const z2 = py * sinPitch + z1 * cosPitch;

        // Simple perspective factor
        const fov = 400;
        const scale = fov / (fov + z2 * r * 0.5);

        return {
          x: cx + x1 * r * scale,
          y: cy - y2 * r * scale,
          z: z2,
          scale,
        };
      };

      // ── 1. BACKGROUND GLOW & RADAR RINGS ──
      const bgGrad = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius * 1.5);
      bgGrad.addColorStop(0, 'rgba(16, 185, 129, 0.12)');
      bgGrad.addColorStop(0.6, 'rgba(5, 150, 105, 0.04)');
      bgGrad.addColorStop(1, 'rgba(5, 8, 7, 0)');
      ctx.fillStyle = bgGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Ambient Outer Radar Rings
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.25, 0, Math.PI * 2);
      ctx.stroke();

      // Equatorial Outer Cyber Orbit Ring (Tilted)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((time * 0.0003) % (Math.PI * 2));
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.35)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.35, radius * 0.45, Math.PI / 6, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      ctx.setLineDash([]); // Reset line dash

      // ── 2. DRAW SPHERE LATITUDE & LONGITUDE WIREFRAME LINES ──
      // Back wires (z < 0) first for depth
      const drawWireframes = (drawBack: boolean) => {
        // Latitude rings
        latRings.forEach((lat) => {
          const rLat = Math.cos(lat);
          const yLat = Math.sin(lat);
          const STEPS = 48;
          ctx.beginPath();
          let started = false;

          for (let i = 0; i <= STEPS; i++) {
            const lon = (i / STEPS) * Math.PI * 2;
            const px = rLat * Math.cos(lon);
            const pz = rLat * Math.sin(lon);
            const proj = project3D(px, yLat, pz);

            const isBack = proj.z < 0;
            if (isBack === drawBack) {
              if (!started) {
                ctx.moveTo(proj.x, proj.y);
                started = true;
              } else {
                ctx.lineTo(proj.x, proj.y);
              }
            } else {
              started = false;
            }
          }

          ctx.strokeStyle = drawBack
            ? 'rgba(16, 185, 129, 0.08)'
            : lat === 0
            ? 'rgba(52, 211, 153, 0.45)'
            : 'rgba(16, 185, 129, 0.22)';
          ctx.lineWidth = lat === 0 ? 1.5 : 0.8;
          ctx.stroke();
        });

        // Longitude rings
        lonRings.forEach((lonAngle) => {
          const STEPS = 48;
          ctx.beginPath();
          let started = false;

          for (let i = 0; i <= STEPS; i++) {
            const lat = (i / STEPS) * Math.PI * 2;
            const px = Math.cos(lat) * Math.cos(lonAngle);
            const py = Math.sin(lat);
            const pz = Math.cos(lat) * Math.sin(lonAngle);
            const proj = project3D(px, py, pz);

            const isBack = proj.z < 0;
            if (isBack === drawBack) {
              if (!started) {
                ctx.moveTo(proj.x, proj.y);
                started = true;
              } else {
                ctx.lineTo(proj.x, proj.y);
              }
            } else {
              started = false;
            }
          }

          ctx.strokeStyle = drawBack ? 'rgba(16, 185, 129, 0.06)' : 'rgba(16, 185, 129, 0.18)';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        });
      };

      // Draw back wireframes
      drawWireframes(true);

      // ── 3. DRAW SPHERE SURFACE PARTICLES / POINTS ──
      spherePoints.forEach((pt) => {
        const proj = project3D(pt.x, pt.y, pt.z);
        const alpha = proj.z >= 0 ? 0.3 + 0.6 * proj.z : 0.08;
        const ptRadius = proj.z >= 0 ? 1.2 + 1.2 * proj.z : 0.8;

        ctx.fillStyle = `rgba(52, 211, 153, ${alpha})`;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, ptRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw front wireframes
      drawWireframes(false);

      // ── 4. RADAR SWEEP LINE ──
      const sweepAngle = (time * 0.0012) % (Math.PI * 2);
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius * 1.05, sweepAngle - 0.35, sweepAngle);
      ctx.closePath();
      const sweepGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.05);
      sweepGrad.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
      sweepGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');
      ctx.fillStyle = sweepGrad;
      ctx.fill();
      ctx.restore();

      // ── 5. PROJECT CATEGORY ORBITAL SATELLITES & DRAW CONNECTIONS ──
      const updatedPositions: { id: string; x: number; y: number; z: number; visible: boolean }[] = [];

      GLOBE_CATEGORIES.forEach((cat) => {
        const isActive = cat.id === activeCategoryId;
        const rMult = isActive ? 1.22 : 1.15;
        const cosLat = Math.cos(cat.lat);
        const sinLat = Math.sin(cat.lat);
        const px = cosLat * Math.cos(cat.lon);
        const py = sinLat;
        const pz = cosLat * Math.sin(cat.lon);

        const proj = project3D(px, py, pz, radius * rMult);
        const surfProj = project3D(px, py, pz, radius);

        updatedPositions.push({
          id: cat.id,
          x: proj.x,
          y: proj.y,
          z: proj.z,
          visible: proj.z > -0.3,
        });

        // Laser beam connection from surface to satellite node
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(surfProj.x, surfProj.y);
        ctx.lineTo(proj.x, proj.y);
        ctx.strokeStyle = isActive ? 'rgba(52, 211, 153, 0.85)' : 'rgba(16, 185, 129, 0.35)';
        ctx.lineWidth = isActive ? 2 : 1;
        if (!isActive) ctx.setLineDash([2, 4]);
        ctx.stroke();
        ctx.restore();

        // If node is on front half or close to horizon
        if (proj.z > -0.4) {
          const nodeAlpha = Math.max(0.2, (proj.z + 0.5) / 1.5);

          // Glowing node aura on canvas
          if (isActive) {
            ctx.save();
            ctx.fillStyle = 'rgba(16, 185, 129, 0.25)';
            ctx.beginPath();
            ctx.arc(proj.x, proj.y, 22 * proj.scale, 0, Math.PI * 2);
            ctx.fill();

            // Pulsing target ring
            const pulseR = (16 + Math.sin(time * 0.006) * 4) * proj.scale;
            ctx.strokeStyle = 'rgba(52, 211, 153, 0.8)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(proj.x, proj.y, pulseR, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
          }

          // Core node pip
          ctx.fillStyle = isActive ? '#34D399' : `rgba(52, 211, 153, ${nodeAlpha})`;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, (isActive ? 6 : 4) * proj.scale, 0, Math.PI * 2);
          ctx.fill();

          // Surface anchor point
          ctx.fillStyle = isActive ? '#10B981' : 'rgba(16, 185, 129, 0.5)';
          ctx.beginPath();
          ctx.arc(surfProj.x, surfProj.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      setNodePositions(updatedPositions);

      // Center Core Glowing HUD Pip
      ctx.fillStyle = 'rgba(16, 185, 129, 0.8)';
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeCategoryId]);

  // Mouse / Touch Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    stateRef.current.isDragging = true;
    stateRef.current.autoRotate = false;
    stateRef.current.dragStartX = e.clientX;
    stateRef.current.dragStartY = e.clientY;
    stateRef.current.startYaw = stateRef.current.yaw;
    stateRef.current.startPitch = stateRef.current.pitch;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!stateRef.current.isDragging) return;
    const dx = e.clientX - stateRef.current.dragStartX;
    const dy = e.clientY - stateRef.current.dragStartY;

    stateRef.current.targetYaw = stateRef.current.startYaw + dx * 0.008;
    stateRef.current.targetPitch = stateRef.current.startPitch - dy * 0.008;
  };

  const handleMouseUp = () => {
    if (stateRef.current.isDragging) {
      stateRef.current.isDragging = false;
      // Resume auto rotation after 3 seconds of idle
      setTimeout(() => {
        if (!stateRef.current.isDragging) {
          stateRef.current.autoRotate = true;
        }
      }, 3000);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      stateRef.current.isDragging = true;
      stateRef.current.autoRotate = false;
      stateRef.current.dragStartX = e.touches[0].clientX;
      stateRef.current.dragStartY = e.touches[0].clientY;
      stateRef.current.startYaw = stateRef.current.yaw;
      stateRef.current.startPitch = stateRef.current.pitch;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!stateRef.current.isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - stateRef.current.dragStartX;
    const dy = e.touches[0].clientY - stateRef.current.dragStartY;

    stateRef.current.targetYaw = stateRef.current.startYaw + dx * 0.008;
    stateRef.current.targetPitch = stateRef.current.startPitch - dy * 0.008;
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  const activeCategory = GLOBE_CATEGORIES.find((c) => c.id === activeCategoryId) || GLOBE_CATEGORIES[0];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[460px] sm:h-[540px] md:h-[580px] bg-[#050807] border border-emerald-500/35 rounded-3xl overflow-hidden select-none shadow-[0_0_50px_rgba(0,0,0,0.95)] flex items-center justify-center group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        handleMouseUp();
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: stateRef.current.isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Background Cyber Grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(16, 185, 129, 0.35) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Top HUD Status Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10 text-[10px] font-mono text-emerald-400/80">
        <div className="flex items-center gap-2 bg-[#0A110D]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/25 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold tracking-wider text-emerald-300">CORE 3D SPHERE // 5 NODES</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 bg-[#0A110D]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/25">
          <span>YAW: {telemetry.yaw}°</span>
          <span className="text-emerald-500/40">|</span>
          <span>PITCH: {telemetry.pitch}°</span>
        </div>
      </div>

      {/* Main HTML5 Canvas (Hardware accelerated 3D Wireframe Globe) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {/* ── 3D PROJECTED INTERACTIVE CATEGORY BADGES AROUND GLOBE ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {GLOBE_CATEGORIES.map((cat) => {
          const pos = nodePositions.find((p) => p.id === cat.id);
          const Icon = cat.icon;
          const isActive = cat.id === activeCategoryId;

          if (!pos || !pos.visible) return null;

          return (
            <div
              key={cat.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-transform duration-75"
              style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                zIndex: isActive ? 25 : pos.z > 0 ? 20 : 10,
                opacity: pos.z < 0 ? Math.max(0.35, 1 + pos.z * 1.5) : 1,
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundFX.playClick();
                  onSelectCategory(cat.id);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border transition-all duration-200 cursor-pointer shadow-lg backdrop-blur-md whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-[#047857] via-[#059669] to-[#10B981] text-white border-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.7)] scale-110 font-bold'
                    : 'bg-[#0A110D]/90 text-emerald-300/90 border-emerald-500/30 hover:border-emerald-400 hover:text-white hover:scale-105 hover:bg-emerald-950/80'
                }`}
                title={`Select ${cat.label}`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
                <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wide">
                  {cat.label}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Center Sphere Core Label HUD */}
      <div className="absolute pointer-events-none z-10 flex flex-col items-center justify-center">
        <div className="px-3.5 py-1 rounded-full bg-[#050807]/90 border border-emerald-400/60 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.5)] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[10px] font-mono font-bold text-emerald-300 tracking-widest uppercase">
            {activeCategory.shortLabel}
          </span>
        </div>
      </div>

      {/* Bottom Floating Telemetry & Drag Hint */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10 text-[10px] font-mono text-emerald-400/70">
        <div className="flex items-center gap-1.5 bg-[#0A110D]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/20">
          <Compass className="w-3.5 h-3.5 text-emerald-400" />
          <span>DRAG TO ROTATE 3D SPHERE</span>
        </div>
        <div className="flex items-center gap-1.5 bg-[#0A110D]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/20">
          <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" />
          <span>INTERACT WITH ANY NODE</span>
        </div>
      </div>
    </div>
  );
}

export default ManualCyberGlobe;

