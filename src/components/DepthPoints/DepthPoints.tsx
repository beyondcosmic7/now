'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import styles from './DepthPoints.module.css';

const SIMPLEX_NOISE_GLSL = `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0/7.0;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x2_ = x_ * ns.x + ns.yyyy;
  vec4 y2_ = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x2_) - abs(y2_);
  vec4 b0 = vec4(x2_.xy, y2_.xy);
  vec4 b1 = vec4(x2_.zw, y2_.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

const VERTEX_SHADER = `
varying vec2 vUv;

uniform float u_time;
uniform sampler2D u_depthMap;

void main() {
  vUv = uv;
  vec3 transformed = vec3(position);

  // Depth displacement — pixel-aligned with photo
  vec4 depthColor = texture2D(u_depthMap, vUv);
  float depth = (depthColor.r + depthColor.g + depthColor.b) / 3.0;
  transformed.z -= depth * 120.0;

  // Idle breathing — very subtle vertical float
  float breath = sin(u_time * 0.0008) * 3.0;
  transformed.y += breath * depth;

  gl_PointSize = 1.8;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}
`;

const FRAGMENT_SHADER = SIMPLEX_NOISE_GLSL + `
varying vec2 vUv;

uniform float u_time;
uniform sampler2D u_diffuseMap;
uniform sampler2D u_depthMap;

void main() {
  vec3 color = texture2D(u_diffuseMap, vUv).rgb;

  // Natural gamma lift
  color = pow(color, vec3(0.55));
  color = clamp(color * 1.1, 0.0, 1.0);

  // Background mask via depth
  vec3 depthSample = texture2D(u_depthMap, vUv).rgb;
  float depthVal = (depthSample.r + depthSample.g + depthSample.b) / 3.0;
  float figureMask = smoothstep(0.08, 0.2, depthVal);

  // Particle shimmer — alive, breathing
  float noise = snoise(vec3(vUv * 18.0, u_time * 0.00025));
  float alpha = figureMask * (0.93 + noise * 0.07);

  if (alpha < 0.02) discard;
  gl_FragColor = vec4(color, alpha);
}
`;

const IMG_ASPECT = 896 / 1195;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function DepthPoints() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = Math.max(container.offsetWidth, window.innerWidth / 2);
    const height = Math.max(container.offsetHeight, window.innerHeight);

    // ── Scene ─────────────────────────────────────
    const scene = new THREE.Scene();
    const perspective = 800;
    const fov = (180 * (2 * Math.atan(height / 2 / perspective))) / Math.PI;
    const camera = new THREE.PerspectiveCamera(fov, width / height, 1, 10000);
    camera.position.z = perspective;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ── Textures ──────────────────────────────────
    const loader = new THREE.TextureLoader();
    const diffuseMap = loader.load('/ME.jpeg');
    const depthMap = loader.load('/ME_DEPTH_11zon.png');

    // ── Geometry ──────────────────────────────────
    const planeH = height * 0.9;
    const planeW = planeH * IMG_ASPECT;
    const geometry = new THREE.PlaneGeometry(planeW, planeH, 400, 400);

    // ── Material ──────────────────────────────────
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms: {
        u_time: { value: 0 },
        u_diffuseMap: { value: diffuseMap },
        u_depthMap: { value: depthMap },
      },
      transparent: true,
      depthWrite: false,
    });

    // ── Points ────────────────────────────────────
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // ── Mouse interaction ─────────────────────────
    const mouse = {
      x: { current: 0, target: 0 },
      y: { current: 0, target: 0 },
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x.target = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y.target = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Render loop ───────────────────────────────
    const startTime = Date.now();

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const elapsed = Date.now() - startTime;
      material.uniforms.u_time.value = elapsed;

      // Smooth mouse follow
      mouse.x.current = lerp(mouse.x.current, mouse.x.target, 0.035);
      mouse.y.current = lerp(mouse.y.current, mouse.y.target, 0.035);

      // Idle float — gentle sine drift when no mouse
      const idleX = Math.sin(elapsed * 0.0003) * 0.08;
      const idleY = Math.cos(elapsed * 0.0004) * 0.04;

      // Combine mouse + idle
      const rotX = (mouse.y.current + idleY) * Math.PI * -0.04;
      const rotY = (mouse.x.current + idleX) * Math.PI * -0.05;

      points.rotation.x = rotX;
      points.rotation.y = rotY;

      // Subtle position parallax
      points.position.x = (mouse.x.current + idleX) * planeW * -0.02;
      points.position.y = (mouse.y.current + idleY) * planeH * 0.01;

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ────────────────────────────────────
    const onResize = () => {
      const w = Math.max(container.offsetWidth, window.innerWidth / 2);
      const h = Math.max(container.offsetHeight, window.innerHeight);
      camera.fov = (180 * (2 * Math.atan(h / 2 / perspective))) / Math.PI;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // ── Cleanup ───────────────────────────────────
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={styles.container} />;
}
