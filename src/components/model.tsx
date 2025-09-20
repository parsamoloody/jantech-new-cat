'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeDModelViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
  const [meshObjects, setMeshObjects] = useState<THREE.Mesh[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [controls, setControls] = useState<OrbitControls | null>(null);

  // Model URL - replace with your GLB file path
  const MODEL_URL = '/models/your-model.glb'; // Put your GLB file in public/models/

  useEffect(() => {
    let animationFrameId: number;
    let camera: THREE.PerspectiveCamera;

    const initThreeJS = async () => {
      if (!mountRef.current) return;

      // Scene setup
      const newScene = new THREE.Scene();
      newScene.background = new THREE.Color(0xf0f0f0);

      // Camera setup
      camera = new THREE.PerspectiveCamera(
        45,
        mountRef.current.clientWidth / mountRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.set(5, 5, 5);

      // Renderer setup
      const newRenderer = new THREE.WebGLRenderer({ antialias: true });
      newRenderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      newRenderer.shadowMap.enabled = true;
      newRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
      newRenderer.setPixelRatio(window.devicePixelRatio);

      mountRef.current.appendChild(newRenderer.domElement);

      // Lighting setup
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      newScene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(10, 10, 5);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      newScene.add(directionalLight);

      // Load GLB model
      try {
        const loader = new GLTFLoader();
        const gltf = await loader.loadAsync(MODEL_URL);

        const model = gltf.scene;
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            
            // Store mesh for color manipulation
            setMeshObjects(prev => [...prev, child]);
            
            // Set initial gray color
            const material = child.material as THREE.MeshStandardMaterial;
            if (material) {
              material.color.set(0x808080); // Gray
            }
          }
        });

        // Center and scale model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        model.position.sub(center);
        
        // Scale model to fit view
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 3 / maxDim;
        model.scale.multiplyScalar(scale);

        newScene.add(model);

        // Orbit controls - only rotation, no zoom
        const newControls = new OrbitControls(camera, newRenderer.domElement);
        newControls.enableZoom = false;
        newControls.enablePan = false;
        newControls.minPolarAngle = Math.PI / 6; // Limit vertical rotation
        newControls.maxPolarAngle = Math.PI * 5 / 6;
        newControls.autoRotate = true;
        newControls.autoRotateSpeed = 1.0;

        setScene(newScene);
        setRenderer(newRenderer);
        setControls(newControls);
        setIsLoading(false);

      } catch (error) {
        console.error('Error loading GLB model:', error);
        setIsLoading(false);
      }
    };

    initThreeJS();

    // Animation loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      if (controls) {
        controls.update();
      }

      if (renderer) {
        renderer.render(scene!, camera);
      }
    };

    if (scene && renderer) {
      animate();
    }

    // Cleanup function
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      if (renderer && mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      if (controls) {
        controls.dispose();
      }
    };
  }, [scene, renderer, controls]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;

      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [camera, renderer]);

  // Color change function
  const changeModelColor = (color: number) => {
    if (meshObjects.length === 0) return;

    meshObjects.forEach((mesh) => {
      const material = mesh.material as THREE.MeshStandardMaterial;
      if (material) {
        material.color.set(color);
      }
    });
  };

  // Loading component
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading 3D Model...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">3D Model Viewer</h1>
            <div className="text-sm text-gray-500">
              Rotate with mouse • Click buttons to change colors
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full">
        <div className="flex-1 relative">
          {/* 3D Canvas */}
          <div 
            ref={mountRef} 
            className="w-full h-[70vh] bg-white rounded-lg shadow-lg border overflow-hidden"
          />
          
          {/* Controls Panel */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
            <button
              onClick={() => changeModelColor(0x808080)}
              className="w-12 h-12 bg-gray-400 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 flex items-center justify-center"
              title="Gray"
            >
              <div className="w-6 h-6 bg-gray-400 rounded-full border border-gray-300"></div>
            </button>
            
            <button
              onClick={() => changeModelColor(0xffffff)}
              className="w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 flex items-center justify-center border-2 border-gray-300"
              title="White"
            >
              <div className="w-6 h-6 bg-white rounded-full border border-gray-300"></div>
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white border-t mt-4">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M4.661 4.182l2.972.91M5.649 9.297l-2.7 3.043M10.298 5.013l2.934 1.66M6.588 9.392l3.505 3.949M11.579 5.636l2.33 4.291" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Rotate View</div>
                  <div>Drag to rotate the model</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Color Controls</div>
                  <div>Click buttons below model</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Auto Rotate</div>
                  <div>Model rotates automatically</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeDModelViewer;