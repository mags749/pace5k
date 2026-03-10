import React from "react";
import { Pressable, View } from "react-native";
import { styled, Text } from "tamagui";
import { Colors, FontFamily, Radius, Shadow, Spacing } from "@shared/constants/design";
import { TOTAL_WORKOUTS } from "@shared/constants/schedule";

// ─── Styled ───────────────────────────────────────────────────────────────────

const SectionRow = styled(View, {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: Spacing.sm,
} as any);

const SectionTitle = styled(Text, {
  fontSize: 18,
  letterSpacing: -0.2,
  color: Colors.textPrimary,
} as any);

const SectionSub = styled(Text, {
  fontSize: 12,
  marginTop: 2,
  color: Colors.textTertiary,
} as any);

const TogglePill = styled(View, {
  flexDirection: "row",
  borderRadius: Radius.full,
  padding: 3,
  backgroundColor: Colors.surface,
  ...Shadow.sm,
} as any);

const ToggleText = styled(Text, {
  fontSize: 12,
} as any);

// ─── Types ────────────────────────────────────────────────────────────────────

type ViewMode = "this_week" | "full_plan";

interface PlanSectionHeaderProps {
  currentWeekId: number;
  completedCount: number;
  viewMode: ViewMode;
  onToggle: (mode: ViewMode) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const PlanSectionHeader = ({
  currentWeekId,
  completedCount,
  viewMode,
  onToggle,
}: PlanSectionHeaderProps) => (
  <SectionRow>
    <View>
      <SectionTitle style={{ fontFamily: FontFamily.archivoSemiBold }}>
        Week {currentWeekId}
      </SectionTitle>
      <SectionSub style={{ fontFamily: FontFamily.archivo }}>
        Week {currentWeekId} / 9 · {completedCount} / {TOTAL_WORKOUTS} runs
      </SectionSub>
    </View>
    <TogglePill>
      {(["this_week", "full_plan"] as const).map((mode) => (
        <Pressable
          key={mode}
          style={({ pressed }) => ({
            backgroundColor: viewMode === mode ? Colors.accent : "transparent",
            paddingHorizontal: Spacing.md,
            paddingVertical: Spacing.xs + 2,
            borderRadius: Radius.full,
            opacity: pressed ? 0.8 : 1,
          })}
          onPress={() => onToggle(mode)}
        >
          <ToggleText
            style={{
              fontFamily: FontFamily.archivoSemiBold,
              color: viewMode === mode ? Colors.accentForeground : Colors.textSecondary,
            } as any}
          >
            {mode === "this_week" ? "This Week" : "Full Plan"}
          </ToggleText>
        </Pressable>
      ))}
    </TogglePill>
  </SectionRow>
);
