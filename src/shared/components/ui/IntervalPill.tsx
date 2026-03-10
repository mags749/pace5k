import React from "react";
import { View } from "react-native";
import { styled, Text } from "tamagui";
import { AppIcon } from "@shared/components/AppIcon";
import type { IntervalType } from "@shared/constants/schedule";
import { Colors, FontFamily, Radius, Spacing } from "@shared/constants/design";

// ─── Types ────────────────────────────────────────────────────────────────────

interface IntervalPillProps {
  type: IntervalType;
  label: string;
}

// ─── Styled ───────────────────────────────────────────────────────────────────

const Pill = styled(View, {
  flexDirection: "row",
  alignItems: "center",
  gap: Spacing.xs,
  paddingHorizontal: Spacing.sm + 2,
  paddingVertical: Spacing.xs,
  borderRadius: Radius.full,
} as any);

const LabelText = styled(Text, {
  fontSize: 12,
  letterSpacing: 0.5,
} as any);

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getColors(type: IntervalType) {
  switch (type) {
    case "run": return { bg: Colors.runBg, text: Colors.run };
    case "walk": return { bg: Colors.walkBg, text: Colors.walk };
    case "warmup": return { bg: Colors.warmupBg, text: Colors.warmup };
    case "cooldown": return { bg: Colors.cooldownBg, text: Colors.cooldown };
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export const IntervalPill = ({ type, label }: IntervalPillProps) => {
  const { bg, text } = getColors(type);
  const icon = type === "run" ? "running" : type === "walk" ? "walking" : undefined;

  return (
    <Pill style={{ backgroundColor: bg } as any}>
      {icon && <AppIcon name={icon} size={14} color={text} strokeWidth={1.8} />}
      <LabelText style={{ color: text, fontFamily: FontFamily.archivoSemiBold } as any}>
        {label}
      </LabelText>
    </Pill>
  );
};
