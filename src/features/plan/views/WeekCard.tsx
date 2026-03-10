import React from "react";
import { View } from "react-native";
import { styled } from "tamagui";
import { Colors, Radius, Shadow, Spacing } from "@shared/constants/design";

// ─── Styled ───────────────────────────────────────────────────────────────────

export const WeekCard = styled(View, {
  borderRadius: Radius.lg,
  overflow: "hidden",
  backgroundColor: Colors.surface,
  ...Shadow.sm,
} as any);

export const RowDivider = styled(View, {
  height: 1,
  marginHorizontal: Spacing.lg,
  backgroundColor: Colors.separator,
} as any);
