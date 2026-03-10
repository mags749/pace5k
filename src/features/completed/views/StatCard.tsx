import React from "react";
import { View } from "react-native";
import { styled, Text } from "tamagui";
import { Colors, FontFamily, Radius, Shadow, Spacing } from "@shared/constants/design";

// ─── Styled ───────────────────────────────────────────────────────────────────

const Card = styled(View, {
  flex: 1,
  borderRadius: Radius.lg,
  padding: Spacing.md,
  alignItems: "center",
  ...Shadow.sm,
} as any);

const ValueText = styled(Text, {
  fontSize: 18,
  letterSpacing: -0.5,
} as any);

const LabelText = styled(Text, {
  fontSize: 10,
  marginTop: 4,
  letterSpacing: 0.8,
  color: Colors.textTertiary,
} as any);

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatCardProps {
  value: string;
  label: string;
  highlight: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const StatCard = ({ value, label, highlight }: StatCardProps) => (
  <Card
    style={{
      backgroundColor: highlight ? Colors.accentPale : Colors.surface,
      borderWidth: highlight ? 1.5 : 0,
      borderColor: highlight ? Colors.accent + "40" : "transparent",
    } as any}
  >
    <ValueText
      style={{
        color: highlight ? Colors.accent : Colors.textPrimary,
        fontFamily: FontFamily.michroma,
      } as any}
    >
      {value}
    </ValueText>
    <LabelText style={{ fontFamily: FontFamily.archivoSemiBold } as any}>
      {label.toUpperCase()}
    </LabelText>
  </Card>
);
