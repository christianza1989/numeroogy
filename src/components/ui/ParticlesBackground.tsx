"use client";
import { useCallback } from "react";
import type { Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 z-0"
      options={{
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "bubble" },
            resize: true,
          },
          modes: {
            bubble: { distance: 120, size: 4, duration: 2, opacity: 0.9, speed: 3 },
          },
        },
        particles: {
          color: { value: ["#ffffff", "#ddd6fe", "#fbcfe8", "#a78bfa"] },
          links: { enable: false },
          move: { enable: true, direction: "none", random: true, speed: 0.5, straight: false, outModes: { default: "out" } },
          number: { density: { enable: true, area: 800 }, value: 80 },
          opacity: { value: 0.6, random: true, animation: { enable: true, speed: 0.7, minimumValue: 0.15, sync: false } },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 2.5 }, random: true },
        },
        detectRetina: true,
      }}
    />
  );
}
