import { createTamagui, createFont, createTokens } from "tamagui";
import { shorthands } from "@tamagui/shorthands";

// ─── Fonts ────────────────────────────────────────────────────────────────────

const archivoFont = createFont({
  family: "Archivo_400Regular",
  size: {
    1: 10,
    2: 11,
    3: 12,
    4: 13,
    5: 14,
    6: 15,
    7: 17,
    8: 18,
    9: 20,
    10: 22,
    true: 14,
  },
  lineHeight: {
    1: 14,
    2: 16,
    3: 18,
    4: 18,
    5: 20,
    6: 22,
    7: 26,
    8: 26,
    9: 28,
    10: 30,
    true: 20,
  },
  weight: {
    1: "300",
    4: "400",
    6: "600",
    7: "700",
    true: "400",
  },
  letterSpacing: {
    1: 0,
    true: 0,
  },
  face: {
    300: { normal: "Archivo_300Light" },
    400: { normal: "Archivo_400Regular" },
    500: { normal: "Archivo_500Medium" },
    600: { normal: "Archivo_600SemiBold" },
    700: { normal: "Archivo_700Bold" },
  },
});

const michromaFont = createFont({
  family: "Michroma_400Regular",
  size: {
    1: 12,
    2: 14,
    3: 18,
    4: 22,
    5: 36,
    6: 52,
    7: 72,
    true: 14,
  },
  lineHeight: {
    1: 16,
    2: 20,
    3: 24,
    4: 28,
    5: 44,
    6: 58,
    7: 80,
    true: 20,
  },
  weight: {
    400: "400",
    true: "400",
  },
  letterSpacing: {
    1: -0.5,
    2: -1,
    3: -1.5,
    true: 0,
  },
  face: {
    400: { normal: "Michroma_400Regular" },
  },
});

// ─── Tokens ───────────────────────────────────────────────────────────────────

const tokens = createTokens({
  size: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 32,
    8: 40,
    9: 48,
    10: 64,
    true: 16,
  },
  space: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 32,
    8: 40,
    9: 48,
    10: 64,
    true: 16,
  },
  radius: {
    0: 0,
    1: 8,
    2: 12,
    3: 16,
    4: 22,
    5: 28,
    full: 9999,
    true: 8,
  },
  zIndex: {
    0: 0,
    1: 100,
    2: 200,
    3: 300,
    4: 400,
    5: 500,
  },
  color: {
    // Backgrounds
    background: "#FAF8F4",
    surface: "#FFFFFF",
    surfaceSecondary: "#F5F2EC",
    surfaceElevated: "#FFFFFF",

    // Text
    textPrimary: "#1C1C1E",
    textSecondary: "#6B6B6B",
    textTertiary: "#ABABAB",
    textInverse: "#FFFFFF",

    // Borders
    border: "#EDE9E2",
    borderStrong: "#D9D4CC",
    separator: "#EDE9E2",

    // Brand / accent
    accent: "#F0A500",
    accentForeground: "#FFFFFF",
    accentPale: "#FEF3D7",
    accentDark: "#D48F00",

    // Interval colours
    run: "#F0A500",
    runBg: "#FEF3D7",
    walk: "#34C759",
    walkBg: "#F0FBF2",
    warmup: "#FF9F0A",
    warmupBg: "#FFF4E5",
    cooldown: "#5AC8FA",
    cooldownBg: "#EBF8FF",

    // States
    error: "#EF4444",
    success: "#22C55E",
    warning: "#F59E0B",

    // Misc
    overlay: "rgba(0,0,0,0.04)",
    white: "#FFFFFF",
    black: "#000000",
    transparent: "transparent",
  },
});

// ─── Theme (single, no dark/light) ───────────────────────────────────────────

const appTheme = {
  background: tokens.color.background,
  color: tokens.color.textPrimary,
  borderColor: tokens.color.border,
};

// ─── Config ───────────────────────────────────────────────────────────────────

const tamaguiConfig = createTamagui({
  fonts: {
    body: archivoFont,
    heading: archivoFont,
    mono: michromaFont,
  },
  tokens,
  themes: {
    app: appTheme,
  },
  shorthands,
  defaultTheme: "app",
  media: {
    sm: { maxWidth: 380 },
    md: { maxWidth: 768 },
  },
  settings: {
    allowedStyleValues: "somewhat-strict",
    autocompleteSpecificTokens: "except-special",
  },
});

export type AppConfig = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig;
