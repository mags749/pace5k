import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

// ─── Confetti dot data ────────────────────────────────────────────────────────

const CONFETTI = [
  { color: "#FF6B6B", x: "8%", size: 8 },
  { color: "#F0A500", x: "22%", size: 6 },
  { color: "#4ECDC4", x: "38%", size: 10 },
  { color: "#FFD93D", x: "56%", size: 7 },
  { color: "#F0A500", x: "70%", size: 9 },
  { color: "#FF6B6B", x: "84%", size: 6 },
  { color: "#A8E6CF", x: "93%", size: 8 },
] as const;

// ─── Single dot ───────────────────────────────────────────────────────────────

interface ConfettiDotProps {
  color: string;
  x: string;
  size: number;
  index: number;
}

const ConfettiDot = ({ color, x, size, index }: ConfettiDotProps) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: 1800 + index * 200,
          useNativeDriver: true,
        }),
        Animated.timing(anim, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        position: "absolute",
        backgroundColor: color,
        width: size,
        height: size,
        borderRadius: size / 2,
        left: x as any,
        top: 20 + (index % 3) * 18,
        opacity: anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.9, 1, 0.2] }),
        transform: [
          {
            translateY: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -28 - index * 4],
            }),
          },
        ],
      }}
    />
  );
};

// ─── Layer ────────────────────────────────────────────────────────────────────

export const ConfettiLayer = () => (
  <View
    style={{ position: "absolute", top: 0, left: 0, right: 0, height: 130 }}
    pointerEvents="none"
  >
    {CONFETTI.map((dot, i) => (
      <ConfettiDot key={i} color={dot.color} x={dot.x} size={dot.size} index={i} />
    ))}
  </View>
);
