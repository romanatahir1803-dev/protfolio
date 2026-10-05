"use client";

import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  vx: number;
  vy: number;
  layer: number;
  color: string;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const starColors = [
      "rgba(255, 255, 255,",
      "rgba(255, 240, 220,",
      "rgba(255, 175, 75,",
      "rgba(255, 138, 31,",
    ];

    // Generate stars with various depths
    const starCount = Math.min(180, Math.floor((width * height) / 9000));
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      const layer = Math.random() < 0.2 ? 3 : Math.random() < 0.5 ? 2 : 1;
      const colorIndex = Math.random() < 0.35 ? Math.floor(Math.random() * starColors.length) : 0;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: layer === 3 ? Math.random() * 2 + 1.2 : layer === 2 ? Math.random() * 1.4 + 0.8 : Math.random() * 0.9 + 0.4,
        baseAlpha: Math.random() * 0.6 + 0.2,
        alpha: Math.random() * 0.6 + 0.2,
        twinkleSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() < 0.5 ? 1 : -1),
        vx: (Math.random() - 0.5) * 0.15 * layer,
        vy: (Math.random() - 0.5) * 0.15 * layer,
        layer,
        color: starColors[colorIndex],
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse parallax easing
      mouseX += (targetMouseX - mouseX) * 0.03;
      mouseY += (targetMouseY - mouseY) * 0.03;

      const normMouseX = (mouseX - width / 2) / (width / 2);
      const normMouseY = (mouseY - height / 2) / (height / 2);

      // Draw subtle ambient nebula/dust clouds
      const grad1 = ctx.createRadialGradient(
        width * 0.2 + normMouseX * -30,
        height * 0.3 + normMouseY * -30,
        20,
        width * 0.2,
        height * 0.3,
        width * 0.45
      );
      grad1.addColorStop(0, "rgba(255, 138, 31, 0.04)");
      grad1.addColorStop(0.6, "rgba(255, 138, 31, 0.01)");
      grad1.addColorStop(1, "rgba(5, 5, 5, 0)");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.8 + normMouseX * -40,
        height * 0.7 + normMouseY * -40,
        20,
        width * 0.8,
        height * 0.7,
        width * 0.5
      );
      grad2.addColorStop(0, "rgba(255, 100, 20, 0.035)");
      grad2.addColorStop(0.7, "rgba(255, 100, 20, 0.008)");
      grad2.addColorStop(1, "rgba(5, 5, 5, 0)");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Render drifting stars
      for (const star of stars) {
        if (!prefersReducedMotion) {
          star.alpha += star.twinkleSpeed;
          if (star.alpha > 0.95 || star.alpha < 0.15) {
            star.twinkleSpeed = -star.twinkleSpeed;
          }

          star.x += star.vx;
          star.y += star.vy;

          if (star.x < 0) star.x = width;
          if (star.x > width) star.x = 0;
          if (star.y < 0) star.y = height;
          if (star.y > height) star.y = 0;
        }

        // Parallax offset per layer
        const offsetX = normMouseX * star.layer * 12;
        const offsetY = normMouseY * star.layer * 12;

        const posX = star.x + offsetX;
        const posY = star.y + offsetY;

        ctx.beginPath();
        ctx.arc(posX, posY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color} ${Math.max(0.1, Math.min(1, star.alpha))})`;
        ctx.fill();

        // Extra soft glow for prominent stars
        if (star.layer === 3) {
          ctx.beginPath();
          ctx.arc(posX, posY, star.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `${star.color} ${star.alpha * 0.18})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
