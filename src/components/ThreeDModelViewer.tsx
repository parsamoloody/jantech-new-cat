"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { MdOutline3dRotation } from "react-icons/md";

interface ModelViewerProps {
  title: string;
  selectOptions: {
    beforeSelect: string;
    afterSelectColor: string;
  };
  options: {
    color: {
      controlsHex: string[];
      bodiesHex: string[];
    },
     metaTitle: {
    controls: {
      name: string;
      colorsName: string[];
    };
    body: {
      name: string;
      colorsName: string[];
    };
  };
  };
 
}

export default function ModelViewer({ prop }: { prop: ModelViewerProps }) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [materialRef, setMaterialRef] = useState<THREE.MeshStandardMaterial | null>(null);
  const [controlsRef, setControlsRef] = useState<THREE.MeshStandardMaterial[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeColor, setActiveColor] = useState<string>("");
  const [activeColorName, setActiveColorName] = useState<string>("");
  const [modelSize, setModelSize] = useState<number>(115);

  const [activeTab, setActiveTab] = useState<"body" | "controls">("body");

  useEffect(() => {
    const handleResize = () => {
      setModelSize(window.innerWidth < 768 ? 200 : 115);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 10, 7.5);
    scene.add(dirLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI;

    function fitCameraToObject(
      camera: THREE.PerspectiveCamera,
      object: THREE.Object3D,
      offset = 1.25
    ) {
      const box = new THREE.Box3().setFromObject(object);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / modelSize);
      let cameraZ = Math.abs(maxDim / Math.tan(fov / 2));

      cameraZ *= offset;
      camera.position.set(center.x, center.y, cameraZ);

      camera.near = cameraZ / 100;
      camera.far = cameraZ * 100;
      camera.updateProjectionMatrix();

      controls.target.copy(center);
      controls.update();
    }

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

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const mat = mesh.material as THREE.MeshStandardMaterial;
            if (mat.name === "Base Plastic.001") {
              setMaterialRef(mat);
            }
            if (
              mat.name === "Material.010" ||
              mat.name === "Material.011" ||
              mat.name === "Material.012"
            ) {
              setControlsRef((prev) => [...(prev ?? []), mat]);
            }
          }
        });

        scene.add(model);
        fitCameraToObject(camera, model, 1.5);
        setLoading(false);
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
        setLoading(false);
      }
    );

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

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
  }, [modelSize]);

  // 🔹 Change body color
  const changeColor = (color: string, name: string) => {
    if (materialRef) {
      materialRef.color.set(color);
      setActiveColor(color);
      setActiveColorName(name);
    }
  };

  // 🔹 Change controls color
  const changeControlsColor = (color: string, name: string) => {
    if (controlsRef) {
      controlsRef.forEach((mat) => mat.color.set(color));
      setActiveColor(color);
      setActiveColorName(name);
    }
  };

  return (
    <div className="bg-black h-screen relative flex flex-col items-center justify-center">

      <h2 className="absolute top-36 text-white text-lg text-center sm:text-2xl xl:text-3xl font-semibold">
        {prop.title}
      </h2>
      {/* Canvas */}
      <div className="w-full px-10 flex justify-center items-center">
        <div ref={mountRef} style={{ height: "100vh" }}
      className=" w-full"
       />
      </div>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black text-white text-4xl">
          <MdOutline3dRotation className="animate-pulse" size={48} />
        </div>
      )}

      {/* Tabs */}
      <div className="absolute bottom-10 flex flex-col items-center gap-y-4">
        <p className="text-white text-xl xl:text-2xl 2xl:text-3xl">
          {activeColorName ? `${prop.selectOptions.afterSelectColor}: ${activeColorName}` : ""}
        </p>

        <div className="flex flex-col lg:flex-row items-center gap-5">
          {/* Tab Switcher */}
          <div className="border border-slate-600 bg-[#1c1c1c] p-3 h-14 rounded-full flex items-center justify-center gap-2.5">
            <button
              className={`px-2 py-1 lg:px-3 lg:py-2 cursor-pointer rounded-full ${
                activeTab === "body"
                  ? "bg-sky-500 text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
              onClick={() => setActiveTab("body")}
            >
              {prop.options.metaTitle.body.name}
            </button>
            <button
              className={`px-2 py-1 lg:px-3 lg:py-2 cursor-pointer rounded-full ${
                activeTab === "controls"
                  ? "bg-sky-500 text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
              onClick={() => setActiveTab("controls")}
            >
              {prop.options.metaTitle.controls.name}
            </button>
          </div>

          {/* Tab Content */}
          <div className="transition-all duration-500">
            {activeTab === "body" && (
              <div className="border border-slate-600 bg-[#1c1c1c] p-3 h-14 rounded-full flex items-center justify-center gap-2.5">
                {prop.options.color.bodiesHex.map((color, i) => (
                  <button
                    key={color}
                    className="w-7 h-7 rounded-full cursor-pointer"
                    style={{
                      backgroundColor: color,
                      outline:
                        activeColor === color ? "2px solid skyblue" : "none",
                    }}
                    onClick={() =>
                      changeColor(color, prop.options.metaTitle.body.colorsName[i])
                    }
                  ></button>
                ))}
              </div>
            )}

            {activeTab === "controls" && (
              <div className="border border-slate-600 bg-[#1c1c1c] p-3 rounded-full flex items-center justify-center gap-2.5">
                {prop.options.color.controlsHex.map((color, i) => (
                  <button
                    key={color}
                    className="w-7 h-7 rounded-full cursor-pointer"
                    style={{
                      backgroundColor: color,
                      outline:
                        activeColor === color ? "2px solid skyblue" : "none",
                    }}
                    onClick={() =>
                      changeControlsColor(color, prop.options.metaTitle.controls.colorsName[i])
                    }
                  ></button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
