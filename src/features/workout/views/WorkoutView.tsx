import React from "react";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled, Text } from "tamagui";
import { LinearGradient } from "expo-linear-gradient";
import { AppIcon } from "@shared/components/AppIcon";
import {
  Colors,
  FontFamily,
  Radius,
  Shadow,
  Spacing,
} from "@shared/constants/design";
import {
  DAY_LABELS,
  type Interval,
  type Workout,
} from "@shared/constants/schedule";
import type { WorkoutState } from "@features/workout/hooks/useWorkoutTimer";
import { CurrentIntervalCard } from "./CurrentIntervalCard";
import { UpNextCard } from "./UpNextCard";
import { CompletedIntervalRow } from "./CompletedIntervalRow";

// ─── Styled ───────────────────────────────────────────────────────────────────

const Container = styled(SafeAreaView, { flex: 1 } as any);

const HeaderView = styled(View, {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: Spacing.xl,
  paddingVertical: Spacing.md,
} as any);

const HeaderCenter = styled(View, {
  flex: 1,
  alignItems: "center",
} as any);

const HeaderTitle = styled(Text, {
  fontSize: 17,
  color: Colors.textPrimary,
} as any);

const HeaderSub = styled(Text, {
  fontSize: 12,
  marginTop: 2,
  color: Colors.textSecondary,
} as any);

const TimerSection = styled(View, {
  alignItems: "center",
  paddingVertical: Spacing["2xl"],
} as any);

const TotalLabel = styled(Text, {
  fontSize: 14,
  marginTop: Spacing.xs,
  color: Colors.textSecondary,
} as any);

const CompletedList = styled(View, {
  borderRadius: Radius.lg,
  padding: Spacing.lg,
  gap: Spacing.sm,
  backgroundColor: Colors.surface,
  ...Shadow.sm,
} as any);

const Controls = styled(View, {
  paddingHorizontal: Spacing.xl,
  paddingTop: Spacing.lg,
  paddingBottom: Spacing["2xl"],
  borderTopWidth: 1,
  borderTopColor: Colors.border,
  alignItems: "center",
  gap: Spacing.md,
  flexDirection: "row",
  justifyContent: "center",
  backgroundColor: "#FDF6F3",
} as any);

const PausedBanner = styled(View, {
  paddingHorizontal: Spacing.xl,
  paddingVertical: Spacing.sm,
  borderRadius: Radius.full,
  backgroundColor: Colors.accentPale,
  position: "absolute",
  left: 16,
  zIndex: 1,
} as any);

const PausedText = styled(Text, {
  fontSize: 14,
  color: Colors.accent,
} as any);

// ─── Fixed-width digit timer ──────────────────────────────────────────────────

/** Renders MM:SS with each character in its own fixed-width View to prevent layout shift. */
const FixedTimer = ({
  seconds,
  fontSize = 72,
  color = Colors.textPrimary,
  marginBottom,
}: {
  seconds: number;
  fontSize?: number;
  color?: string;
  marginBottom?: number;
}) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  const chars = [
    ...String(m).padStart(2, "0").split(""),
    ":",
    ...String(s).padStart(2, "0").split(""),
  ];
  const digitW = fontSize * 1;
  const colonW = fontSize * 0.32;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom,
      }}
    >
      {chars.map((ch, i) => (
        <View
          key={i}
          style={{
            width: ch === ":" ? colonW : digitW,
            alignItems: "center",
          }}
        >
          <Text
            style={
              {
                fontSize,
                lineHeight: fontSize * 1.12,
                letterSpacing: 1,
                color,
                fontFamily: FontFamily.michroma,
              } as any
            }
          >
            {ch}
          </Text>
        </View>
      ))}
    </View>
  );
};

/** Smaller variant used for secondary timers (e.g. total remaining). */
const FixedTimerSmall = ({
  seconds,
  color = Colors.textSecondary,
}: {
  seconds: number;
  color?: string;
}) => (
  <FixedTimer
    seconds={seconds}
    fontSize={16}
    color={color}
    marginBottom={-Spacing.sm}
  />
);

// ─── Types ────────────────────────────────────────────────────────────────────

interface WorkoutViewProps {
  wId: number;
  dId: number;
  workout: Workout;
  state: WorkoutState;
  currentInterval: Interval | undefined;
  nextInterval: Interval | null;
  completedIntervals: Interval[];
  intervalTimeLeft: number;
  totalTimeRemaining: number;
  countdownActive: boolean;
  isLastInterval: boolean;
  onBack: () => void;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onSkip: () => void;
}

function getPaceLabel(type: string): string {
  switch (type) {
    case "run":
      return "~5:30 / km";
    case "walk":
      return "Brisk walk";
    case "warmup":
      return "Easy walk";
    case "cooldown":
      return "Recovery walk";
    default:
      return "";
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export const WorkoutView = ({
  wId,
  dId,
  state,
  currentInterval,
  nextInterval,
  completedIntervals,
  intervalTimeLeft,
  totalTimeRemaining,
  countdownActive,
  isLastInterval,
  onBack,
  onStart,
  onPause,
  onResume,
  onSkip,
}: WorkoutViewProps) => (
  <LinearGradient
    colors={["#FFD26F", "#FDF6E3"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 0.5, y: 0.5 }}
    style={{ flex: 1 }}
  >
    <Container edges={["top"]}>
      <HeaderView>
        <Pressable
          onPress={onBack}
          style={({ pressed }) => ({
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors.surfaceSecondary,
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <AppIcon
            name="arrow-left"
            size={22}
            color={Colors.textPrimary}
            strokeWidth={1.8}
          />
        </Pressable>
        <HeaderCenter>
          <HeaderTitle style={{ fontFamily: FontFamily.archivoSemiBold }}>
            Running in Progress
          </HeaderTitle>
          <HeaderSub style={{ fontFamily: FontFamily.archivo }}>
            Week {wId} · {DAY_LABELS[dId - 1]}
          </HeaderSub>
        </HeaderCenter>
        <View style={{ width: 40 }} />
      </HeaderView>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: Spacing.xl,
          gap: Spacing.md,
          paddingBottom: Spacing["4xl"],
        }}
        showsVerticalScrollIndicator={false}
      >
        <TimerSection>
          <FixedTimer seconds={intervalTimeLeft} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: Spacing.xs,
              marginTop: Spacing.xs,
            }}
          >
            <TotalLabel style={{ fontFamily: FontFamily.michroma }}>
              {isLastInterval ? " " : "Remaining: "}
            </TotalLabel>
            {!isLastInterval && (
              <FixedTimerSmall seconds={totalTimeRemaining} />
            )}
          </View>
        </TimerSection>

        {currentInterval && (
          <CurrentIntervalCard
            interval={currentInterval}
            timeLeft={intervalTimeLeft}
            countdownActive={countdownActive}
            paceLabel={getPaceLabel(currentInterval.type)}
          />
        )}

        {nextInterval && <UpNextCard interval={nextInterval} />}

        {completedIntervals.length > 0 && (
          <CompletedList>
            {completedIntervals.map((iv, idx) => (
              <CompletedIntervalRow key={idx} interval={iv} />
            ))}
          </CompletedList>
        )}
      </ScrollView>

      <Controls>
        {state === "paused" && (
          <PausedBanner>
            <PausedText style={{ fontFamily: FontFamily.archivoSemiBold }}>
              Paused
            </PausedText>
          </PausedBanner>
        )}
        <Pressable
          onPress={
            state === "idle"
              ? onStart
              : state === "running"
                ? onPause
                : onResume
          }
          style={({ pressed }) => ({
            width: 80,
            height: 80,
            borderRadius: 40,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors.accent,
            opacity: pressed ? 0.85 : 1,
            ...Shadow.accent,
          })}
        >
          <AppIcon
            name={state === "running" ? "pause" : "play"}
            size={36}
            color={Colors.accentForeground}
            strokeWidth={1.5}
          />
        </Pressable>
        {state !== "idle" && (
          <Pressable
            onPress={onSkip}
            style={({ pressed }) => ({
              width: 56,
              height: 56,
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Colors.surfaceSecondary,
              position: "absolute",
              right: 16,
              zIndex: 1,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <AppIcon
              name={isLastInterval ? "badge-check" : "skip-forward"}
              size={32}
              color={Colors.textPrimary}
              strokeWidth={1.8}
            />
          </Pressable>
        )}
      </Controls>
    </Container>
  </LinearGradient>
);
