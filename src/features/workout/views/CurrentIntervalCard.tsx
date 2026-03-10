import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { styled, Text } from "tamagui";
import { AppIcon } from "@shared/components/AppIcon";
import { Colors, FontFamily, Radius, Shadow, Spacing } from "@shared/constants/design";
import type { Interval } from "@shared/constants/schedule";

// ─── Styled ───────────────────────────────────────────────────────────────────

const Card = styled(View, {
  borderRadius: Radius.lg,
  padding: Spacing.lg,
  gap: Spacing.md,
  backgroundColor: Colors.surface,
  ...Shadow.lg,
} as any);

const Header = styled(View, {
  flexDirection: "row",
  alignItems: "center",
  gap: Spacing.md,
} as any);

const HeaderText = styled(View, {
  flex: 1,
} as any);

const IntervalType = styled(Text, {
  fontSize: 20,
  letterSpacing: -0.3,
} as any);

const PaceText = styled(Text, {
  fontSize: 13,
  marginTop: 2,
  color: Colors.textSecondary,
} as any);

const ProgressBg = styled(View, {
  height: 8,
  borderRadius: Radius.full,
  overflow: "hidden",
  backgroundColor: Colors.border,
} as any);

const CountdownRow = styled(View, {
  flexDirection: "row",
  alignItems: "center",
  gap: Spacing.sm,
  paddingHorizontal: Spacing.md,
  paddingVertical: Spacing.sm,
  borderRadius: Radius.sm,
} as any);

const CountdownText = styled(Text, {
  fontSize: 13,
} as any);

// ─── Types ────────────────────────────────────────────────────────────────────

interface CurrentIntervalCardProps {
  interval: Interval;
  timeLeft: number;
  countdownActive: boolean;
  paceLabel: string;
}

function getAccent(type: string): string {
  switch (type) {
    case "run": return Colors.run;
    case "walk": return Colors.walk;
    case "warmup": return Colors.warmup;
    case "cooldown": return Colors.cooldown;
    default: return Colors.accent;
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export const CurrentIntervalCard = ({
  interval,
  timeLeft,
  countdownActive,
  paceLabel,
}: CurrentIntervalCardProps) => {
  const accent = getAccent(interval.type);
  const progressAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: timeLeft / interval.duration,
      duration: 900,
      useNativeDriver: false,
    }).start();
  }, [timeLeft]);

  useEffect(() => {
    if (interval.type === "run") {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.02, duration: 700, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
        ])
      );
      loop.start();
      return () => loop.stop();
    }
    pulseAnim.setValue(1);
  }, [interval.type]);

  return (
    <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
      <Card>
        <Header>
          <View
            style={{
              width: 52,
              height: 52,
              borderRadius: 26,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: accent + "22",
            }}
          >
            {interval.type === "run" || interval.type === "walk" ? (
              <AppIcon
                name={interval.type === "run" ? "running" : "walking"}
                size={26}
                color={accent}
                strokeWidth={1.6}
              />
            ) : (
              <AppIcon name="timer" size={24} color={accent} strokeWidth={1.6} />
            )}
          </View>
          <HeaderText>
            <IntervalType style={{ color: accent, fontFamily: FontFamily.archivoBold }}>
              {interval.label}
            </IntervalType>
            <PaceText style={{ fontFamily: FontFamily.archivo }}>{paceLabel}</PaceText>
          </HeaderText>
        </Header>

        <ProgressBg>
          <Animated.View
            style={{
              height: "100%",
              borderRadius: Radius.full,
              backgroundColor: accent,
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            }}
          />
        </ProgressBg>

        {countdownActive && (
          <CountdownRow style={{ backgroundColor: accent + "18" }}>
            <AppIcon name="warning" size={14} color={accent} />
            <CountdownText
              style={{ color: accent, fontFamily: FontFamily.archivoSemiBold }}
            >
              Changing in {timeLeft}s
            </CountdownText>
          </CountdownRow>
        )}
      </Card>
    </Animated.View>
  );
};
