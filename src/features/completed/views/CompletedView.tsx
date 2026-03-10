import { format } from "date-fns";
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled, Text } from "tamagui";
import { AppIcon } from "@shared/components/AppIcon";
import { Colors, FontFamily, Radius, Shadow, Spacing } from "@shared/constants/design";
import {
  DAY_LABELS,
  formatTimer,
  type Workout,
} from "@shared/constants/schedule";
import type { WorkoutCompletion } from "@shared/types";
import { MedalBadge } from "./MedalBadge";
import { ConfettiLayer } from "./ConfettiLayer";
import { StatCard } from "./StatCard";

// ─── Styled ───────────────────────────────────────────────────────────────────

const Container = styled(SafeAreaView, { flex: 1 } as any);

const PrimaryBtnText = styled(Text, {
  fontSize: 17,
  color: Colors.accentForeground,
} as any);

const SecondaryBtnText = styled(Text, {
  fontSize: 15,
  color: Colors.accent,
} as any);

// ─── Types ────────────────────────────────────────────────────────────────────

interface CompletedViewProps {
  wId: number;
  dId: number;
  workout: Workout | undefined;
  completion: WorkoutCompletion | undefined;
  isLastWorkout: boolean;
  hasNextWorkout: boolean;
  onNextRun: () => void;
  onRedo: () => void;
  onHome: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const CompletedView = ({
  wId,
  dId,
  workout,
  completion,
  isLastWorkout,
  hasNextWorkout,
  onNextRun,
  onRedo,
  onHome,
}: CompletedViewProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(slideAnim, {
        toValue: 0,
        speed: 12,
        bounciness: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const totalTime = completion ? formatTimer(completion.totalTimeSeconds) : "--:--";
  const completedAt = completion
    ? format(new Date(completion.completedAt), "MMM d, yyyy · h:mm a")
    : "Just completed";

  const runIntervals = workout?.intervals.filter((iv) => iv.type === "run") ?? [];
  const totalRunSecs = runIntervals.reduce((a, b) => a + b.duration, 0);

  const animated = { opacity: fadeAnim, transform: [{ translateY: slideAnim }] };

  return (
    <LinearGradient
      colors={["#FFDE91", "#FFFFFF"]}
      locations={[0, 0.4]}
      style={{ flex: 1 }}
    >
      <Container edges={["top", "bottom"]}>
        <ConfettiLayer />

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: Spacing["2xl"],
            paddingTop: Spacing.xl,
            paddingBottom: Spacing["3xl"],
            alignItems: "center",
            gap: Spacing.xl,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginTop: Spacing.lg, marginBottom: Spacing.sm }}>
            <MedalBadge isLast={isLastWorkout} />
          </View>

          {/* Headline */}
          <Animated.View style={[{ alignItems: "center", gap: Spacing.sm }, animated]}>
            <Text
              style={{
                fontSize: 30,
                letterSpacing: -0.5,
                textAlign: "center",
                lineHeight: 36,
                color: Colors.textPrimary,
                fontFamily: FontFamily.archivoBold,
              } as any}
            >
              Week {wId}, Day {dId}{"\n"}Complete!
            </Text>
            <Text
              style={{
                fontSize: 52,
                letterSpacing: -2,
                lineHeight: 58,
                color: Colors.accent,
                fontFamily: FontFamily.michroma,
              } as any}
            >
              {totalTime}
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "center",
                lineHeight: 22,
                maxWidth: 300,
                color: Colors.textSecondary,
                fontFamily: FontFamily.archivo,
              } as any}
            >
              {isLastWorkout
                ? "You completed the entire C25K program! 🏆"
                : "Great job! Keep it up and you'll be ready for your first 5K!"}
            </Text>
            <Text
              style={{
                fontSize: 12,
                letterSpacing: 0.2,
                color: Colors.textTertiary,
                fontFamily: FontFamily.archivo,
              } as any}
            >
              {completedAt}
            </Text>
          </Animated.View>

          {/* Stats */}
          <Animated.View style={[{ flexDirection: "row", gap: Spacing.sm, width: "100%" }, animated]}>
            <StatCard value={totalTime} label="Total Time" highlight={true} />
            <StatCard value={formatTimer(totalRunSecs)} label="Run Time" highlight={false} />
            <StatCard value={`${runIntervals.length}`} label="Intervals" highlight={false} />
          </Animated.View>

          {/* Recap card */}
          <Animated.View
            style={[
              {
                borderRadius: Radius.lg,
                padding: Spacing.xl,
                width: "100%",
                gap: Spacing.sm,
                backgroundColor: Colors.surface,
              },
              Shadow.sm,
              animated,
            ]}
          >
            <Text
              style={{ fontSize: 16, color: Colors.textPrimary, fontFamily: FontFamily.archivoSemiBold } as any}
            >
              Recap
            </Text>
            <Text
              style={{ fontSize: 13, lineHeight: 18, color: Colors.textSecondary, fontFamily: FontFamily.archivo } as any}
            >
              {workout?.description}
            </Text>

            <View style={{ flexDirection: "row", height: 10, borderRadius: Radius.full, overflow: "hidden", gap: 1 }}>
              {workout?.intervals
                .filter((iv) => iv.type !== "warmup" && iv.type !== "cooldown")
                .map((iv, idx) => (
                  <View
                    key={idx}
                    style={{
                      flex: iv.duration,
                      backgroundColor: iv.type === "run" ? Colors.run : Colors.walk,
                      borderRadius: Radius.full,
                      minWidth: 3,
                    }}
                  />
                ))}
            </View>

            <View style={{ flexDirection: "row", gap: Spacing.lg }}>
              {[
                { color: Colors.run, label: "Run" },
                { color: Colors.walk, label: "Walk" },
              ].map(({ color, label }) => (
                <View key={label} style={{ flexDirection: "row", alignItems: "center", gap: Spacing.xs }}>
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: color }} />
                  <Text style={{ fontSize: 12, color: Colors.textSecondary, fontFamily: FontFamily.archivo } as any}>
                    {label}
                  </Text>
                </View>
              ))}
            </View>
          </Animated.View>

          {/* Next workout preview */}
          {hasNextWorkout && !isLastWorkout && (
            <Animated.View
              style={[
                {
                  borderRadius: Radius.lg,
                  padding: Spacing.lg,
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  backgroundColor: Colors.surface,
                },
                Shadow.sm,
                animated,
              ]}
            >
              <View style={{ flex: 1, gap: 2 }}>
                <Text style={{ fontSize: 11, letterSpacing: 1, color: Colors.textTertiary, fontFamily: FontFamily.archivoSemiBold } as any}>
                  UP NEXT
                </Text>
                <Text style={{ fontSize: 16, color: Colors.textPrimary, fontFamily: FontFamily.archivoSemiBold } as any}>
                  Week {wId}, Day {dId + 1 <= 3 ? dId + 1 : 1} —{" "}
                  {DAY_LABELS[dId <= 2 ? dId : 0]}
                </Text>
                <Text style={{ fontSize: 12, color: Colors.accent, fontFamily: FontFamily.archivo } as any}>
                  Tomorrow
                </Text>
              </View>
              <AppIcon name="chevron-right" size={20} color={Colors.textTertiary} />
            </Animated.View>
          )}

          {/* Actions */}
          <Animated.View style={[{ width: "100%", gap: Spacing.md }, animated]}>
            {hasNextWorkout && !isLastWorkout ? (
              <Pressable
                onPress={onNextRun}
                style={({ pressed }) => ({
                  borderRadius: Radius.lg,
                  paddingVertical: Spacing.lg + 2,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: Spacing.sm,
                  backgroundColor: Colors.accent,
                  opacity: pressed ? 0.85 : 1,
                  ...Shadow.accent,
                })}
              >
                <AppIcon name="running" size={20} color={Colors.accentForeground} strokeWidth={1.6} />
                <PrimaryBtnText style={{ fontFamily: FontFamily.archivoBold } as any}>
                  Next Run
                </PrimaryBtnText>
              </Pressable>
            ) : isLastWorkout ? (
              <Pressable
                onPress={onHome}
                style={({ pressed }) => ({
                  borderRadius: Radius.lg,
                  paddingVertical: Spacing.lg + 2,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: Spacing.sm,
                  backgroundColor: Colors.accent,
                  opacity: pressed ? 0.85 : 1,
                  ...Shadow.accent,
                })}
              >
                <AppIcon name="trophy" size={20} color={Colors.accentForeground} />
                <PrimaryBtnText style={{ fontFamily: FontFamily.archivoBold } as any}>
                  View My Journey
                </PrimaryBtnText>
              </Pressable>
            ) : null}

            <View style={{ flexDirection: "row", gap: Spacing.md }}>
              <Pressable
                onPress={onRedo}
                style={({ pressed }) => ({
                  flex: 1,
                  borderRadius: Radius.lg,
                  paddingVertical: Spacing.md + 2,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: Spacing.sm,
                  backgroundColor: Colors.surface,
                  borderWidth: 1.5,
                  borderColor: Colors.accent + "30",
                  opacity: pressed ? 0.75 : 1,
                  ...Shadow.sm,
                })}
              >
                <AppIcon name="refresh" size={16} color={Colors.accent} strokeWidth={1.8} />
                <SecondaryBtnText style={{ fontFamily: FontFamily.archivoMedium } as any}>
                  Redo
                </SecondaryBtnText>
              </Pressable>
              <Pressable
                onPress={onHome}
                style={({ pressed }) => ({
                  flex: 1,
                  borderRadius: Radius.lg,
                  paddingVertical: Spacing.md + 2,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: Spacing.sm,
                  backgroundColor: Colors.surface,
                  borderWidth: 1.5,
                  borderColor: Colors.accent + "30",
                  opacity: pressed ? 0.75 : 1,
                  ...Shadow.sm,
                })}
              >
                <AppIcon name="home" size={16} color={Colors.accent} strokeWidth={1.8} />
                <SecondaryBtnText style={{ fontFamily: FontFamily.archivoMedium } as any}>
                  Home
                </SecondaryBtnText>
              </Pressable>
            </View>
          </Animated.View>
        </ScrollView>
      </Container>
    </LinearGradient>
  );
};
