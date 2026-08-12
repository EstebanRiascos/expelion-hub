"use client";

import { useEffect, useState } from "react";

const sections = [
  "inicio",
  "about",
  "servicios",
  "proceso",
  "portal",
  "contacto",
];

export default function useActiveSection() {
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const element = document.getElementById(id);

      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          threshold: 0.45,
        }
      );

      observer.observe(element);

      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return activeSection;
}