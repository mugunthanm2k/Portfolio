import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Soft round glow sprite (avoids square points)
function makeGlowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.25, 'rgba(255,255,255,0.55)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

// One tilted orbit ring with a glowing satellite travelling along it
function OrbitRing({ radius, tilt, color, speed, opacity, reduced, phase = 0 }) {
  const spin = useRef();
  const sat = useRef();
  useFrame((_, delta) => {
    if (reduced) return;
    if (spin.current) spin.current.rotation.z += delta * speed;
    if (sat.current) sat.current.rotation.z += delta * speed * 2.2;
  });

  return (
    <group rotation={tilt}>
      <group ref={spin} rotation={[0, 0, phase]}>
        <mesh>
          <torusGeometry args={[radius, 0.014, 12, 180]} />
          <meshBasicMaterial color={color} transparent opacity={opacity} />
        </mesh>
        {/* faint thicker halo for depth */}
        <mesh>
          <torusGeometry args={[radius, 0.05, 12, 180]} />
          <meshBasicMaterial color={color} transparent opacity={opacity * 0.12} depthWrite={false} />
        </mesh>
      </group>
      <group ref={sat} rotation={[0, 0, phase * 2]}>
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[0.1, 20, 20]} />
          <meshBasicMaterial color={color} />
        </mesh>
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[0.24, 20, 20]} />
          <meshBasicMaterial color={color} transparent opacity={0.18} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}

function Rig({ reduced, children }) {
  const group = useRef();
  const intro = useRef(0);
  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    // smooth scale-in
    intro.current = Math.min(1, intro.current + delta * 0.9);
    const e = 1 - Math.pow(1 - intro.current, 3);
    g.scale.setScalar(0.6 + 0.4 * e);
    if (reduced) return;
    // damped pointer parallax + slow breathing
    const t = state.clock.elapsedTime;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, state.pointer.x * 0.4, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -state.pointer.y * 0.3 + Math.sin(t * 0.5) * 0.04, 3, delta);
  });
  return <group ref={group}>{children}</group>;
}

function Particles({ count, reduced, texture }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.0 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.8;
      arr[i * 3 + 2] = r * Math.cos(phi) - 1;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current && !reduced) ref.current.rotation.y += delta * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        map={texture}
        color="#93c5fd"
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroScene({ isMobile, reduced, onLost }) {
  const texture = useMemo(makeGlowTexture, []);
  return (
    <Canvas
      onCreated={({ gl }) => gl.domElement.addEventListener('webglcontextlost', (e) => { e.preventDefault(); onLost?.(); })}
      dpr={isMobile ? 1 : [1, 1.75]}
      frameloop={reduced ? 'demand' : 'always'}
      camera={{ position: [0, 0, 8.5], fov: 45 }}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: 'low-power' }}
      aria-hidden="true"
    >
      <Rig reduced={reduced}>
        <OrbitRing radius={2.3} tilt={[Math.PI / 2.3, 0.1, 0]} color="#3b82f6" speed={0.12} opacity={0.9} reduced={reduced} />
        <OrbitRing radius={2.65} tilt={[Math.PI / 2.9, 0.65, 0.3]} color="#8b5cf6" speed={-0.09} opacity={0.65} phase={2} reduced={reduced} />
        <OrbitRing radius={3.0} tilt={[Math.PI / 3.6, -0.7, 0.1]} color="#22d3ee" speed={0.07} opacity={0.45} phase={4} reduced={reduced} />
        <Particles count={isMobile ? 40 : 160} reduced={reduced} texture={texture} />
      </Rig>
    </Canvas>
  );
}
