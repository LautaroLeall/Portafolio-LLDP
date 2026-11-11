import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * NotFound3DCanvas — Compact, Natural 3D Artifact for 404 Page
 * Features a delicate floating Torus Knot, crystalline wireframe core,
 * and smooth mouse parallax. No forced spin on click, fully seamless.
 */
export default function NotFound3DCanvas({
  theme = 'dark',
  className = '',
  style = {}
}) {
  const mountRef = useRef(null);
  const isLight = theme === 'light';

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 300;
    let height = container.clientHeight || 300;

    // Scene & Perspective Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.8;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Primary Group for subtle mouse parallax
    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    // Colors
    const primaryColor = isLight ? 0x2563eb : 0x3b82f6;
    const secondaryColor = isLight ? 0x4f46e5 : 0x06b6d4;
    const particleColor = isLight ? 0x3b82f6 : 0x60a5fa;

    // 1. Torus Knot (Compact & Elegant)
    const torusGeo = new THREE.TorusKnotGeometry(1.1, 0.32, 70, 18);
    const torusMat = new THREE.MeshBasicMaterial({
      color: primaryColor,
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.45 : 0.65
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    stageGroup.add(torusMesh);

    // 2. Inner Crystalline Core
    const innerGeo = new THREE.IcosahedronGeometry(0.62, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: secondaryColor,
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.7 : 0.85
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    stageGroup.add(innerMesh);

    // 3. Orbital Particles
    const particleCount = 80;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.6 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      positions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      positions[i * 3 + 1] = radius * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: particleColor,
      size: 0.038,
      transparent: true,
      opacity: isLight ? 0.65 : 0.8
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    stageGroup.add(particlePoints);

    // Mouse Tracking: Smooth Parallax Movement (No click boost)
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = y * 0.45;
      targetY = x * 0.55;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        targetX = y * 0.4;
        targetY = x * 0.45;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 300;
      height = container.clientHeight || 300;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop (Gentle, Natural Rotation)
    let animId;
    const startTime = performance.now();

    const animate = () => {
      const elapsed = (performance.now() - startTime) * 0.001;

      // Soft autonomous rotation
      torusMesh.rotation.y = elapsed * 0.18;
      torusMesh.rotation.x = elapsed * 0.11;

      innerMesh.rotation.y = -elapsed * 0.26;
      innerMesh.rotation.z = elapsed * 0.16;

      particlePoints.rotation.y = elapsed * 0.08;

      // Smooth mouse parallax lerp
      stageGroup.rotation.x += (targetX - stageGroup.rotation.x) * 0.05;
      stageGroup.rotation.y += (targetY - stageGroup.rotation.y) * 0.05;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);

      torusGeo.dispose();
      torusMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isLight]);

  return (
    <div
      ref={mountRef}
      className={`notfound-3d-canvas select-none pointer-events-auto ${className}`}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
    />
  );
}
