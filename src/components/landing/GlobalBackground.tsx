"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function GlobalBackground() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Parallax effect for the ambient lights wrapper
  // Moving slowly upwards as the user scrolls down
  const yLights = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none selection-disabled bg-background transition-colors duration-300">
      
      {/* 1. Base Gradient */}
      <div 
        className="absolute inset-0 transition-colors duration-300"
        style={{
          background: "var(--global-bg-base)",
        }}
      />

      {/* 2. Tech Mesh (Subtle Grid / Dots) */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage: "radial-gradient(var(--mesh-color) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* 3. Ambient Lights with Parallax Wrapper */}
      <motion.div 
        className="absolute inset-0 w-full h-full transition-colors duration-300"
        style={{ y: yLights }}
      >
        <div className="absolute -top-[10%] -right-[5%] w-[600px] h-[600px] rounded-full blur-[120px] animate-ambient-1 transition-colors duration-300" style={{ background: "var(--ambient-1)" }} />
        <div className="absolute top-[25%] -left-[10%] w-[700px] h-[700px] rounded-full blur-[140px] animate-ambient-2 transition-colors duration-300" style={{ background: "var(--ambient-2)" }} />
        <div className="absolute top-[50%] -right-[15%] w-[800px] h-[800px] rounded-full blur-[150px] animate-ambient-3 transition-colors duration-300" style={{ background: "var(--ambient-3)" }} />
        <div className="absolute top-[75%] -left-[5%] w-[600px] h-[600px] rounded-full blur-[130px] animate-ambient-4 transition-colors duration-300" style={{ background: "var(--ambient-4)" }} />
        <div className="absolute -bottom-[10%] left-[20%] right-[20%] h-[400px] rounded-[100%] blur-[120px] animate-ambient-5 transition-colors duration-300" style={{ background: "var(--ambient-5)" }} />
      </motion.div>

      {/* 4. Particles (Static array of 35) */}
      <div className="absolute inset-0 w-full h-full">
        {Array.from({ length: 35 }).map((_, i) => {
          // Extra randomization for particles
          const size = Math.random() * 4 + 2;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const delay = -(Math.random() * 40);
          const duration = Math.random() * 20 + 25; // 25s to 45s
          const opacityBase = Math.random() * 0.5 + 0.1;

          return (
            <div
              key={i}
              className="absolute rounded-full particle-float transition-colors duration-300"
              style={{
                backgroundColor:
                  i % 3 === 0
                    ? "var(--particle-1)"
                    : i % 3 === 1
                    ? "var(--particle-2)"
                    : "var(--particle-3)",
                width: size + "px",
                height: size + "px",
                left: left + "%",
                top: top + "%",
                opacity: opacityBase,
                animationDelay: delay + "s",
                animationDuration: duration + "s",
              }}
            />
          );
        })}
      </div>

      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ambient1 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 40px) scale(1.05); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes ambient2 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -30px) scale(1.1); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes ambient3 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, -40px) scale(0.95); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes ambient4 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, 30px) scale(1.05); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes ambient5 {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.02); }
          100% { transform: translateY(0) scale(1); }
        }
        @keyframes float {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-200px) translateX(20px); opacity: 0; }
        }
        .animate-ambient-1 { animation: ambient1 25s ease-in-out infinite; }
        .animate-ambient-2 { animation: ambient2 30s ease-in-out infinite; }
        .animate-ambient-3 { animation: ambient3 35s ease-in-out infinite; }
        .animate-ambient-4 { animation: ambient4 28s ease-in-out infinite; }
        .animate-ambient-5 { animation: ambient5 40s ease-in-out infinite; }
        .particle-float { animation: float linear infinite; }
      `}} />
    </div>
  );
}
