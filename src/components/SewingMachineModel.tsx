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
  const { nodes, materials, animations } = useGLTF("/3DModel/SewingMachine1012ForSite.glb") as unknown as GLTFResult;
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
        <group name="_materials" />
        <group name="Curve_005" position={[0.137, -0.058, 0.066]} rotation={[1.599, -0.001, -0.02]} scale={0.619}>
          <group name="Curve_019" />
          <group name="Curve_019001" />
        </group>
        <group name="Curve_008002" position={[-0.012, 0.098, 0.056]} rotation={[1.416, 0, 0.007]} scale={2.007}>
          <group name="Curve_008" />
          <group name="Curve_008001" />
        </group>
        <group name="Cylinder_010" position={[-0.115, 0.006, -0.001]} rotation={[0, 0.737, 0]}>
          <mesh name="Cylinder_007" geometry={nodes.Cylinder_007.geometry} material={materials['Metal.002']} />
          <mesh name="Cylinder_008" geometry={nodes.Cylinder_008.geometry} material={materials['Plastic.001']} />
          <mesh name="Plane_014" geometry={nodes.Plane_014.geometry} material={materials['Metal.002']} position={[0.115, -0.006, 0.001]} />
        </group>
        <group name="Empty_004" position={[-0.113, -0.043, 0]} scale={0.088} />
        <mesh name="Circle009" geometry={nodes.Circle009.geometry} material={materials['Metal.002']} position={[-0.075, 0.126, -0.046]} rotation={[Math.PI / 2, 0, Math.PI]} />
        <mesh name="Circle_001" geometry={nodes.Circle_001.geometry} material={materials['Metal.002']} position={[-0.109, -0.038, -0.01]} rotation={[0, 0, -Math.PI / 2]} scale={0.636} />
        <mesh name="Circle_002" geometry={nodes.Circle_002.geometry} material={materials['Metal.002']} />
        <mesh name="Cube050" geometry={nodes.Cube050.geometry} material={materials['Metal.002']} />
        <group name="Cube_002">
          <mesh name="Cube_002_1" geometry={nodes.Cube_002_1.geometry} material={materials.Base_Plastic_001} />
          <mesh name="Cube_002_2" geometry={nodes.Cube_002_2.geometry} material={materials.Material_006} />
          <mesh name="Cube_002_3" geometry={nodes.Cube_002_3.geometry} material={materials['Golden.001']} />
        </group>
        <mesh name="Cube_016" geometry={nodes.Cube_016.geometry} material={materials.Base_Plastic_001} />
        <mesh name="Cube_019" geometry={nodes.Cube_019.geometry} material={materials['Black.002']} />
        <mesh name="Cube_020" geometry={nodes.Cube_020.geometry} material={materials['Black.002']} />
        <group name="Cube_021" position={[0.117, 0.127, -0.029]} scale={0.009}>
          <mesh name="Cube_021_1" geometry={nodes.Cube_021_1.geometry} material={materials.Base_Plastic_001} />
          <mesh name="Cube_021_2" geometry={nodes.Cube_021_2.geometry} material={materials['Metal.002']} />
        </group>
        <mesh name="Cube_022" geometry={nodes.Cube_022.geometry} material={nodes.Cube_022.material} position={[0.118, -0.094, -0.065]} scale={[0.012, 0.002, 0.012]} />
        <mesh name="Cube_030" geometry={nodes.Cube_030.geometry} material={materials['Metal.002']} position={[-0.075, 0.128, -0.028]} />
        <group name="Cube_031" position={[0, -0.001, 0]}>
          <mesh name="Cube_031_1" geometry={nodes.Cube_031_1.geometry} material={materials.Material_008} />
          <mesh name="Cube_031_2" geometry={nodes.Cube_031_2.geometry} material={materials.Material_007} />
        </group>
        <mesh name="Cube_032" geometry={nodes.Cube_032.geometry} material={materials['Metal.002']} position={[0, -0.001, 0]} />
        <mesh name="Cube_047" geometry={nodes.Cube_047.geometry} material={materials['Black.002']} />
        <mesh name="Cylinder002" geometry={nodes.Cylinder002.geometry} material={materials.Material_010} position={[0.084, 0.051, 0.055]} rotation={[Math.PI / 2, 0, 0]} />
        <mesh name="Cylinder_003" geometry={nodes.Cylinder_003.geometry} material={materials.Base_Plastic_001} position={[0.161, 0.075, -0.005]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={1.135} />
        <mesh name="Cylinder_006" geometry={nodes.Cylinder_006.geometry} material={materials['Metal.002']} position={[-0.102, -0.044, -0.02]} rotation={[0, 0, -Math.PI / 2]} />
        <mesh name="Cylinder_015" geometry={nodes.Cylinder_015.geometry} material={materials['Plastic.001']} />
        <mesh name="Cylinder_016" geometry={nodes.Cylinder_016.geometry} material={materials['Metal.002']} position={[0.148, 0.144, -0.007]} />
        <mesh name="Cylinder_024" geometry={nodes.Cylinder_024.geometry} material={materials['Metal.002']} position={[-0.131, 0.085, -0.054]} rotation={[-Math.PI / 2, 0, 0]} scale={3.119} />
        <mesh name="Cylinder_025" geometry={nodes.Cylinder_025.geometry} material={materials['Metal.002']} position={[-0.162, -0.067, -0.044]} rotation={[-Math.PI / 2, 0, 0]} scale={3.119} />
        <mesh name="Cylinder_026" geometry={nodes.Cylinder_026.geometry} material={materials['Metal.002']} position={[-0.106, 0.033, -0.056]} rotation={[-Math.PI / 2, 0, 0]} scale={1.225} />
        <mesh name="Cylinder_027" geometry={nodes.Cylinder_027.geometry} material={materials['Metal.002']} position={[0.118, 0.031, 0.057]} rotation={[-Math.PI / 2, 0, -Math.PI]} scale={1.71} />
        <mesh name="Cylinder_029" geometry={nodes.Cylinder_029.geometry} material={materials.Material_009} position={[-0.086, 0.02, 0.037]} rotation={[Math.PI / 2, 0, 0]} scale={0.415} />
        <group name="Plane007" position={[0.134, 0.134, -0.01]} scale={0.467}>
          <mesh name="Plane016" geometry={nodes.Plane016.geometry} material={materials['Metal.002']} />
          <mesh name="Plane016_1" geometry={nodes.Plane016_1.geometry} material={materials['Plastic.001']} />
        </group>
        <mesh name="Plane_001" geometry={nodes.Plane_001.geometry} material={nodes.Plane_001.material} position={[0.095, -0.102, -0.058]} rotation={[Math.PI / 2, 0, 0]} scale={[1.758, 0.944, 0.643]} />
        <mesh name="Plane_004" geometry={nodes.Plane_004.geometry} material={materials['Metal.002']} position={[0, 0.067, -0.014]} />
        <group name="Plane_006" position={[0, 0.053, -0.014]}>
          <mesh name="Plane_006_1" geometry={nodes.Plane_006_1.geometry} material={materials['Metal.002']} />
          <mesh name="Plane_006_2" geometry={nodes.Plane_006_2.geometry} material={materials.Material_012} />
        </group>
        <mesh name="Plane_008" geometry={nodes.Plane_008.geometry} material={materials['Metal.002']} />
        <mesh name="Plane_009" geometry={nodes.Plane_009.geometry} material={materials['Metal.002']} />
        <mesh name="Plane_010" geometry={nodes.Plane_010.geometry} material={materials['Metal.002']} position={[0, 0.001, 0]} />
        <mesh name="Plane_012" geometry={nodes.Plane_012.geometry} material={materials.Black_001} />
        <mesh name="Plane_013" geometry={nodes.Plane_013.geometry} material={materials['Plastic.001']} position={[-0.08, 0.007, -0.027]} rotation={[1.562, 0.152, -0.024]} scale={[0.533, 1.102, 1.102]} />
        <mesh name="Plane_015" geometry={nodes.Plane_015.geometry} material={nodes.Plane_015.material} />
      </group>
    </group>
  );
}

export default memo(SewingMachineModel);