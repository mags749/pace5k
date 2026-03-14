import { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useProgressStore } from "@infra/storage/progressStore";
import { getWorkout } from "@shared/constants/schedule";
import { useWorkoutTimer } from "./useWorkoutTimer";

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useWorkout = () => {
  const { weekId, dayId } = useLocalSearchParams<{
    weekId: string;
    dayId: string;
  }>();
  const router = useRouter();
  const { markComplete, progress } = useProgressStore();

  const wId = parseInt(weekId ?? "1");
  const dId = parseInt(dayId ?? "1");
  const workout = getWorkout(wId, dId);

  const timer = useWorkoutTimer(workout?.intervals ?? []);

  const isVeryLastWorkout = wId === 9 && dId === 3;

  // Navigate when workout finishes
  useEffect(() => {
    if (timer.state === "completed" && workout) {
      void markComplete(wId, dId, timer.totalTimeElapsed).then(() => {
        // Show the one-time congratulations screen only for the final workout
        if (isVeryLastWorkout && !progress.hasShownCongratulations) {
          router.replace("/congratulations");
        } else {
          router.replace(`/completed/${wId}/${dId}`);
        }
      });
    }
  }, [timer.state]);

  return {
    wId,
    dId,
    workout,
    timer,
    onBack: () => router.back(),
  };
};
