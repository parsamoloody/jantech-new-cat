"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { MdOutline3dRotation } from "react-icons/md";
import ModelViewerProps from "@/types/three";

export default function ModelViewer({ prop }: { prop: ModelViewerProps }) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  // refs for three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const [bodyMaterial, setBodyMaterial] = useState<THREE.MeshStandardMaterial | null>(null);
  const [controlsMaterials, setControlsMaterials] = useState<THREE.MeshStandardMaterial[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeColor, setActiveColor] = useState<string>("");
  const [activeColorName, setActiveColorName] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"body" | "controls">("body");
  const [modelSize, setModelSize] = useState<number>(115);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;

    const renderer: any = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.outputEncoding = (THREE as any).sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.2;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    new RGBELoader().load("/images/hdri/outdoor_chapel_1k.hdr", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
    });

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
    hemiLight.position.set(0, 0, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 5);
    dirLight.position.set(5, 10, 7.5);
    scene.add(dirLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI;
    controlsRef.current = controls;

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      "https://unpkg.com/three@0.165.0/examples/jsm/libs/draco/"
    );
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      "/models/SweingMachineForArbabParsasSite.glb",
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const mat = mesh.material as THREE.MeshStandardMaterial;

            if (mesh.geometry.attributes.uv2) {
              mesh.geometry.setAttribute("uv", mesh.geometry.attributes.uv2.clone());
            }

            if (mat.name === "Base_Plastic_001_001.002") {
              setBodyMaterial(mat);
            }
            if (mat.name === "BilBilaks") {
              setControlsMaterials((prev) => [...prev, mat]);
            }
          }
        });

        scene.add(model);
        fitCameraToObject(camera, controls, model, 1.5);
        setLoading(false);
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
        setLoading(false);
      }
    );

    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      const camera = cameraRef.current;
      const renderer = rendererRef.current;

      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setModelSize(window.innerWidth < 768 ? 200 : 115);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  function fitCameraToObject(
    camera: THREE.PerspectiveCamera,
    controls: OrbitControls,
    object: THREE.Object3D,
    offset = 1.25
  ) {
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / modelSize);
    let cameraZ = Math.abs(maxDim / Math.tan(fov / 3));
    cameraZ *= offset;

    camera.position.set(center.x, center.y, cameraZ);
    camera.near = cameraZ / 100;
    camera.far = cameraZ * 100;
    camera.updateProjectionMatrix();

    controls.target.copy(center);
    controls.update();
  }

  // color change handlers
  const changeColor = (color: string, name: string) => {
    if (bodyMaterial) {
      bodyMaterial.color.set(color);
      setActiveColor(color);
      setActiveColorName(name);
    }
  };

  const changeControlsTexture = (imageUrl: string, color: string, name: string) => {
    if (controlsMaterials.length) {
      controlsMaterials.forEach((mat) => {
        ["map", "roughnessMap", "metalnessMap"].forEach((key) => {
          if ((mat as any)[key]) {
            (mat as any)[key].dispose();
            (mat as any)[key] = null;
          }
        });

        const loader = new THREE.TextureLoader();
        const texture = loader.load(imageUrl);

        mat.map = texture;
        mat.color.set(color);
        mat.roughness = 0.2;
        mat.metalness = 1;
        mat.needsUpdate = true;
      });

      setActiveColor(imageUrl);
      setActiveColorName(name);
    }
  };

  return (
    <div className="bg-black h-screen overflow-hidden relative flex flex-col items-center justify-center *:m-0">
      <h2 className="absolute top-32 font-bold text-white text-lg text-center sm:text-2xl xl:text-3xl">
        {prop.title}
      </h2>

      {/* Canvas */}
      <div className="w-full px-10 flex justify-center items-center">
        <div ref={mountRef} style={{ height: "100vh" }} className="w-full h-screen" />
      </div>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black text-white text-4xl">
          <MdOutline3dRotation className="animate-pulse" size={48} />
        </div>
      )}

      {/* Tabs */}
      <div className="absolute bottom-10 flex flex-col items-center gap-y-4">
        <p className="text-white text-lg xl:text-xl 2xl:text-xl">
          {activeColorName ? `${prop.selectOptions.afterSelectColor}: ${activeColorName}` : ""}
        </p>

        <div className="flex flex-col lg:flex-row items-center gap-5">
          {/* Tab Switcher */}
          <div className="border border-slate-600 bg-[#1c1c1c] p-3 h-14 rounded-full flex items-center justify-center gap-2.5">
            <button
              className={`px-2 py-1 lg:px-3 lg:py-2 cursor-pointer rounded-full ${
                activeTab === "body"
                  ? "bg-gray-500 border-[1px] border-gray-500 text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
              onClick={() => setActiveTab("body")}
            >
              {prop.options.metaTitle.body.name}
            </button>
            <button
              className={`px-2 py-1 lg:px-3 lg:py-2 cursor-pointer rounded-full ${
                activeTab === "controls"
                  ? "bg-gray-500  border-[1px] border-gray-500 text-white"
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
                      outline: activeColor === color ? "2px solid skyblue" : "none",
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
                {prop.options.color.controlsImg.map((color, i) => (
                  <button
                    key={color}
                    className="w-7 h-7 rounded-full cursor-pointer"
                    style={{
                      backgroundColor: `${prop.options.color.controlsColor[i]}`,
                      outline: activeColor === color ? "2px solid skyblue" : "none",
                    }}
                    onClick={() =>
                      changeControlsTexture(
                        color,
                        "#ffffff",
                        prop.options.metaTitle.controls.colorsName[i]
                      )
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
