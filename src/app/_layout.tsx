import {
  Archivo_300Light,
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
  Archivo_700Bold,
} from "@expo-google-fonts/archivo";
import { Michroma_400Regular } from "@expo-google-fonts/michroma";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";

import tamaguiConfig from "../../tamagui.config";
import { useProgressStore } from "@infra/storage/progressStore";
import { SplashScreen } from "@shared/components/splash/SplashScreen";
import { AppStack } from "@shared/components/AppStack";

ExpoSplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [showCustomSplash, setShowCustomSplash] = useState(true);

  const [fontsLoaded] = useFonts({
    Archivo_300Light,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
    Archivo_700Bold,
    Michroma_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      void useProgressStore.getState().loadProgress();
      void ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="app">
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          {showCustomSplash ? (
            <SplashScreen onFinish={() => setShowCustomSplash(false)} />
          ) : (
            <AppStack />
          )}
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </TamaguiProvider>
  );
};

export default RootLayout;
