import React from "react";
import { View } from "react-native";
import { styled, Text } from "tamagui";
import { AppIcon } from "@shared/components/AppIcon";
import {
  Colors,
  FontFamily,
  Radius,
  Shadow,
  Spacing,
} from "@shared/constants/design";
import { formatTimer, type Interval } from "@shared/constants/schedule";

// ─── Styled ───────────────────────────────────────────────────────────────────

const Card = styled(View, {
  borderRadius: Radius.lg,
  padding: Spacing.lg,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: Colors.surface,
  ...Shadow.sm,
} as any);

const Left = styled(View, {
  gap: Spacing.xs,
} as any);

const LabelText = styled(Text, {
  fontSize: 11,
  letterSpacing: 1,
  color: Colors.textTertiary,
} as any);

const Row = styled(View, {
  flexDirection: "row",
  alignItems: "center",
  gap: Spacing.sm,
} as any);

const TypeText = styled(Text, {
  fontSize: 18,
  color: Colors.textPrimary,
} as any);

const DurationText = styled(Text, {
  fontSize: 20,
  color: Colors.textSecondary,
  fontFamily: FontFamily.michroma,
  marginBottom: -Spacing.md,
} as any);

// ─── Types ────────────────────────────────────────────────────────────────────

interface UpNextCardProps {
  interval: Interval;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const UpNextCard = ({ interval }: UpNextCardProps) => {
  const accentColor =
    interval.type === "run"
      ? Colors.run
      : interval.type === "walk"
        ? Colors.walk
        : interval.type === "warmup"
          ? Colors.warmup
          : Colors.cooldown;

  const icon =
    interval.type === "run"
      ? "running"
      : interval.type === "walk"
        ? "walking"
        : "timer";

  return (
    <Card>
      <Left>
        <LabelText style={{ fontFamily: FontFamily.archivoSemiBold }}>
          UP NEXT
        </LabelText>
        <Row>
          <AppIcon
            name={icon as any}
            size={22}
            color={accentColor}
            strokeWidth={1.6}
          />
          <TypeText style={{ fontFamily: FontFamily.archivoSemiBold }}>
            {interval.label}
          </TypeText>
        </Row>
      </Left>
      <DurationText>{formatTimer(interval.duration)}</DurationText>
    </Card>
  );
};
