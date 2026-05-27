import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../context/useTheme';

/* ── Drifting star field ── */
function StarField({ theme }) {
  const ref = useRef();
  const count = 1200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.006;
      ref.current.rotation.x = state.clock.elapsedTime * 0.003;
    }
  });

  const color = theme === 'dark' ? '#c4b5fd' : '#5eead4';
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color={color} sizeAttenuation transparent opacity={0.55} depthWrite={false} />
    </points>
  );
}

/* ── Aurora ribbon (animated sine-wave mesh) ── */
function AuroraRibbon({ theme, yOffset = 0, phase = 0, speed = 0.3, amplitude = 1.2, colorA, colorB }) {
  const meshRef = useRef();
  const segs = 80;
  const width = 28;

  const { positions, indices, uvs } = useMemo(() => {
    const pos = new Float32Array((segs + 1) * 2 * 3);
    const idx = [];
    const uv  = new Float32Array((segs + 1) * 2 * 2);

    for (let i = 0; i <= segs; i++) {
      const t = i / segs;
      const x = (t - 0.5) * width;
      // top & bottom vertices of the ribbon
      const top    = i * 2;
      const bottom = i * 2 + 1;
      pos[top    * 3]     = x; pos[top    * 3 + 1] = 1.2; pos[top    * 3 + 2] = 0;
      pos[bottom * 3]     = x; pos[bottom * 3 + 1] = -1.2; pos[bottom * 3 + 2] = 0;
      uv[top    * 2]     = t; uv[top    * 2 + 1] = 1;
      uv[bottom * 2]     = t; uv[bottom * 2 + 1] = 0;
    }

    for (let i = 0; i < segs; i++) {
      const a = i * 2, b = a + 1, c = a + 2, d = a + 3;
      idx.push(a, b, c,  b, d, c);
    }

    return {
      positions: pos,
      indices:   new Uint16Array(idx),
      uvs:       uv,
    };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t  = state.clock.elapsedTime * speed + phase;
    const posAttr = meshRef.current.geometry.attributes.position;
    const arr = posAttr.array;

    for (let i = 0; i <= segs; i++) {
      const xFrac = i / segs;
      const wave  = Math.sin(xFrac * Math.PI * 3 + t) * amplitude
                  + Math.sin(xFrac * Math.PI * 1.5 - t * 0.7) * (amplitude * 0.4);
      const top    = i * 2;
      const bottom = i * 2 + 1;
      arr[top    * 3 + 1] = yOffset + wave + 1.0;
      arr[bottom * 3 + 1] = yOffset + wave - 1.0;
      // gentle Z undulation for depth
      const zWave = Math.sin(xFrac * Math.PI * 2 + t * 0.5) * 0.6;
      arr[top    * 3 + 2] = zWave;
      arr[bottom * 3 + 2] = zWave;
    }

    posAttr.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-uv"       count={uvs.length / 2}       array={uvs}       itemSize={2} />
        <bufferAttribute attach="index" count={indices.length} array={indices} itemSize={1} />
      </bufferGeometry>
      <meshBasicMaterial
        color={colorA}
        transparent
        opacity={0.09}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ── Distant glowing bokeh spheres ── */
function BokehSpheres({ theme }) {
  const specs = useMemo(() => [
    { pos: [-10, 4, -14], r: 2.8, speed: 0.12, phase: 0 },
    { pos: [9,  -3, -18], r: 3.5, speed: 0.09, phase: 1.5 },
    { pos: [0,   7, -22], r: 4.5, speed: 0.07, phase: 3.0 },
    { pos: [-6, -6, -16], r: 2.2, speed: 0.15, phase: 4.7 },
    { pos: [12,  5, -20], r: 3.0, speed: 0.10, phase: 2.2 },
  ], []);

  const refs = useRef(specs.map(() => React.createRef()));

  useFrame((state) => {
    refs.current.forEach((r, i) => {
      if (!r.current) return;
      const s = specs[i];
      const t = state.clock.elapsedTime * s.speed + s.phase;
      r.current.position.y = s.pos[1] + Math.sin(t) * 1.5;
      r.current.position.x = s.pos[0] + Math.cos(t * 0.7) * 1.2;
    });
  });

  const color = theme === 'dark' ? '#818cf8' : '#0d9488';
  return (
    <>
      {specs.map((s, i) => (
        <mesh key={i} ref={refs.current[i]} position={s.pos}>
          <sphereGeometry args={[s.r, 12, 12]} />
          <meshBasicMaterial color={color} transparent opacity={0.04} depthWrite={false} />
        </mesh>
      ))}
    </>
  );
}

/* ── Slow-rotating ring lattice (background depth element) ── */
function RingLattice({ theme }) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.025;
      ref.current.rotation.y = state.clock.elapsedTime * 0.04;
    }
  });

  const color = theme === 'dark' ? '#4f46e5' : '#0d9488';
  return (
    <mesh ref={ref} position={[0, 0, -18]}>
      <torusGeometry args={[8, 0.04, 8, 80]} />
      <meshBasicMaterial color={color} transparent opacity={0.08} depthWrite={false} />
    </mesh>
  );
}

/* ── Composed scene ── */
function AuroraScene({ theme }) {
  const darkMode = theme === 'dark';

  const ribbonA = darkMode ? '#818cf8' : '#0d9488';
  const ribbonB = darkMode ? '#c084fc' : '#22d3ee';
  const ribbonC = darkMode ? '#38bdf8' : '#86efac';

  return (
    <>
      {/* Stars always on */}
      <StarField theme={theme} />

      {/* Three layered aurora ribbons at different depths + offsets */}
      <AuroraRibbon
        theme={theme} yOffset={2} phase={0}   speed={0.22} amplitude={1.4}
        colorA={ribbonA} colorB={ribbonB}
      />
      <AuroraRibbon
        theme={theme} yOffset={-1.5} phase={2.1} speed={0.18} amplitude={1.0}
        colorA={ribbonB} colorB={ribbonC}
      />
      <AuroraRibbon
        theme={theme} yOffset={4} phase={4.5} speed={0.14} amplitude={0.8}
        colorA={ribbonC} colorB={ribbonA}
      />

      {/* Distant bokeh glow blobs */}
      <BokehSpheres theme={theme} />

      {/* Subtle rotating ring */}
      <RingLattice theme={theme} />
    </>
  );
}

/* ── Export ── */
export default function AuthBackground() {
  const { theme } = useTheme();

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 65, near: 0.1, far: 200 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <AuroraScene theme={theme} />
      </Canvas>
    </div>
  );
}
