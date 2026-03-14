import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@shared/constants/design";

export const AppStack = () => (
  <>
    <StatusBar style="dark" translucent backgroundColor="transparent" />
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="workout/[weekId]/[dayId]/index" />
      <Stack.Screen name="completed/[weekId]/[dayId]/index" />
      <Stack.Screen
        name="congratulations/index"
        options={{ animation: "fade" }}
      />
    </Stack>
  </>
);
