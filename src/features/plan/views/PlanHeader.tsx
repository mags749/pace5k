import React from "react";
import { View } from "react-native";
import { styled, Text } from "tamagui";
import {
  Colors,
  FontFamily,
  Shadow,
  Spacing,
  Radius,
} from "@shared/constants/design";

// ─── Styled ───────────────────────────────────────────────────────────────────

const HeaderRow = styled(View, {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  paddingVertical: Spacing.sm,
} as any);

const TitleText = styled(Text, {
  fontSize: 14,
  marginBottom: 2,
  color: Colors.textTertiary,
} as any);

const GreetingText = styled(Text, {
  fontSize: 28,
  letterSpacing: -0.5,
  color: Colors.textPrimary,
} as any);

const ProgressBadge = styled(View, {
  borderRadius: Radius.md,
  paddingHorizontal: Spacing.md,
  paddingVertical: Spacing.sm + 2,
  alignItems: "center",
  backgroundColor: Colors.surface,
  ...Shadow.md,
} as any);

const ProgressNum = styled(Text, {
  fontSize: 22,
  lineHeight: 28,
  color: Colors.accent,
} as any);

const ProgressLabel = styled(Text, {
  fontSize: 11,
  marginTop: 1,
  color: Colors.textSecondary,
} as any);

// ─── Component ────────────────────────────────────────────────────────────────

interface PlanHeaderProps {
  firstName: string;
  completedCount: number;
}

export const PlanHeader = ({ firstName, completedCount }: PlanHeaderProps) => (
  <HeaderRow>
    <View>
      <TitleText style={{ fontFamily: FontFamily.michroma }}>Pace5K</TitleText>
      <GreetingText style={{ fontFamily: FontFamily.archivoBold }}>
        Hi {firstName} 👋
      </GreetingText>
    </View>
    {completedCount > 0 ? (
      <ProgressBadge>
        <ProgressNum style={{ fontFamily: FontFamily.michroma }}>
          {completedCount}
        </ProgressNum>
        <ProgressLabel style={{ fontFamily: FontFamily.archivo }}>
          runs done
        </ProgressLabel>
      </ProgressBadge>
    ) : (
      <View />
    )}
  </HeaderRow>
);
