import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, View } from "react-native";
import { styled, Text } from "tamagui";
import { Running } from "iconoir-react-native";
import { FontFamily } from "@shared/constants/design";

// ─── Styled ───────────────────────────────────────────────────────────────────

const Container = styled(View, {
  flex: 1,
  backgroundColor: "#FAF8F4",
  alignItems: "center",
  justifyContent: "center",
} as any);

const AppName = styled(Text, {
  position: "absolute",
  bottom: 80,
  fontSize: 32,
  letterSpacing: 4,
  color: "#F0A500",
} as any);

// ─── Component ────────────────────────────────────────────────────────────────

interface SplashScreenProps {
  onFinish: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ICON_SIZE = 32;
const START_X = SCREEN_WIDTH / 2 - ICON_SIZE / 2; // right side (natural)
const END_X = -(SCREEN_WIDTH / 2 + ICON_SIZE / 2); // left side (off-screen)

export const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  // translateX: moves icon from right-to-left over 2s
  const translateX = useRef(new Animated.Value(START_X)).current;
  // opacity: blinks repeatedly — each blink also implies movement
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 5 blinks in 2s, paired with movement
    const BLINK_COUNT = 5;
    const BLINK_DURATION = 2000 / (BLINK_COUNT * 2);

    const blinkSequence = Array.from({ length: BLINK_COUNT }).flatMap(() => [
      Animated.timing(opacity, {
        toValue: 0,
        duration: BLINK_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: BLINK_DURATION,
        useNativeDriver: true,
      }),
    ]);

    Animated.parallel([
      // Smooth left slide over 2s
      Animated.timing(translateX, {
        toValue: END_X,
        duration: 2000,
        useNativeDriver: true,
      }),
      // Blink sequence over 2s
      Animated.sequence(blinkSequence),
    ]).start(() => {
      onFinish();
    });
  }, []);

  return (
    <Container>
      {/* Animated running icon — flipped horizontally, moves R→L */}
      <Animated.View
        style={{
          transform: [
            { translateX },
            { scaleX: -1 }, // flip icon so it faces left (running direction)
          ],
          opacity,
          position: "absolute",
        }}
      >
        <Running
          color="#F0A500"
          width={ICON_SIZE}
          height={ICON_SIZE}
          strokeWidth={1.6}
        />
      </Animated.View>

      {/* App name at bottom */}
      <AppName style={{ fontFamily: FontFamily.michroma } as any}>
        Pace5K
      </AppName>
    </Container>
  );
};
