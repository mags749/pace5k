import React from "react";
import { View } from "react-native";
import { styled, Text } from "tamagui";
import { AppIcon } from "@shared/components/AppIcon";
import { Colors, FontFamily, Spacing } from "@shared/constants/design";
import { formatTimer, type Interval } from "@shared/constants/schedule";

// ─── Styled ───────────────────────────────────────────────────────────────────

const Row = styled(View, {
  flexDirection: "row",
  alignItems: "center",
  gap: Spacing.sm,
} as any);

const RowText = styled(Text, {
  fontSize: 14,
  color: Colors.textSecondary,
} as any);

// ─── Types ────────────────────────────────────────────────────────────────────

interface CompletedIntervalRowProps {
  interval: Interval;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const CompletedIntervalRow = ({ interval }: CompletedIntervalRowProps) => (
  <Row>
    <AppIcon name="check-circle" size={16} color={Colors.walk} strokeWidth={1.5} />
    <RowText style={{ fontFamily: FontFamily.archivo }}>
      {formatTimer(interval.duration)} {interval.label.toLowerCase()}
    </RowText>
  </Row>
);
