// types/three.d.ts
declare module 'three/examples/jsm/loaders/GLTFLoader' {
  export class GLTFLoader {
    constructor();
    load(url: string, onLoad: (gltf: any) => void, onProgress?: (progress: any) => void, onError?: (error: any) => void): void;
    loadAsync(url: string, onProgress?: (progress: any) => void): Promise<any>;
    parse(data: ArrayBuffer, path: string, onLoad: (gltf: any) => void, onError?: (error: any) => void): void;
    setPath(path: string): void;
    setResourcePath(path: string): void;
    setCrossOrigin(crossOrigin: string): void;
    setDRACOLoader(dracoLoader: any): void;
    setKTX2Loader(ktx2Loader: any): void;
    setMeshoptDecoder(meshoptDecoder: any): void;
    register(callback: (parser: any, extensions: any) => void): void;
    unregister(callback: (parser: any, extensions: any) => void): void;
  }
}

declare module 'three/examples/jsm/controls/OrbitControls' {
  import { Camera, Vector3 } from 'three';
  import { Event } from 'three/src/core/EventDispatcher';
  
  export class OrbitControls {
    constructor(object: Camera, domElement?: HTMLElement);
    object: Camera;
    domElement: HTMLElement;
    enabled: boolean;
    target: Vector3;
    minDistance: number;
    maxDistance: number;
    minZoom: number;
    maxZoom: number;
    minPolarAngle: number;
    maxPolarAngle: number;
    minAzimuthAngle: number;
    maxAzimuthAngle: number;
    enableDamping: boolean;
    dampingFactor: number;
    enableZoom: boolean;
    zoomSpeed: number;
    enableRotate: boolean;
    rotateSpeed: number;
    enablePan: boolean;
    panSpeed: number;
    screenSpacePanning: boolean;
    keyPanSpeed: number;
    autoRotate: boolean;
    autoRotateSpeed: number;
    autoRotateTimeout: number;
    enableKeys: boolean;
    keys: { [key: string]: number };
    mouseButtons: { [key: string]: number };
    touches: { [key: string]: number };
    update(): void;
    dispose(): void;
    getPolarAngle(): number;
    getAzimuthalAngle(): number;
    getDistance(): number;
    listenToKeyEvents(domElement: HTMLElement): void;
    stopListenToKeyEvents(): void;
    saveState(): void;
    reset(): void;
    getState(): any;
    addEventListener(type: string, listener: (event: Event) => void): void;
    hasEventListener(type: string, listener: (event: Event) => void): boolean;
    removeEventListener(type: string, listener: (event: Event) => void): void;
  }
}