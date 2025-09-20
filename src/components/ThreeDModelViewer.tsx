"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

export default function ModelViewer() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [materialRef, setMaterialRef] = useState<THREE.MeshStandardMaterial | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0000);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 10, 7.5);
    scene.add(dirLight);

    // Controls (rotation only)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 3;

    // Helper: fit camera to object
    function fitCameraToObject(
      camera: THREE.PerspectiveCamera,
      object: THREE.Object3D,
      offset = 1.25
    ) {
      const box = new THREE.Box3().setFromObject(object);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 120);
      let cameraZ = Math.abs(maxDim / Math.tan(fov / 2));

      cameraZ *= offset;
      camera.position.set(center.x, center.y, cameraZ);

      camera.near = cameraZ / 100;
      camera.far = cameraZ * 100;
      camera.updateProjectionMatrix();

      controls.target.copy(center);
      controls.update();
    }

    // Load GLB with Draco support
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      "https://unpkg.com/three@0.165.0/examples/jsm/libs/draco/"
    );

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      "/models/sewingMachine2.glb",
      (gltf) => {
        const model = gltf.scene;

        // Center model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        // Find material by name
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const mat = mesh.material as THREE.MeshStandardMaterial;
            if (mat.name === "Base Plastic.001") {
              setMaterialRef(mat); // store reference to update later
            }
          }
        });

        scene.add(model);
        fitCameraToObject(camera, model, 1.5);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.error("Error loading model:", error);
      }
    );

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  // Handlers for color change
  const changeColor = (color: string) => {
    if (materialRef) {
      materialRef.color.set(color);
    }
  };

  return (
    <div 
    className="bg-black h-screen"
    style={{ textAlign: "center" }}>
      <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />
      <div 
      className="flex justify-center gap-4 -mt-40 bg-red-500">
        <button className="bg-[#c7c7c7] w-7 h-7 rounded-full cursor-pointer " onClick={() => changeColor("#c7c7c7")}></button>
        <button className="bg-[#ffffff] w-7 h-7 rounded-full cursor-pointer " onClick={() => changeColor("#ffffff")}></button>
      </div>
    </div>
  );
}
