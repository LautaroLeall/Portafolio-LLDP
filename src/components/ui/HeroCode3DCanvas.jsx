import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * HeroCode3DCanvas — Minimalist 3D Programming Architecture Artifact
 */
export default function HeroCode3DCanvas({ className = '', style = {} }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 380;
    const height = container.clientHeight || 380;

    // Scene, Camera & WebGL Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 6.4);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Root Group for interactive mouse parallax
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Studio Lighting setup for frosted glass & beveled edge glints
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const cyanRim = new THREE.PointLight(0x38bdf8, 3.2, 22);
    cyanRim.position.set(-3.5, 1.5, 3.5);
    scene.add(cyanRim);

    const blueFill = new THREE.PointLight(0x3b82f6, 2.8, 22);
    blueFill.position.set(3.5, -2.5, 3);
    scene.add(blueFill);

    // 1. Shapes Construction for </> (Sleek, Slender Typography)
    const extrudeSettings = {
      depth: 0.12,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.025,
      bevelThickness: 0.025
    };

    // A. Left Chevron '<'
    const leftShape = new THREE.Shape();
    leftShape.moveTo(0.20, 0.68);
    leftShape.lineTo(-0.35, 0.0);
    leftShape.lineTo(0.20, -0.68);
    leftShape.lineTo(0.04, -0.68);
    leftShape.lineTo(-0.19, 0.0);
    leftShape.lineTo(0.04, 0.68);
    leftShape.closePath();

    const leftGeo = new THREE.ExtrudeGeometry(leftShape, extrudeSettings);
    leftGeo.center();

    // B. Center Slash '/'
    const slashShape = new THREE.Shape();
    slashShape.moveTo(0.24, 0.82);
    slashShape.lineTo(-0.10, -0.82);
    slashShape.lineTo(-0.25, -0.82);
    slashShape.lineTo(0.09, 0.82);
    slashShape.closePath();

    const slashGeo = new THREE.ExtrudeGeometry(slashShape, extrudeSettings);
    slashGeo.center();

    // C. Right Chevron '>'
    const rightShape = new THREE.Shape();
    rightShape.moveTo(-0.20, 0.68);
    rightShape.lineTo(0.35, 0.0);
    rightShape.lineTo(-0.20, -0.68);
    rightShape.lineTo(-0.04, -0.68);
    rightShape.lineTo(0.19, 0.0);
    rightShape.lineTo(-0.04, 0.68);
    rightShape.closePath();

    const rightGeo = new THREE.ExtrudeGeometry(rightShape, extrudeSettings);
    rightGeo.center();

    // Crystalline Frosted Cyber Material
    const symbolMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.14,
      roughness: 0.16,
      metalness: 0.12,
      transmission: 0.55,
      ior: 1.45,
      transparent: true,
      opacity: 0.9,
      clearcoat: 0.85,
      clearcoatRoughness: 0.12
    });

    // Delicate Architectural Edge Contours
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x7dd3fc,
      transparent: true,
      opacity: 0.45
    });

    // Meshes Assembly
    const leftMesh = new THREE.Mesh(leftGeo, symbolMat);
    const leftEdges = new THREE.LineSegments(new THREE.EdgesGeometry(leftGeo, 24), edgeMat);
    leftMesh.add(leftEdges);
    leftMesh.position.set(-0.92, 0, 0);
    mainGroup.add(leftMesh);

    const slashMesh = new THREE.Mesh(slashGeo, symbolMat);
    const slashEdges = new THREE.LineSegments(new THREE.EdgesGeometry(slashGeo, 24), edgeMat);
    slashMesh.add(slashEdges);
    slashMesh.position.set(0, 0, 0.08);
    mainGroup.add(slashMesh);

    const rightMesh = new THREE.Mesh(rightGeo, symbolMat);
    const rightEdges = new THREE.LineSegments(new THREE.EdgesGeometry(rightGeo, 24), edgeMat);
    rightMesh.add(rightEdges);
    rightMesh.position.set(0.92, 0, 0);
    mainGroup.add(rightMesh);

    // 2. Delicate Syntax Dust Particles (Ambient Floating Code Tokens)
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.0 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * 0.8;

      positions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      positions[i * 3 + 1] = radius * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.035,
      transparent: true,
      opacity: 0.65
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // 3. Subtle Ambient Halo Latitude Ring
    const haloGeo = new THREE.RingGeometry(2.1, 2.12, 64);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.14,
      side: THREE.DoubleSide
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.x = Math.PI / 2.35;
    mainGroup.add(haloMesh);

    // Mouse & Touch Parallax State
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let dragVelocityX = 0;
    let dragVelocityY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;

      if (isDragging) {
        const deltaX = e.clientX - previousMouseX;
        const deltaY = e.clientY - previousMouseY;
        dragVelocityX = deltaX * 0.005;
        dragVelocityY = deltaY * 0.005;
        mainGroup.rotation.y += dragVelocityX;
        mainGroup.rotation.x += dragVelocityY;
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
      }
    };

    const handleMouseDown = (e) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        mouseX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Responsive Auto Resize with ResizeObserver
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 380;
      const h = container.clientHeight || 380;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(container);
    } else {
      window.addEventListener('resize', handleResize);
    }

    // Animation Loop
    let animId;
    const startTime = performance.now();

    const animate = () => {
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Independent organic levitation (harmonic breathing)
      leftMesh.position.y = Math.sin(elapsedTime * 1.1) * 0.04;
      slashMesh.position.y = Math.sin(elapsedTime * 1.1 + 1.1) * 0.05;
      rightMesh.position.y = Math.sin(elapsedTime * 1.1 + 2.2) * 0.04;

      // Subtle yaw/pitch breathing drift
      leftMesh.rotation.z = Math.sin(elapsedTime * 0.7) * 0.02;
      slashMesh.rotation.y = Math.sin(elapsedTime * 0.9) * 0.03;
      rightMesh.rotation.z = -Math.sin(elapsedTime * 0.7) * 0.02;

      // Gentle orbital particles drift
      particles.rotation.y = elapsedTime * 0.06;
      haloMesh.rotation.z = -elapsedTime * 0.04;

      // Drag inertia damping
      if (!isDragging) {
        dragVelocityX *= 0.92;
        dragVelocityY *= 0.92;
        mainGroup.rotation.y += dragVelocityX;
        mainGroup.rotation.x += dragVelocityY;

        // Smooth mouse parallax lerp
        targetRotationX = mouseY * 0.28;
        targetRotationY = mouseX * 0.35;

        mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.04;
        mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.04;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);

      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', handleResize);
      }

      leftGeo.dispose();
      slashGeo.dispose();
      rightGeo.dispose();
      particleGeo.dispose();
      haloGeo.dispose();

      symbolMat.dispose();
      edgeMat.dispose();
      particleMat.dispose();
      haloMat.dispose();

      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`hero-code-3d-wrap select-none cursor-grab active:cursor-grabbing ${className}`}
      data-cursor="pointer"
      title="3D Minimalist Code Architecture — </> Interactive Canvas"
      style={{
        width: '100%',
        height: '100%',
        minHeight: style.minHeight || '220px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        touchAction: 'none',
        ...style
      }}
    />
  );
}
