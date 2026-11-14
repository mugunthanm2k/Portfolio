import { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Line, Billboard, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { skillCategories } from '../../data/skills';
import { makeGlowTexture } from '../../utils/glow';

const R = 3.1;

function Core({ reduced, glow }) {
  const inner = useRef();
  const mid = useRef();
  const outer = useRef();
  useFrame((state, d) => {
    if (reduced) return;
    outer.current.rotation.y += d * 0.14;
    outer.current.rotation.x += d * 0.06;
    mid.current.rotation.y -= d * 0.22;
    mid.current.rotation.z += d * 0.08;
    inner.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 1.6) * 0.05);
  });
  return (
    <group>
      <mesh ref={inner}>
        <sphereGeometry args={[0.7, 48, 48]} />
        <meshStandardMaterial color="#1d4ed8" emissive="#3b82f6" emissiveIntensity={1.1} roughness={0.2} metalness={0.3} />
      </mesh>
      <sprite scale={[4, 4, 1]}>
        <spriteMaterial map={glow} color="#3b82f6" transparent opacity={0.6} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      <mesh ref={mid}>
        <icosahedronGeometry args={[1.08, 1]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.5} />
      </mesh>
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial color="#60a5fa" wireframe transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

function Node({ cat, angle, selected, onSelect, pause, glow }) {
  const [hover, setHover] = useState(false);
  const body = useRef();
  const x = Math.cos(angle) * R;
  const z = Math.sin(angle) * R;
  const points = useMemo(() => [new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, 0, z)], [x, z]);

  useFrame((_, d) => {
    const target = selected ? 1.5 : hover ? 1.28 : 1;
    const s = THREE.MathUtils.damp(body.current.scale.x, target, 7, d);
    body.current.scale.setScalar(s);
  });

  useEffect(() => () => { document.body.style.cursor = ''; }, []);

  return (
    <>
      <Line points={points} color={cat.color} transparent opacity={selected ? 0.85 : 0.22} lineWidth={selected ? 1.8 : 1} />
      <group position={[x, 0, z]}>
        <group ref={body}>
          <mesh
            onClick={(e) => { e.stopPropagation(); onSelect(cat.id); }}
            onPointerOver={(e) => { e.stopPropagation(); setHover(true); pause.current = true; document.body.style.cursor = 'pointer'; }}
            onPointerOut={() => { setHover(false); pause.current = false; document.body.style.cursor = ''; }}
          >
            <sphereGeometry args={[0.34, 40, 40]} />
            <meshPhysicalMaterial color={cat.color} emissive={cat.color} emissiveIntensity={selected ? 0.9 : 0.4} roughness={0.15} metalness={0.2} clearcoat={1} clearcoatRoughness={0.1} />
          </mesh>
          <sprite scale={[2, 2, 1]}>
            <spriteMaterial map={glow} color={cat.color} transparent opacity={selected ? 0.95 : 0.45} depthWrite={false} blending={THREE.AdditiveBlending} />
          </sprite>
          {selected && (
            <Billboard>
              <mesh>
                <ringGeometry args={[0.5, 0.53, 64]} />
                <meshBasicMaterial color={cat.color} side={THREE.DoubleSide} />
              </mesh>
            </Billboard>
          )}
        </group>
        <Html center position={[0, -0.72, 0]} zIndexRange={[10, 0]} style={{ pointerEvents: 'none' }}>
          <span
            style={{
              whiteSpace: 'nowrap',
              padding: '3px 10px',
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 500,
              fontFamily: 'Inter, sans-serif',
              color: '#e8ecf8',
              background: 'rgba(5,8,22,0.8)',
              border: `1px solid ${selected ? cat.color : 'rgba(148,163,184,0.3)'}`,
              boxShadow: selected ? `0 0 14px ${cat.color}66` : 'none',
            }}
          >
            {cat.title}
          </span>
        </Html>
      </group>
    </>
  );
}

function Scene({ selectedId, onSelect, reduced }) {
  const rig = useRef();
  const spin = useRef();
  const pause = useRef(false);
  const glow = useMemo(makeGlowTexture, []);
  const n = skillCategories.length;

  useFrame((state, d) => {
    if (!reduced && !pause.current) spin.current.rotation.y += d * 0.16;
    if (reduced) return;
    rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, 0.3 - state.pointer.y * 0.18, 3, d);
    rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, state.pointer.x * 0.3, 3, d);
  });

  return (
    <group ref={rig} rotation={[0.3, 0, 0.06]}>
      <Core reduced={reduced} glow={glow} />
      {/* orbit rails */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[R, 0.012, 8, 200]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0.5, 0]}>
        <torusGeometry args={[R + 0.7, 0.008, 8, 200]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.22} />
      </mesh>
      <group ref={spin}>
        {skillCategories.map((cat, i) => (
          <Node key={cat.id} cat={cat} angle={(i / n) * Math.PI * 2} selected={selectedId === cat.id} onSelect={onSelect} pause={pause} glow={glow} />
        ))}
      </group>
    </group>
  );
}

export default function TechOrbit({ selectedId, onSelect, reduced, onLost }) {
  return (
    <Canvas
      onCreated={({ gl }) => gl.domElement.addEventListener('webglcontextlost', (e) => { e.preventDefault(); onLost?.(); })}
      dpr={[1, 1.75]}
      camera={{ position: [0, 1.4, 9.8], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      frameloop={reduced ? 'demand' : 'always'}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[5, 5, 5]} intensity={55} color="#8b5cf6" />
      <pointLight position={[-5, -2, 4]} intensity={40} color="#22d3ee" />
      {!reduced && <Sparkles count={60} scale={[11, 6, 8]} size={2.2} speed={0.25} color="#93c5fd" />}
      <Scene selectedId={selectedId} onSelect={onSelect} reduced={reduced} />
    </Canvas>
  );
}
