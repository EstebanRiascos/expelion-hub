"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CreditCard,
  BadgeCheck,
  Monitor,
  MousePointer2,
  Headset,
  Radio,
  Calendar,
  XCircle,
  Play,
  Award,
  Cloud,
  RefreshCw,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

// --- MICRO COMPONENTS ---

const BenefitNoCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="flex items-center gap-2 cursor-pointer text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors py-1.5 px-3 rounded-full hover:bg-neutral-100/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isHovered ? (
            <motion.div
              key="card"
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute text-neutral-500"
            >
              <CreditCard size={15} />
            </motion.div>
          ) : (
            <motion.div
              key="check"
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute text-emerald-500"
            >
              <BadgeCheck size={16} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="relative overflow-hidden h-4 flex items-center">
        <AnimatePresence mode="popLayout">
          {!isHovered ? (
            <motion.span
              key="text1"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="whitespace-nowrap"
            >
              Sin tarjeta de crédito
            </motion.span>
          ) : (
            <motion.span
              key="text2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="whitespace-nowrap text-emerald-600 font-semibold"
            >
              No requerida
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const BenefitCustomImpl = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="flex items-center gap-2 cursor-pointer text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors py-1.5 px-3 rounded-full hover:bg-neutral-100/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-4 h-4 flex items-center justify-center overflow-hidden">
        <motion.div
          animate={isHovered ? { y: -36 } : { y: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute flex flex-col items-center gap-[4px] top-0"
        >
          <Monitor size={15} className="text-neutral-500 h-4 shrink-0" />
          <MousePointer2 size={13} className="text-violet-500 h-4 shrink-0" />
          <BadgeCheck size={16} className="text-emerald-500 h-4 shrink-0" />
        </motion.div>
      </div>
      <span className="whitespace-nowrap">Implementación personalizada</span>
    </div>
  );
};

const BenefitSupport = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="flex items-center gap-2 cursor-pointer text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors py-1.5 px-3 rounded-full hover:bg-neutral-100/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-4 h-4 flex items-center justify-center overflow-hidden">
        <motion.div
          animate={isHovered ? { y: -36 } : { y: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute flex flex-col items-center gap-[4px] top-0"
        >
          <Headset size={15} className="text-neutral-500 h-4 shrink-0" />
          <Radio size={15} className="text-violet-500 h-4 shrink-0" />
          <BadgeCheck size={16} className="text-emerald-500 h-4 shrink-0" />
        </motion.div>
      </div>
      <span className="whitespace-nowrap">Soporte prioritario</span>
    </div>
  );
};

const BenefitTraining = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="flex items-center gap-2 cursor-pointer text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors py-1.5 px-3 rounded-full hover:bg-neutral-100/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-4 h-4 flex items-center justify-center overflow-hidden">
        <motion.div
          animate={isHovered ? { y: -36 } : { y: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute flex flex-col items-center gap-[4px] top-0"
        >
          <Monitor size={15} className="text-neutral-500 h-4 shrink-0" />
          <Play size={13} className="text-violet-500 h-4 shrink-0 fill-violet-500" />
          <Award size={15} className="text-emerald-500 h-4 shrink-0" />
        </motion.div>
      </div>
      <span className="whitespace-nowrap">Capacitación incluida</span>
    </div>
  );
};

const BenefitUpdates = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="flex items-center gap-2 cursor-pointer text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors py-1.5 px-3 rounded-full hover:bg-neutral-100/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-4 h-4 flex items-center justify-center overflow-hidden">
        <motion.div
          animate={isHovered ? { y: -36 } : { y: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute flex flex-col items-center gap-[4px] top-0"
        >
          <Cloud size={15} className="text-neutral-500 h-4 shrink-0" />
          <motion.div
             animate={isHovered ? { rotate: 180 } : { rotate: 0 }}
             transition={{ duration: 0.4 }}
             className="h-4 flex items-center"
          >
            <RefreshCw size={13} className="text-violet-500 shrink-0" />
          </motion.div>
          <BadgeCheck size={16} className="text-emerald-500 h-4 shrink-0" />
        </motion.div>
      </div>
      <span className="whitespace-nowrap">Actualizaciones sin costo</span>
    </div>
  );
};

const BenefitCancel = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="flex items-center gap-2 cursor-pointer text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors py-1.5 px-3 rounded-full hover:bg-neutral-100/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-4 h-4 flex items-center justify-center overflow-hidden">
        <motion.div
          animate={isHovered ? { y: -36 } : { y: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute flex flex-col items-center gap-[4px] top-0"
        >
          <Calendar size={15} className="text-neutral-500 h-4 shrink-0" />
          <XCircle size={15} className="text-red-400 h-4 shrink-0" />
          <BadgeCheck size={16} className="text-emerald-500 h-4 shrink-0" />
        </motion.div>
      </div>
      <span className="whitespace-nowrap">Cancelación cuando quieras</span>
    </div>
  );
};

const BenefitLimited = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div 
      className="flex items-center gap-1.5 cursor-pointer text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors py-1.5 px-3 rounded-full hover:bg-neutral-100/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="text-orange-500 mr-1 text-[14px]">🔥</span>
      <span className="whitespace-nowrap">Quedan</span>
      
      <div className="relative h-4 overflow-hidden w-[16px] flex justify-center items-center font-bold text-neutral-800">
        <AnimatePresence mode="popLayout">
          {!isHovered ? (
            <motion.span
              key="18"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              18
            </motion.span>
          ) : (
            <motion.span
              key="17"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-orange-600"
            >
              17
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <span className="whitespace-nowrap">cupos</span>
    </div>
  );
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ d: 12, h: 4, m: 16 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.m > 0) return { ...prev, m: prev.m - 1 };
        return { d: prev.d, h: prev.h - 1, m: 59 };
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-1.5 cursor-default text-[10px] font-medium text-neutral-500 bg-neutral-100/50 py-1 px-3 rounded-md border border-neutral-200/40 ml-2">
      <span>⏳</span>
      <span>Termina en:</span>
      <span className="font-bold text-neutral-700 tabular-nums tracking-tight">
        {timeLeft.d}d {String(timeLeft.h).padStart(2, '0')}h {String(timeLeft.m).padStart(2, '0')}m
      </span>
    </div>
  );
};

const PromoCTA = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link 
      href="/login"
      className="group flex items-center gap-1 cursor-pointer text-xs font-bold text-violet-600 hover:text-violet-700 transition-colors py-1.5 px-3 rounded-full hover:bg-violet-50/50 ml-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="whitespace-nowrap">Ver promoción</span>
      <motion.div
        animate={{ x: isHovered ? 4 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ArrowRight size={14} className="text-violet-500 group-hover:text-violet-600" />
      </motion.div>
    </Link>
  );
};

// --- MAIN COMPONENT ---

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 48, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="sticky top-20 w-full z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/50 shadow-sm flex items-center overflow-hidden"
        >
          <div className="flex h-[48px] w-full items-center pl-6 pr-2">
            
            {/* Main Promo Text - Fixed on left */}
            <div className="flex items-center gap-4 shrink-0 z-10 bg-white/95 backdrop-blur-md pr-6 py-2 border-r border-neutral-200/30 mask-right">
              <span className="text-sm font-semibold text-neutral-900 hidden sm:block tracking-tight">
                🚀 Lanzamiento EXPELION 2026
              </span>
              <span className="text-sm font-semibold text-neutral-900 sm:hidden tracking-tight">
                🚀 Lanzamiento
              </span>
              
              <motion.div 
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative overflow-hidden rounded-full bg-gradient-to-r from-violet-50 to-violet-100/50 px-3 py-1 border border-violet-200/70 shadow-sm cursor-default"
              >
                <motion.div
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                />
                <span className="relative z-10 text-xs font-bold text-violet-700 tracking-wide">
                  3 meses GRATIS
                </span>
              </motion.div>
            </div>

            {/* Benefits Infinite Marquee (No pause on hover!) */}
            <div className="flex-1 overflow-hidden h-full flex items-center relative">
              <div className="animate-marquee flex items-center min-w-max px-6">
                
                {/* First Set */}
                <div className="flex items-center">
                  <BenefitNoCard />
                  <BenefitCustomImpl />
                  <BenefitSupport />
                  <BenefitTraining />
                  <BenefitUpdates />
                  <BenefitCancel />
                  <BenefitLimited />
                  <CountdownTimer />
                  <PromoCTA />
                </div>
                
                {/* Duplicate Set for Loop */}
                <div className="flex items-center pr-6">
                  <BenefitNoCard />
                  <BenefitCustomImpl />
                  <BenefitSupport />
                  <BenefitTraining />
                  <BenefitUpdates />
                  <BenefitCancel />
                  <BenefitLimited />
                  <CountdownTimer />
                  <PromoCTA />
                </div>

              </div>
            </div>

            {/* Close Button - Fixed on right */}
            <div className="shrink-0 pl-4 z-10 bg-white/95 backdrop-blur-md py-2 border-l border-neutral-200/30 mask-left">
              <button
                onClick={() => setIsVisible(false)}
                className="p-1.5 rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-neutral-800 transition-all duration-300 hover:rotate-90 hover:scale-105 flex items-center justify-center"
                aria-label="Cerrar promoción"
              >
                <X size={15} strokeWidth={2.5} />
              </button>
            </div>

          </div>

          <style dangerouslySetInnerHTML={{__html: `
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 35s linear infinite;
              will-change: transform;
            }
            /* Removing pause-animation to satisfy strict requirement of never stopping */
            
            .backface-hidden {
              backface-visibility: hidden;
              -webkit-backface-visibility: hidden;
            }
            .mask-right {
              mask-image: linear-gradient(to left, transparent, black 24px);
              -webkit-mask-image: linear-gradient(to left, transparent, black 24px);
            }
            .mask-left {
              mask-image: linear-gradient(to right, transparent, black 24px);
              -webkit-mask-image: linear-gradient(to right, transparent, black 24px);
            }
            
            @media (max-width: 640px) {
              .animate-marquee {
                animation-duration: 45s; /* Slower on mobile */
              }
            }
          `}} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
