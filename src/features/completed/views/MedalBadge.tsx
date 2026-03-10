import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { styled } from "tamagui";
import { AppIcon } from "@shared/components/AppIcon";
import { Shadow } from "@shared/constants/design";
import { Colors } from "@shared/constants/design";

// ─── Styled ───────────────────────────────────────────────────────────────────

const Outer = styled(View, {
  alignItems: "center",
  justifyContent: "center",
} as any);

// ─── Types ────────────────────────────────────────────────────────────────────

interface MedalBadgeProps {
  isLast: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const MedalBadge = ({ isLast }: MedalBadgeProps) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const badgeColor = isLast ? "#FFD700" : Colors.accent;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 55,
      friction: 5,
      delay: 200,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -6, duration: 1800, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 1800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        alignItems: "center",
        justifyContent: "center",
        transform: [{ scale: scaleAnim }, { translateY: floatAnim }],
      }}
    >
      <View
        style={{
          position: "absolute",
          width: 110,
          height: 110,
          borderRadius: 55,
          backgroundColor: badgeColor + "22",
        }}
      />
      <View
        style={{
          width: 90,
          height: 90,
          borderRadius: 45,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: badgeColor,
          ...Shadow.accent,
        }}
      >
        {isLast ? (
          <AppIcon name="trophy" size={46} color="#fff" strokeWidth={1.4} />
        ) : (
          <AppIcon name="check-circle" size={46} color="#fff" strokeWidth={1.4} />
        )}
      </View>
    </Animated.View>
  );
};
