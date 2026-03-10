import React, { useRef } from "react";
import { Animated, Pressable, View } from "react-native";
import { styled, Text } from "tamagui";
import { LinearGradient } from "expo-linear-gradient";
import { AppIcon } from "@shared/components/AppIcon";
import { FontFamily, Radius, Shadow, Spacing } from "@shared/constants/design";
import { getWorkout } from "@shared/constants/schedule";

// ─── Styled ───────────────────────────────────────────────────────────────────

const BadgeRow = styled(View, {
  flexDirection: "row",
  marginBottom: Spacing.md,
} as any);

const Badge = styled(View, {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.16)",
  paddingHorizontal: Spacing.md,
  paddingVertical: Spacing.xs + 2,
  borderRadius: Radius.full,
  gap: Spacing.sm,
} as any);

const BadgeText = styled(Text, {
  color: "rgba(255,255,255,0.95)",
  fontSize: 13,
} as any);

const BadgeDot = styled(View, {
  width: 5,
  height: 5,
  borderRadius: 3,
  backgroundColor: "rgba(255,255,255,0.6)",
} as any);

const LabelText = styled(Text, {
  color: "rgba(255,255,255,0.75)",
  fontSize: 14,
  marginBottom: Spacing.xs,
} as any);

const DurationText = styled(Text, {
  color: "#fff",
  fontSize: 52,
  letterSpacing: -1.5,
  lineHeight: 58,
} as any);

const DescText = styled(Text, {
  color: "rgba(255,255,255,0.82)",
  fontSize: 14,
  marginTop: Spacing.sm,
  marginBottom: Spacing.xl,
  lineHeight: 20,
} as any);

const CtaText = styled(Text, {
  color: "#fff",
  fontSize: 17,
} as any);

// ─── Types ────────────────────────────────────────────────────────────────────

interface TodayRunCardProps {
  weekId: number;
  dayId: number;
  onPress: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const TodayRunCard = ({ weekId, dayId, onPress }: TodayRunCardProps) => {
  const workout = getWorkout(weekId, dayId);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () =>
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 24,
    }).start();
  const handlePressOut = () =>
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 24,
    }).start();

  if (!workout) return null;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[Shadow.accent, { transform: [{ scale: scaleAnim }] }]}
      >
        <LinearGradient
          colors={["#EAB308", "#FDE047"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{ borderRadius: Radius["2xl"], padding: Spacing["2xl"] }}
        >
          <BadgeRow>
            <Badge>
              <BadgeText style={{ fontFamily: FontFamily.archivoSemiBold }}>
                Week {weekId} → Day {dayId}
              </BadgeText>
              <BadgeDot />
            </Badge>
          </BadgeRow>

          <LabelText style={{ fontFamily: FontFamily.archivo }}>
            Today's Run
          </LabelText>

          <DurationText style={{ fontFamily: FontFamily.michroma }}>
            {workout.totalMinutes} Min
          </DurationText>

          <DescText style={{ fontFamily: FontFamily.archivo }}>
            {workout.description}
          </DescText>

          <Pressable
            onPress={onPress}
            style={({ pressed }) => ({
              backgroundColor: "rgba(0,0,0,0.14)",
              borderRadius: Radius.lg,
              paddingVertical: Spacing.md + 4,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              gap: Spacing.xs,
              opacity: pressed ? 0.85 : 1,
            })}
          >
            <AppIcon name="running" color="#fff" size={20} />
            <CtaText style={{ fontFamily: FontFamily.archivoBold }}>
              Start Run
            </CtaText>
          </Pressable>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
};
