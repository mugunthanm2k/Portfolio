import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, OrbitControls, QuadraticBezierLine, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { ReactIcon, AngularIcon, Html5Icon, SpringIcon, MySqlMark } from '../common/TechIcons';

const BLUE = '#3b82f6';
const VIOLET = '#8b5cf6';
const CYAN = '#22d3ee';

/* ---------- DOM labels ---------- */
const pillStyle = {
  whiteSpace: 'nowrap',
  padding: '6px 16px',
  borderRadius: 999,
  fontSize: 14,
  fontWeight: 500,
  fontFamily: 'Inter, sans-serif',
  color: '#e8ecf8',
  background: 'rgba(8,14,36,0.85)',
  border: '1px solid rgba(96,165,250,0.45)',
  boxShadow: '0 0 18px rgba(59,130,246,0.25)',
};
const cardStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '10px 16px',
  borderRadius: 18,
  background: 'rgba(8,14,36,0.7)',
  border: '1px solid rgba(96,165,250,0.22)',
  backdropFilter: 'blur(6px)',
};

function Pill({ children }) {
  return <span style={pillStyle}>{children}</span>;
}

/* ---------- Animated dashed connector with optional travelling dot ---------- */
function Link({ start, end, mid, color = '#60a5fa', dot = false, reduced }) {
  const line = useRef();
  const dotRef = useRef();
  const curve = useMemo(
    () => new THREE.QuadraticBezierCurve3(new THREE.Vector3(...start), new THREE.Vector3(...mid), new THREE.Vector3(...end)),
    [start, mid, end]
  );

  useFrame((state) => {
    if (reduced) return;
    if (line.current?.material) line.current.material.dashOffset -= 0.02;
    if (dotRef.current) {
      const t = (state.clock.elapsedTime * 0.18) % 1;
      dotRef.current.position.copy(curve.getPoint(t));
    }
  });

  return (
    <>
      <QuadraticBezierLine ref={line} start={start} end={end} mid={mid} color={color} lineWidth={1.6} dashed dashScale={14} gapSize={0.5} transparent opacity={0.85} />
      {dot && (
        <group ref={dotRef} position={start}>
          <mesh>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshBasicMaterial color="#60a5fa" />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshBasicMaterial color="#3b82f6" transparent opacity={0.25} depthWrite={false} />
          </mesh>
        </group>
      )}
    </>
  );
}

/* ---------- Glowing platform ---------- */
function Platform({ reduced }) {
  const ring = useRef();
  useFrame((_, d) => {
    if (ring.current && !reduced) ring.current.rotation.z += d * 0.25;
  });
  return (
    <group position={[0, -1.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh>
        <circleGeometry args={[3.3, 64]} />
        <meshBasicMaterial color="#0b1a44" transparent opacity={0.55} />
      </mesh>
      <mesh position={[0, 0, 0.005]}>
        <circleGeometry args={[3.3, 64]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.08} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={ring} position={[0, 0, 0.01]}>
        <ringGeometry args={[2.55, 2.62, 96]} />
        <meshBasicMaterial color={BLUE} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, 0.012]}>
        <ringGeometry args={[2.62, 2.78, 96]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.18} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh position={[0, 0, 0.014]}>
        <ringGeometry args={[3.0, 3.03, 96]} />
        <meshBasicMaterial color={VIOLET} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/* ---------- Laptop ---------- */
const codeLines = [
  [0.0, 1.5, '#38bdf8'], [0.35, 1.0, '#a78bfa'], [0.35, 1.7, '#38bdf8'], [0.0, 1.2, '#f472b6'],
  [0.35, 2.0, '#22d3ee'], [0.7, 1.1, '#a78bfa'], [0.35, 1.6, '#60a5fa'], [0.0, 0.9, '#f59e0b'], [0.35, 1.4, '#38bdf8'],
];

function Laptop() {
  return (
    <group position={[0, -1.34, 0.1]} rotation={[0, -0.28, 0]} scale={1.15}>
      {/* base */}
      <mesh>
        <boxGeometry args={[3.2, 0.1, 2.1]} />
        <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.055, 0.15]}>
        <boxGeometry args={[2.9, 0.01, 1.2]} />
        <meshStandardMaterial color="#0f172a" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.06, 0.82]}>
        <boxGeometry args={[1.1, 0.01, 0.55]} />
        <meshStandardMaterial color="#475569" roughness={0.4} />
      </mesh>
      {/* screen */}
      <group position={[0, 0.05, -1.0]} rotation={[-0.2, 0, 0]}>
        <mesh position={[0, 1.0, 0]}>
          <boxGeometry args={[3.2, 2.05, 0.08]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.0, 0.045]}>
          <planeGeometry args={[3.04, 1.9]} />
          <meshBasicMaterial color="#070d22" />
        </mesh>
        {/* sidebar */}
        <mesh position={[-1.28, 1.0, 0.05]}>
          <planeGeometry args={[0.42, 1.9]} />
          <meshBasicMaterial color="#0d1633" />
        </mesh>
        {/* window dots */}
        {['#ef4444', '#f59e0b', '#22c55e'].map((c, i) => (
          <mesh key={c} position={[-1.38 + i * 0.1, 1.86, 0.052]}>
            <circleGeometry args={[0.028, 12]} />
            <meshBasicMaterial color={c} />
          </mesh>
        ))}
        {/* code lines */}
        {codeLines.map(([indent, w, c], i) => (
          <mesh key={i} position={[-0.95 + indent + w * 0.28, 1.55 - i * 0.17, 0.052]}>
            <planeGeometry args={[w * 0.56, 0.05]} />
            <meshBasicMaterial color={c} />
          </mesh>
        ))}
        <pointLight position={[0, 1, 1.2]} intensity={6} color={BLUE} distance={5} />
      </group>
    </group>
  );
}

/* ---------- Database ---------- */
function DatabaseStack() {
  return (
    <Float speed={1.8} floatIntensity={0.5} rotationIntensity={0}>
      <group position={[-3.0, -0.35, 0.3]}>
        {[0, 0.4, 0.8].map((y) => (
          <group key={y} position={[0, y, 0]}>
            <mesh>
              <cylinderGeometry args={[0.62, 0.62, 0.3, 40]} />
              <meshStandardMaterial color="#2563eb" metalness={0.6} roughness={0.25} emissive="#1d4ed8" emissiveIntensity={0.35} />
            </mesh>
            <mesh position={[0, 0.155, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.6, 0.64, 40]} />
              <meshBasicMaterial color="#93c5fd" />
            </mesh>
          </group>
        ))}
        <mesh position={[0, 0.96, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.6, 40]} />
          <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={0.5} />
        </mesh>
        <Html center distanceFactor={10} position={[0, -0.55, 0.3]} style={{ pointerEvents: 'none' }}>
          <Pill>
            <MySqlMark />
          </Pill>
        </Html>
      </group>
    </Float>
  );
}

/* ---------- Cloud ---------- */
function CloudDeploy({ reduced }) {
  const arrow = useRef();
  useFrame((state) => {
    if (arrow.current && !reduced) arrow.current.position.y = -0.05 + Math.sin(state.clock.elapsedTime * 2) * 0.07;
  });
  return (
    <Float speed={1.4} floatIntensity={0.7} rotationIntensity={0}>
      <group position={[3.0, 0.7, 0.2]}>
        {[
          [-0.55, -0.1, 0.42],
          [-0.05, 0.12, 0.62],
          [0.5, -0.02, 0.5],
          [0.95, -0.15, 0.32],
        ].map(([x, y, r], i) => (
          <mesh key={i} position={[x - 0.2, y, 0]}>
            <sphereGeometry args={[r, 28, 28]} />
            <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={0.45} roughness={0.35} />
          </mesh>
        ))}
        <mesh position={[0.15, -0.3, 0]} scale={[1.9, 0.5, 0.9]}>
          <sphereGeometry args={[0.7, 28, 28]} />
          <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={0.45} roughness={0.35} />
        </mesh>
        <group ref={arrow} position={[0.1, -0.05, 0.62]}>
          <mesh position={[0, -0.12, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.42, 16]} />
            <meshStandardMaterial color="#ffffff" emissive="#bfdbfe" emissiveIntensity={0.7} />
          </mesh>
          <mesh position={[0, 0.22, 0]}>
            <coneGeometry args={[0.24, 0.34, 20]} />
            <meshStandardMaterial color="#ffffff" emissive="#bfdbfe" emissiveIntensity={0.7} />
          </mesh>
        </group>
        <Html center distanceFactor={10} position={[0.2, -1.15, 0.3]} style={{ pointerEvents: 'none' }}>
          <Pill>Deploy on Cloud</Pill>
        </Html>
      </group>
    </Float>
  );
}

/* ---------- Frontend / Backend badges ---------- */
function Frontend() {
  return (
    <Float speed={1.6} floatIntensity={0.4} rotationIntensity={0}>
      <Html center distanceFactor={10} position={[-2.5, 2.55, 0]} style={{ pointerEvents: 'none' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Pill>Frontend</Pill>
          <div style={cardStyle}>
            <ReactIcon size={38} />
            <AngularIcon size={36} />
            <Html5Icon size={36} />
          </div>
        </div>
      </Html>
    </Float>
  );
}

function Backend() {
  return (
    <Float speed={1.6} floatIntensity={0.4} rotationIntensity={0}>
      <Html center distanceFactor={10} position={[2.3, 2.6, 0]} style={{ pointerEvents: 'none' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Pill>Backend</Pill>
          <div style={cardStyle}>
            <SpringIcon size={38} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 17, lineHeight: 1, color: '#86efac' }}>
              spring<br />boot
            </span>
          </div>
        </div>
      </Html>
    </Float>
  );
}

/* ---------- Scene ---------- */
export default function WorkspaceScene({ reduced, onLost }) {
  return (
    <Canvas
      onCreated={({ gl }) => gl.domElement.addEventListener('webglcontextlost', (e) => { e.preventDefault(); onLost?.(); })}
      dpr={[1, 1.75]}
      camera={{ position: [0, 1.2, 10.5], fov: 40 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      frameloop={reduced ? 'demand' : 'always'}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[4, 5, 5]} intensity={60} color={VIOLET} />
      <pointLight position={[-5, 2, 4]} intensity={45} color={CYAN} />
      <pointLight position={[0, -1, 3]} intensity={25} color={BLUE} />

      {!reduced && <Sparkles count={70} scale={[11, 6, 5]} size={2.4} speed={0.3} color="#93c5fd" />}

      <Platform reduced={reduced} />
      <Laptop />
      <DatabaseStack />
      <CloudDeploy reduced={reduced} />
      <Frontend />
      <Backend />

      {/* connections */}
      <Link start={[-1.6, 2.35, 0]} end={[1.5, 2.35, 0]} mid={[0, 3.7, 0]} dot reduced={reduced} />
      <Link start={[2.4, 1.75, 0]} end={[0.9, 0.85, 0.2]} mid={[2.4, 0.95, 0]} reduced={reduced} />
      <Link start={[-2.45, -0.1, 0.3]} end={[-1.5, -0.2, 0.3]} mid={[-2.0, 0.45, 0.3]} reduced={reduced} />
      <Link start={[1.9, -0.3, 0.4]} end={[2.8, 0.15, 0.3]} mid={[2.5, -0.6, 0.3]} reduced={reduced} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 1.85}
        minAzimuthAngle={-0.7}
        maxAzimuthAngle={0.7}
        enableDamping
        dampingFactor={0.08}
      />
    </Canvas>
  );
}
