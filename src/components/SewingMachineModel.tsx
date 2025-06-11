"use client";

import { useRef, useEffect, memo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

type Props = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
};

type GLTFResult = {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.Material>;
  animations: THREE.AnimationClip[];
};

function SewingMachineModel({ position, rotation, scale }: Props) {
  const ref = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF("/3DModel/sewingMachine2.glb") as unknown as GLTFResult;
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    actions?.["ActioneSuzan"]?.play();
  }, [actions]);

  useFrame(() => {
    if (ref.current) {
      ref.current.position.lerp(new THREE.Vector3(...position), 0.05);

      ref.current.rotation.x += (rotation[0] - ref.current.rotation.x) * 0.1;
      ref.current.rotation.y += (rotation[1] - ref.current.rotation.y) * 0.1;
      ref.current.rotation.z += (rotation[2] - ref.current.rotation.z) * 0.1;
    }
  });

  return (
    <group ref={ref} scale={scale} dispose={null}>
      <group name="Scene">
        <group name="Cube001">
          <mesh
            name="Cube002"
            castShadow
            receiveShadow
            geometry={nodes.Cube002.geometry}
            material={materials['Base Plastic.001']}
          />
          <mesh
            name="Cube002_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube002_1.geometry}
            material={materials['Material.006']}
          />
          <mesh
            name="Cube002_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube002_2.geometry}
            material={materials.Golden}
          />
        </group>
        <mesh
          name="Cylinder"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder.geometry}
          material={materials['Material.010']}
          position={[0.084, 0.051, 0.055]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          name="Cube013"
          castShadow
          receiveShadow
          geometry={nodes.Cube013.geometry}
          material={materials['Base Plastic.001']}
        />
        <mesh
          name="Cube016"
          castShadow
          receiveShadow
          geometry={nodes.Cube016.geometry}
          material={materials.Black}
        />
        <mesh
          name="Cube017"
          castShadow
          receiveShadow
          geometry={nodes.Cube017.geometry}
          material={materials.Black}
        />
        <mesh
          name="Cylinder005"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder005.geometry}
          material={materials['Base Plastic.001']}
          position={[0.161, 0.075, -0.005]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={1.135}
        />
        <group name="Plane" position={[0.134, 0.134, -0.01]} scale={0.467}>
          <mesh
            name="Mesh003"
            castShadow
            receiveShadow
            geometry={nodes.Mesh003.geometry}
            material={materials.Metal}
          />
          <mesh
            name="Mesh003_1"
            castShadow
            receiveShadow
            geometry={nodes.Mesh003_1.geometry}
            material={materials.Plastic}
          />
        </group>
        <group name="Cube008" position={[0.117, 0.127, -0.029]} scale={0.009}>
          <mesh
            name="Mesh004"
            castShadow
            receiveShadow
            geometry={nodes.Mesh004.geometry}
            material={materials['Base Plastic.002']}
          />
          <mesh
            name="Mesh004_1"
            castShadow
            receiveShadow
            geometry={nodes.Mesh004_1.geometry}
            material={materials.Metal}
          />
        </group>
        <mesh
          name="Plane001"
          castShadow
          receiveShadow
          geometry={nodes.Plane001.geometry}
          material={nodes.Plane001.material}
          position={[0.095, -0.102, -0.058]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.758, 0.944, 0.643]}
        />
        <mesh
          name="Cube024"
          castShadow
          receiveShadow
          geometry={nodes.Cube024.geometry}
          material={materials.Metal}
          position={[-0.075, 0.128, -0.028]}
        />
        <mesh
          name="Circle"
          castShadow
          receiveShadow
          geometry={nodes.Circle.geometry}
          material={materials.Metal}
          position={[-0.075, 0.126, -0.046]}
          rotation={[Math.PI / 2, 0, Math.PI]}
        />
        <mesh
          name="Text"
          castShadow
          receiveShadow
          geometry={nodes.Text.geometry}
          material={materials['Material.007']}
          position={[0.063, -0.087, 0.066]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.927, 0.927, 0.756]}
        />
        <group name="Cube025" position={[0, -0.001, 0]}>
          <mesh
            name="Mesh006"
            castShadow
            receiveShadow
            geometry={nodes.Mesh006.geometry}
            material={materials['Material.008']}
          />
          <mesh
            name="Mesh006_1"
            castShadow
            receiveShadow
            geometry={nodes.Mesh006_1.geometry}
            material={materials['Material.009']}
          />
        </group>
        <mesh
          name="Cube026"
          castShadow
          receiveShadow
          geometry={nodes.Cube026.geometry}
          material={materials.Metal}
          position={[0, -0.001, 0]}
        />
        <mesh
          name="Cube027"
          castShadow
          receiveShadow
          geometry={nodes.Cube027.geometry}
          material={materials.Metal}
        />
        <group name="Plane006" position={[0, 0.053, -0.014]}>
          <mesh
            name="Mesh009"
            castShadow
            receiveShadow
            geometry={nodes.Mesh009.geometry}
            material={materials.Metal}
          />
          <mesh
            name="Mesh009_1"
            castShadow
            receiveShadow
            geometry={nodes.Mesh009_1.geometry}
            material={materials['Material.012']}
          />
        </group>
        <mesh
          name="Plane008"
          castShadow
          receiveShadow
          geometry={nodes.Plane008.geometry}
          material={materials.Metal}
        />
        <mesh
          name="Plane009"
          castShadow
          receiveShadow
          geometry={nodes.Plane009.geometry}
          material={materials.Metal}
        />
        <mesh
          name="Cylinder009"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder009.geometry}
          material={materials.Metal}
          position={[-0.102, -0.044, -0.02]}
          rotation={[0, 0, -Math.PI / 2]}
        />
        <mesh
          name="Plane010"
          castShadow
          receiveShadow
          geometry={nodes.Plane010.geometry}
          material={materials.Metal}
          position={[0, 0.001, 0]}
        />
        <mesh
          name="Circle001"
          castShadow
          receiveShadow
          geometry={nodes.Circle001.geometry}
          material={materials.Metal}
          position={[-0.109, -0.038, -0.01]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={0.636}
        />
        <mesh
          name="Plane012"
          castShadow
          receiveShadow
          geometry={nodes.Plane012.geometry}
          material={materials['Black.001']}
        />
        <mesh
          name="Plane013"
          castShadow
          receiveShadow
          geometry={nodes.Plane013.geometry}
          material={materials.Plastic}
          position={[-0.08, 0.007, -0.027]}
          rotation={[1.562, 0.152, -0.024]}
          scale={[0.533, 1.102, 1.102]}
        />
        <mesh
          name="Cylinder010"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder010.geometry}
          material={materials.Metal}
          position={[-0.115, 0.006, -0.001]}
          rotation={[0, 0.737, 0]}>
          <mesh
            name="Cylinder011"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011.geometry}
            material={materials.Plastic}
          />
          <mesh
            name="Plane014"
            castShadow
            receiveShadow
            geometry={nodes.Plane014.geometry}
            material={materials.Metal}
            position={[0.115, -0.006, 0.001]}
          />
        </mesh>
        <mesh
          name="Plane015"
          castShadow
          receiveShadow
          geometry={nodes.Plane015.geometry}
          material={nodes.Plane015.material}
        />
        <mesh
          name="Circle002"
          castShadow
          receiveShadow
          geometry={nodes.Circle002.geometry}
          material={materials.Metal}
        />
        <mesh
          name="Cylinder018"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder018.geometry}
          material={materials.Plastic}
        />
        <mesh
          name="Cylinder019"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder019.geometry}
          material={materials.Metal}
          position={[0.148, 0.144, -0.007]}
        />
        <mesh
          name="Cylinder028"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder028.geometry}
          material={materials.Metal}
          position={[-0.131, 0.085, -0.054]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={3.119}
        />
        <mesh
          name="Cylinder029"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder029.geometry}
          material={materials.Metal}
          position={[-0.162, -0.067, -0.044]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={3.119}
        />
        <mesh
          name="Cylinder030"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder030.geometry}
          material={materials.Metal}
          position={[-0.106, 0.033, -0.056]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={1.225}
        />
        <mesh
          name="Cube046"
          castShadow
          receiveShadow
          geometry={nodes.Cube046.geometry}
          material={materials.Black}
        />
        <mesh
          name="Cylinder031"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder031.geometry}
          material={materials.Metal}
          position={[0.118, 0.031, 0.057]}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          scale={1.71}
        />
        <mesh
          name="Cylinder032"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder032.geometry}
          material={materials['Material.011']}
          position={[-0.086, 0.02, 0.037]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.415}
        />
        <mesh
          name="Curve008"
          castShadow
          receiveShadow
          geometry={nodes.Curve008.geometry}
          material={materials['SVGMat.003']}
          position={[-0.012, 0.098, 0.056]}
          rotation={[1.416, 0, 0.007]}
          scale={2.007}
        />
        <mesh
          name="Curve005"
          castShadow
          receiveShadow
          geometry={nodes.Curve005.geometry}
          material={materials['SVGMat.003']}
          position={[0.137, -0.058, 0.066]}
          rotation={[1.599, -0.001, -0.02]}
          scale={0.619}
        />
        <mesh
          name="Plane002"
          castShadow
          receiveShadow
          geometry={nodes.Plane002.geometry}
          material={nodes.Plane002.material}
          position={[0.157, -0.063, 0.026]}
          rotation={[0, 0, 1.638]}
          scale={[0.06, 0.06, 0.03]}
        />
        <mesh
          name="Plane003"
          castShadow
          receiveShadow
          geometry={nodes.Plane003.geometry}
          material={nodes.Plane003.material}
          position={[0.095, -0.063, -0.04]}
          rotation={[Math.PI, 1.511, -1.503]}
          scale={[0.06, 0.06, 0.03]}
        />
        <mesh
          name="Suzan"
          castShadow
          receiveShadow
          geometry={nodes.Suzan.geometry}
          material={materials.Metal}
          position={[0, 0.068, -0.014]}
        />
      </group>
    </group>
  );
}

export default memo(SewingMachineModel);