import React, { useEffect, useRef } from "react";
import { Animated, Pressable, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "tamagui";
import { AppIcon } from "@shared/components/AppIcon";
import {
  Colors,
  FontFamily,
  Radius,
  Shadow,
  Spacing,
} from "@shared/constants/design";

// ─── Sparkle particle ─────────────────────────────────────────────────────────

const SPARKLES = [
  { color: "#FFD700", size: 10, x: "10%", y: "12%" },
  { color: "#FF6B6B", size: 7, x: "82%", y: "8%" },
  { color: "#4ECDC4", size: 9, x: "20%", y: "22%" },
  { color: "#FFD700", size: 6, x: "72%", y: "18%" },
  { color: "#A8E6CF", size: 8, x: "88%", y: "30%" },
  { color: "#FF9F0A", size: 7, x: "5%", y: "35%" },
  { color: "#FFD93D", size: 10, x: "60%", y: "6%" },
  { color: "#FF6B6B", size: 6, x: "45%", y: "28%" },
  { color: "#4ECDC4", size: 8, x: "92%", y: "48%" },
  { color: "#FFD700", size: 9, x: "3%", y: "55%" },
] as const;

const Sparkle = ({
  color,
  size,
  x,
  y,
  delay,
}: {
  color: string;
  size: number;
  x: string;
  y: string;
  delay: number;
}) => {
  const anim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.sequence([
            Animated.timing(anim, {
              toValue: 1,
              duration: 1200,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0.3,
              duration: 1200,
              useNativeDriver: true,
            }),
          ]),
          Animated.loop(
            Animated.timing(rotateAnim, {
              toValue: 1,
              duration: 2400,
              useNativeDriver: true,
            }),
          ),
        ]),
      ]),
    ).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: x as any,
        top: y as any,
        opacity: anim,
        transform: [
          { rotate },
          {
            scale: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.6, 1],
            }),
          },
        ],
      }}
    >
      <View
        style={{
          width: size,
          height: size,
          borderRadius: 2,
          backgroundColor: color,
        }}
      />
    </Animated.View>
  );
};

// ─── Trophy badge ─────────────────────────────────────────────────────────────

const TrophyBadge = () => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // Pop in
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 6,
      delay: 300,
      useNativeDriver: true,
    }).start();

    // Float up/down
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -12,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Glow pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.4,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
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
      {/* Outer glow ring */}
      <Animated.View
        style={{
          position: "absolute",
          width: 160,
          height: 160,
          borderRadius: 80,
          backgroundColor: "#FFD700",
          opacity: glowAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.08, 0.22],
          }),
        }}
      />
      {/* Middle ring */}
      <View
        style={{
          position: "absolute",
          width: 130,
          height: 130,
          borderRadius: 65,
          backgroundColor: "#FFD700",
          opacity: 0.15,
        }}
      />
      {/* Badge */}
      <View
        style={{
          width: 110,
          height: 110,
          borderRadius: 55,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFD700",
          shadowColor: "#FFD700",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.55,
          shadowRadius: 20,
          elevation: 14,
        }}
      >
        <AppIcon name="trophy" size={54} color="#fff" strokeWidth={1.4} />
      </View>
    </Animated.View>
  );
};

// ─── Text reveal ──────────────────────────────────────────────────────────────

const FadeSlideIn = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        speed: 14,
        bounciness: 5,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
    >
      {children}
    </Animated.View>
  );
};

// ─── Countdown ring ──────────────────────────────────────────────────────────

const AutoCloseBar = ({
  seconds,
  onPress,
}: {
  seconds: number;
  onPress: () => void;
}) => {
  const widthAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: 0,
      duration: seconds * 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        width: "100%",
        borderRadius: Radius.lg,
        overflow: "hidden",
        backgroundColor: "rgba(0,0,0,0.15)",
        opacity: pressed ? 0.8 : 1,
      })}
    >
      <Animated.View
        style={{
          height: 52,
          borderRadius: Radius.lg,
          backgroundColor: "rgba(0,0,0,0.28)",
          width: widthAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ["0%", "100%"],
          }),
          position: "absolute",
          left: 0,
          top: 0,
        }}
      />
      <View
        style={{
          height: 52,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: Spacing.sm,
          paddingHorizontal: Spacing.xl,
        }}
      >
        <AppIcon name="check-circle" size={20} color="#000" strokeWidth={1.8} />
        <Text
          style={
            {
              fontSize: 15,
              color: "#000",
              fontFamily: FontFamily.archivoSemiBold,
              letterSpacing: 0.5,
            } as any
          }
        >
          All Set!!!
        </Text>
      </View>
    </Pressable>
  );
};

// ─── Props ───────────────────────────────────────────────────────────────────

interface CongratulationsViewProps {
  onDismiss: () => void;
}

// ─── Component ───────────────────────────────────────────────────────────────

export const CongratulationsView = ({
  onDismiss,
}: CongratulationsViewProps) => {
  // Auto-navigate after 20 seconds
  useEffect(() => {
    const timer = setTimeout(onDismiss, 20_000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <LinearGradient
      colors={["#FFDE91", "#FFFFFF", "#FDF6E3"]}
      locations={[0, 0.5, 1]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        {/* Sparkle particles — full screen backdrop */}
        <View
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
          pointerEvents="none"
        >
          {SPARKLES.map((s, i) => (
            <Sparkle
              key={i}
              color={s.color}
              size={s.size}
              x={s.x}
              y={s.y}
              delay={i * 180}
            />
          ))}
        </View>

        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
            paddingHorizontal: Spacing["2xl"],
            paddingBottom: Spacing["3xl"],
          }}
        >
          {/* Trophy — upper 55% of screen, vertically centered in that space */}
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "58%",
              alignItems: "center",
              justifyContent: "center",
            }}
            pointerEvents="none"
          >
            <TrophyBadge />
          </View>

          {/* Bottom content block */}
          <View
            style={{ width: "100%", alignItems: "center", gap: Spacing.xl }}
          >
            <FadeSlideIn delay={500}>
              <View style={{ alignItems: "center", gap: Spacing.md }}>
                <Text
                  style={
                    {
                      fontSize: 38,
                      fontFamily: FontFamily.archivoBold,
                      color: "#000000",
                      textAlign: "center",
                      letterSpacing: -0.5,
                      lineHeight: 44,
                    } as any
                  }
                >
                  Congratulations
                </Text>

                <Text
                  style={
                    {
                      fontSize: 16,
                      fontFamily: FontFamily.archivo,
                      color: "rgba(0,0,0,0.65)",
                      textAlign: "center",
                      lineHeight: 24,
                      maxWidth: 280,
                    } as any
                  }
                >
                  You finished the entire C25K program!{"\n"}
                  You're ready for your first 5K. 🏅
                </Text>
              </View>
            </FadeSlideIn>

            <FadeSlideIn delay={1100}>
              <View style={{ width: "100%", gap: Spacing.md }}>
                <AutoCloseBar seconds={20} onPress={onDismiss} />
              </View>
            </FadeSlideIn>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};
