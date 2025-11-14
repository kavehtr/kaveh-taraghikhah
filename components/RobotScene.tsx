import React, { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  RoundedBox,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";

type JointRef = React.MutableRefObject<THREE.Group | null>;

function useIdleMotion(joints: JointRef[], speed = 1) {
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    const breathe = 0.015 * Math.sin(t * 0.9);
    const headNod = 0.06 * Math.sin(t * 0.6);
    joints[0].current && (joints[0].current.scale.y = 1 + breathe);
    joints[1].current && (joints[1].current.rotation.x = headNod);
    joints[2].current &&
      (joints[2].current.rotation.z = 0.08 * Math.sin(t * 1.2));
    joints[3].current &&
      (joints[3].current.rotation.z = -0.08 * Math.sin(t * 1.2));
  });
}

function RealisticRobot({ scale = 1 }: { scale?: number }) {
  const torsoRef = useRef<THREE.Group | null>(null);
  const headRef = useRef<THREE.Group | null>(null);
  const lShoulderRef = useRef<THREE.Group | null>(null);
  const rShoulderRef = useRef<THREE.Group | null>(null);
  const lHipRef = useRef<THREE.Group | null>(null);
  const rHipRef = useRef<THREE.Group | null>(null);

  useIdleMotion(
    [torsoRef, headRef, lShoulderRef, rShoulderRef, lHipRef, rHipRef],
    1.1
  );

  const mats = useMemo(() => {
    const chassis = {
      metalness: 0.95,
      roughness: 0.18,
      clearcoat: 0.15,
      clearcoatRoughness: 0.05,
    } as Partial<THREE.MeshPhysicalMaterialProperties>;

    const dark = { color: "#0e1a22", ...chassis };
    const mid = { color: "#1b2630", ...chassis };
    const accent = {
      color: "#00E6A8",
      emissive: "#00E6A8",
      emissiveIntensity: 0.9,
      metalness: 0.2,
      roughness: 0.3,
    } as any;

    const glass = {
      color: "#071024",
      metalness: 0.0,
      roughness: 0.05,
      opacity: 0.98,
      transparent: true,
      envMapIntensity: 1.2,
    } as any;

    return { dark, mid, accent, glass };
  }, []);

  return (
    <group scale={[scale, scale, scale]}>
      <group ref={torsoRef}>
        <RoundedBox
          args={[1.4, 1.0, 0.7]}
          radius={0.06}
          smoothness={6}
          position={[0, 0, 0]}
        >
          <meshPhysicalMaterial {...mats.mid} />
        </RoundedBox>
        <group position={[0, 0.05, 0.385]}>
          <RoundedBox args={[0.6, 0.35, 0.02]} radius={0.01} smoothness={4}>
            <meshStandardMaterial {...mats.dark} />
          </RoundedBox>
          <mesh position={[0, -0.03, 0.02]}>
            <boxGeometry args={[0.48, 0.04, 0.01]} />
            <meshStandardMaterial {...mats.accent} />
          </mesh>
        </group>

        <mesh position={[0, 0.55, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.16, 0.18, 24]} />
          <meshPhysicalMaterial {...mats.dark} />
        </mesh>
      </group>

      <group ref={headRef} position={[0, 0.95, 0]}>
        <RoundedBox args={[0.86, 0.44, 0.6]} radius={0.04} smoothness={6}>
          <meshPhysicalMaterial {...mats.dark} />
        </RoundedBox>

        <group position={[0, 0, 0.31]}>
          <mesh>
            <boxGeometry args={[0.62, 0.16, 0.02]} />
            <meshPhysicalMaterial {...mats.glass} />
          </mesh>

          {[-0.18, 0, 0.18].map((x, i) => (
            <mesh key={i} position={[x, 0, 0.033]}>
              <cylinderGeometry args={[0.035, 0.035, 0.02, 24]} />
              <meshStandardMaterial
                color={"#001a12"}
                emissive={i === 1 ? "#00E6A8" : "#00331f"}
                emissiveIntensity={i === 1 ? 0.9 : 0.25}
              />
            </mesh>
          ))}
        </group>
      </group>

      <group position={[-0.95, 0.35, 0]} ref={lShoulderRef}>
        <mesh position={[0, 0, 0]} castShadow>
          <sphereGeometry args={[0.11, 20, 20]} />
          <meshPhysicalMaterial {...mats.mid} />
        </mesh>

        <group position={[0, -0.36, 0]}>
          <RoundedBox args={[0.22, 0.56, 0.2]} radius={0.04} smoothness={4}>
            <meshPhysicalMaterial {...mats.mid} />
          </RoundedBox>

          <mesh position={[0, -0.68, 0]} castShadow>
            <sphereGeometry args={[0.08, 18, 18]} />
            <meshPhysicalMaterial {...mats.dark} />
          </mesh>

          <group position={[0, -0.92, 0]}>
            <RoundedBox args={[0.18, 0.5, 0.18]} radius={0.035} smoothness={4}>
              <meshPhysicalMaterial {...mats.mid} />
            </RoundedBox>

            <group position={[0, -0.34, 0]}>
              <mesh position={[-0.06, 0, 0.06]}>
                <boxGeometry args={[0.12, 0.04, 0.06]} />
                <meshPhysicalMaterial {...mats.dark} />
              </mesh>
              <mesh position={[0.06, 0, 0.06]}>
                <boxGeometry args={[0.12, 0.04, 0.06]} />
                <meshPhysicalMaterial {...mats.dark} />
              </mesh>
            </group>
          </group>
        </group>
      </group>

      <group position={[0.95, 0.35, 0]} ref={rShoulderRef}>
        <mesh position={[0, 0, 0]} castShadow>
          <sphereGeometry args={[0.11, 20, 20]} />
          <meshPhysicalMaterial {...mats.mid} />
        </mesh>

        <group position={[0, -0.36, 0]}>
          <RoundedBox args={[0.22, 0.56, 0.2]} radius={0.04} smoothness={4}>
            <meshPhysicalMaterial {...mats.mid} />
          </RoundedBox>

          <mesh position={[0, -0.68, 0]} castShadow>
            <sphereGeometry args={[0.08, 18, 18]} />
            <meshPhysicalMaterial {...mats.dark} />
          </mesh>

          <group position={[0, -0.92, 0]}>
            <RoundedBox args={[0.18, 0.5, 0.18]} radius={0.035} smoothness={4}>
              <meshPhysicalMaterial {...mats.mid} />
            </RoundedBox>

            <group position={[0, -0.34, 0]}>
              <mesh position={[-0.06, 0, 0.06]}>
                <boxGeometry args={[0.12, 0.04, 0.06]} />
                <meshPhysicalMaterial {...mats.dark} />
              </mesh>
              <mesh position={[0.06, 0, 0.06]}>
                <boxGeometry args={[0.12, 0.04, 0.06]} />
                <meshPhysicalMaterial {...mats.dark} />
              </mesh>
            </group>
          </group>
        </group>
      </group>

      <group position={[-0.34, -1.02, 0]} ref={lHipRef}>
        <mesh position={[0, -0.26, 0]} castShadow>
          <boxGeometry args={[0.28, 0.56, 0.32]} />
          <meshPhysicalMaterial {...mats.mid} />
        </mesh>
        <mesh position={[0, -0.72, 0]} castShadow>
          <boxGeometry args={[0.28, 0.36, 0.36]} />
          <meshPhysicalMaterial {...mats.dark} />
        </mesh>
        <mesh position={[0, -1.08, 0.08]} castShadow>
          <boxGeometry args={[0.36, 0.12, 0.44]} />
          <meshPhysicalMaterial {...mats.dark} />
        </mesh>
      </group>

      <group position={[0.34, -1.02, 0]} ref={rHipRef}>
        <mesh position={[0, -0.26, 0]} castShadow>
          <boxGeometry args={[0.28, 0.56, 0.32]} />
          <meshPhysicalMaterial {...mats.mid} />
        </mesh>
        <mesh position={[0, -0.72, 0]} castShadow>
          <boxGeometry args={[0.28, 0.36, 0.36]} />
          <meshPhysicalMaterial {...mats.dark} />
        </mesh>
        <mesh position={[0, -1.08, 0.08]} castShadow>
          <boxGeometry args={[0.36, 0.12, 0.44]} />
          <meshPhysicalMaterial {...mats.dark} />
        </mesh>
      </group>

      <group position={[0, -0.05, -0.36]}>
        {[-0.36, -0.12, 0.12, 0.36].map((x, i) => (
          <mesh key={i} position={[x, 0, -0.02]}>
            <boxGeometry args={[0.12, 0.04, 0.01]} />
            <meshStandardMaterial color={"#071226"} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function RobotScene(): JSX.Element {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [2.8, 1.6, 4], fov: 35 }}
        shadows
        dpr={[1, 1.75]}
      >
        <Suspense fallback={null}>
          <Environment preset="studio" background={false} />
        </Suspense>

        <ambientLight intensity={0.35} />
        <directionalLight
          castShadow
          intensity={1.1}
          position={[5, 8, 2]}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-left={-5}
          shadow-camera-right={5}
          shadow-camera-top={5}
          shadow-camera-bottom={-5}
        />
        <pointLight position={[-4, 2, -3]} intensity={0.25} />

        <Suspense fallback={null}>
          <RealisticRobot scale={1.05} />
        </Suspense>

        <ContactShadows
          position={[0, -1.6, 0]}
          opacity={0.9}
          width={6}
          height={6}
          blur={2}
          far={1.8}
        />

        <Sparkles count={30} scale={[5, 1, 5]} size={4} />

        <OrbitControls
          target={[0, 0.1, 0]}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minDistance={2.5}
          maxDistance={10}
        />
      </Canvas>
    </div>
  );
}
