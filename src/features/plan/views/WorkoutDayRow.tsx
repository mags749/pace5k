import React from "react";
import { Pressable, View } from "react-native";
import { styled, Text } from "tamagui";
import { AppIcon } from "@shared/components/AppIcon";
import { StatusBadge } from "@shared/components/ui/StatusBadge";
import { Colors, FontFamily, Spacing } from "@shared/constants/design";
import { DAY_LABELS } from "@shared/constants/schedule";

// ─── Styled ───────────────────────────────────────────────────────────────────

const IconWrap = styled(View, {
  width: 44,
  height: 44,
  borderRadius: 22,
  alignItems: "center",
  justifyContent: "center",
} as any);

const ContentView = styled(View, {
  flex: 1,
  gap: 2,
} as any);

const DayLabel = styled(Text, {
  fontSize: 15,
} as any);

const Description = styled(Text, {
  fontSize: 12,
} as any);

// ─── Types ────────────────────────────────────────────────────────────────────

interface WorkoutDayRowProps {
  dayIndex: number;
  description: string;
  completed: boolean;
  isCurrent: boolean;
  unlocked: boolean;
  onPress: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const WorkoutDayRow = ({
  dayIndex,
  description,
  completed,
  isCurrent,
  unlocked,
  onPress,
}: WorkoutDayRowProps) => {
  const badgeVariant = completed ? "completed" : isCurrent ? "current" : "upcoming";

  return (
    <Pressable
      onPress={unlocked ? onPress : undefined}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md + 2,
        gap: Spacing.md,
        opacity: unlocked ? (pressed ? 0.7 : 1) : 0.45,
      })}
    >
      <IconWrap
        style={{
          backgroundColor: completed ? Colors.walkBg : Colors.accentPale,
        } as any}
      >
        <AppIcon
          name={completed ? "medal" : "goal"}
          size={20}
          color={completed ? Colors.walk : Colors.accent}
        />
      </IconWrap>

      <ContentView>
        <DayLabel
          style={{
            color: unlocked ? Colors.textPrimary : Colors.textTertiary,
            fontFamily: FontFamily.archivoSemiBold,
          } as any}
        >
          {DAY_LABELS[dayIndex]}
        </DayLabel>
        <Description
          numberOfLines={1}
          style={{
            color: unlocked ? Colors.textSecondary : Colors.textTertiary,
            fontFamily: FontFamily.archivo,
          } as any}
        >
          {description}
        </Description>
      </ContentView>

      {unlocked ? (
        <StatusBadge variant={badgeVariant} />
      ) : (
        <AppIcon name="lock" size={16} color={Colors.textTertiary} />
      )}

      {unlocked && (
        <AppIcon
          name="chevron-right"
          size={16}
          color={Colors.textTertiary}
          strokeWidth={1.5}
        />
      )}
    </Pressable>
  );
};
