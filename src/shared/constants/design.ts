// ─── Design Tokens ────────────────────────────────────────────────────────────
// C25K / Pace5K — warm amber, soft cream

export const Colors = {
  background: "#FAF8F4",
  surface: "#FFFFFF",
  surfaceSecondary: "#F5F2EC",
  surfaceElevated: "#FFFFFF",
  textPrimary: "#1C1C1E",
  textSecondary: "#6B6B6B",
  textTertiary: "#ABABAB",
  textInverse: "#FFFFFF",
  border: "#EDE9E2",
  borderStrong: "#D9D4CC",
  separator: "#EDE9E2",
  accent: "#F0A500",
  accentForeground: "#FFFFFF",
  accentPale: "#FEF3D7",
  accentDark: "#D48F00",
  run: "#F0A500",
  runBg: "#FEF3D7",
  walk: "#34C759",
  walkBg: "#F0FBF2",
  warmup: "#FF9F0A",
  warmupBg: "#FFF4E5",
  cooldown: "#5AC8FA",
  cooldownBg: "#EBF8FF",
  error: "#EF4444",
  success: "#22C55E",
  warning: "#F59E0B",
  overlay: "rgba(0,0,0,0.04)",
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
  "6xl": 64,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 22,
  "2xl": 28,
  full: 9999,
} as const;

export const FontFamily = {
  archivo: "Archivo_400Regular",
  archivoLight: "Archivo_300Light",
  archivoMedium: "Archivo_500Medium",
  archivoSemiBold: "Archivo_600SemiBold",
  archivoBold: "Archivo_700Bold",
  michroma: "Michroma_400Regular",
} as const;

export const Shadow = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  accent: {
    shadowColor: "#F0A500",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;
