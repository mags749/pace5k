import React from "react";
import { View } from "react-native";
import { styled, Text } from "tamagui";
import { Colors, FontFamily, Radius, Spacing } from "@shared/constants/design";

// ─── Styled ───────────────────────────────────────────────────────────────────

const Row = styled(View, {
  flexDirection: "row",
  alignItems: "center",
  gap: Spacing.sm,
  marginTop: Spacing.lg,
  marginBottom: Spacing.sm,
} as any);

const Pill = styled(View, {
  paddingHorizontal: Spacing.sm + 2,
  paddingVertical: 3,
  borderRadius: Radius.full,
  backgroundColor: Colors.accent,
} as any);

const PillText = styled(Text, {
  color: "#fff",
  fontSize: 11,
} as any);

const WeekTitleText = styled(Text, {
  fontSize: 14,
  color: Colors.textSecondary,
} as any);

// ─── Component ────────────────────────────────────────────────────────────────

interface WeekLabelProps {
  weekId: number;
  title: string;
}

export const WeekLabel = ({ weekId, title }: WeekLabelProps) => (
  <Row>
    <Pill>
      <PillText style={{ fontFamily: FontFamily.archivoBold }}>
        Week {weekId}
      </PillText>
    </Pill>
    <WeekTitleText style={{ fontFamily: FontFamily.archivoMedium }}>
      {title}
    </WeekTitleText>
  </Row>
);
