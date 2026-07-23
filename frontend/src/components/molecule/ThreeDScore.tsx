import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const ThreeDModel: React.FC<{
  modelPath: string;
  percentage: number;
  typeInvestor: any;
}> = ({ modelPath, percentage, typeInvestor }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      105,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    // Set clear color to transparent to hide background
    renderer.setClearColor(0x000000, 0); // 0x000000 is black, but alpha is 0 (transparent)
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 0, 0);
        scene.add(model);

        // Apply a risk-based color overlay with pulsating effect for high risk
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const material = child.material as THREE.MeshStandardMaterial;
            if (percentage < 40) {
              material.color.set(0xff9999); // High risk - Red
              material.emissive.set(0xff9999); // Glow effect
              material.emissiveIntensity = 0.8;
            } else if (percentage >= 40 && percentage >= 60) {
              material.color.set(0xffa500); // Medium risk - Orange
            } else {
              material.color.set(0x00ff00); // Low risk - Green
            }
          }
        });
      },
      undefined,
      (error) =>
        console.error("An error occurred while loading the model:", error)
    );

    camera.position.z = 5;

    // Add a rotation animation to the 3D model for dynamism
    const rotationSpeed = 0.005;
    const animate = () => {
      requestAnimationFrame(animate);
      if (scene.children[0]) {
        scene.children[0].rotation.y += rotationSpeed; // Slow rotation
      }
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [modelPath, percentage]);

  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
      <div
        ref={mountRef}
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          borderRadius: "10px",
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={() => (mountRef.current!.style.transform = "scale(1.05)")}
        onMouseLeave={() => (mountRef.current!.style.transform = "scale(1)")}
      />

      {/* Percentage Indicator with dynamic styling */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          background:
            percentage < 40
              ? "linear-gradient(135deg, #ff4e50, #f23b3b)" // High risk - Red gradient
              : percentage < 60 && percentage > 40
              ? "linear-gradient(135deg, #ff9a44, #ff6a00)" // Medium risk - Orange gradient
              : "linear-gradient(135deg, #00c853, #008f39)", // Low risk - Green gradient
          color: "white",
          padding: "14px 28px",
          borderRadius: "30px",
          fontSize: "24px",
          fontWeight: "bold",
          letterSpacing: "1.5px",
          textShadow: "0 2px 12px rgba(0, 0, 0, 0.3)",
          boxShadow: "black",
          // percentage < 40
          //   ? "0 0 20px rgba(255, 0, 0, 0.8)" // Glow effect for high risk
          //   : "0 4px 12px rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(10px)",
          border: "2px solid rgba(255, 255, 255, 0.3)"
        }}
      >
        ⚠ {percentage}% {typeInvestor ? typeInvestor : "Risky Investor"} ⚠
      </div>

      {/* Keyframes for pulsating effect */}
      <style>
        {`
          @keyframes pulse {
            from {
              box-shadow: 0 0 15px rgba(255, 0, 0, 1);
            }
            to {
              box-shadow: 0 0 30px rgba(255, 0, 0, 0.8);
            }
          }
        `}
      </style>
    </div>
  );
};

export default ThreeDModel;
