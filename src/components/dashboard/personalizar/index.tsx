"use client";

import { motion } from "framer-motion";

import ThemeActionBar from "@/components/dashboard/personalizar/actions/ThemeActionBar";
import ThemePreview from "@/components/dashboard/personalizar/preview/ThemePreview";
import AppearanceSection from "@/components/dashboard/personalizar/sections/AppearanceSection";
import BrandSection from "@/components/dashboard/personalizar/sections/BrandSection";
import DensitySection from "@/components/dashboard/personalizar/sections/DensitySection";
import SurfaceSection from "@/components/dashboard/personalizar/sections/SurfaceSection";
import TypographySection from "@/components/dashboard/personalizar/sections/TypographySection";
import { useThemeContext } from "@/components/providers/ThemeProvider";

import {
  personalizarActionBarVariants,
  personalizarHeaderVariants,
  personalizarLayoutVariants,
  personalizarPageVariants,
  personalizarPreviewVariants,
  personalizarSectionVariants,
} from "./animations/personalizar.motion";

const SECTIONS = [
  <AppearanceSection key="appearance" />,
  <BrandSection key="brand" />,
  <TypographySection key="typography" />,
  <SurfaceSection key="surface" />,
  <DensitySection key="density" />,
];

export default function Personalizar() {
  const { isLoading, hasChanges } = useThemeContext();

  return (
    <motion.div
      className="flex flex-col px-4 py-4 md:px-5 md:py-5 xl:px-6 xl:py-5"
      style={{ gap: "16px" }}
      variants={personalizarPageVariants}
      initial="hidden"
      animate="show"
    >
      
      <motion.header
        className="space-y-2"
        variants={personalizarHeaderVariants}
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-1">
            <p
              className="max-w-2xl text-sm leading-6"
              style={{ color: "var(--text-muted)" }}
            >
              Ajusta la apariencia global del dashboard con un sistema de tema
              controlado, consistente y persistente.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 lg:justify-end">
            <span
              className="rounded-full px-3 py-1.5 text-xs font-medium"
              style={{
                backgroundColor: "var(--primary-soft)",
                color: "var(--primary)",
              }}
            >
              Tema global
            </span>

            <span
              className="rounded-full px-3 py-1.5 text-xs font-medium"
              style={{
                backgroundColor: isLoading
                  ? "var(--background)"
                  : hasChanges
                  ? "color-mix(in srgb, var(--primary) 16%, var(--card))"
                  : "var(--primary-soft)",
                color: isLoading ? "var(--foreground)" : "var(--primary)",
                border: "1px solid var(--border)",
              }}
            >
              {isLoading
                ? "Cargando configuración"
                : hasChanges
                ? "Cambios sin guardar"
                : "Configuración al día"}
            </span>
          </div>
        </div>
      </motion.header>

      <motion.div
        className="grid items-start gap-4 2xl:grid-cols-[minmax(0,1fr)_420px]"
        variants={personalizarLayoutVariants}
      >
        <div className="min-w-0 space-y-4">
          {SECTIONS.map((section, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={personalizarSectionVariants}
            >
              {section}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="min-w-0 2xl:sticky 2xl:top-4"
          variants={personalizarPreviewVariants}
        >
          <ThemePreview />
        </motion.div>
      </motion.div>

      <motion.div variants={personalizarActionBarVariants}>
        <ThemeActionBar />
      </motion.div>
    </motion.div>
  );
}
