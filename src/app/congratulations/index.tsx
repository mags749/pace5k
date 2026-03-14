import React, { useCallback } from "react";
import { useRouter } from "expo-router";
import { useProgressStore } from "@infra/storage/progressStore";
import { CongratulationsView } from "@features/congratulations/views/CongratulationsView";

const CongratulationsScreen = () => {
  const router = useRouter();
  const { markCongratulationsShown } = useProgressStore();

  const handleDismiss = useCallback(async () => {
    await markCongratulationsShown();
    router.replace("/completed/9/3");
  }, []);

  return <CongratulationsView onDismiss={handleDismiss} />;
};

export default CongratulationsScreen;
