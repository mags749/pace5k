import React from "react";
import { View } from "react-native";
import { styled, Text } from "tamagui";
import { Colors, FontFamily, Radius, Spacing } from "@shared/constants/design";

// ─── Types ────────────────────────────────────────────────────────────────────

type BadgeVariant = "completed" | "current" | "upcoming";

interface StatusBadgeProps {
  variant: BadgeVariant;
}

const LABELS: Record<BadgeVariant, string> = {
  completed: "Completed",
  current: "Up Next",
  upcoming: "Upcoming",
};

// ─── Styled ───────────────────────────────────────────────────────────────────

const Badge = styled(View, {
  paddingHorizontal: Spacing.sm + 2,
  paddingVertical: Spacing.xs,
  borderRadius: Radius.full,
} as any);

const LabelText = styled(Text, {
  fontSize: 11,
  letterSpacing: 0.3,
} as any);

// ─── Component ────────────────────────────────────────────────────────────────

export const StatusBadge = ({ variant }: StatusBadgeProps) => {
  const bgColor =
    variant === "completed"
      ? Colors.walkBg
      : variant === "current"
      ? Colors.accentPale
      : Colors.surfaceSecondary;

  const textColor =
    variant === "completed"
      ? Colors.walk
      : variant === "current"
      ? Colors.accent
      : Colors.textTertiary;

  return (
    <Badge style={{ backgroundColor: bgColor } as any}>
      <LabelText style={{ color: textColor, fontFamily: FontFamily.archivoSemiBold } as any}>
        {LABELS[variant]}
      </LabelText>
    </Badge>
  );
};
