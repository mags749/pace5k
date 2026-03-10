import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useProgressStore } from "@infra/storage/progressStore";
import { C25K_SCHEDULE } from "@shared/constants/schedule";

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const usePlan = () => {
  const router = useRouter();

  const {
    progress,
    isLoading,
    loadProgress,
    isCompleted,
    isUnlocked,
  } = useProgressStore();

  useEffect(() => {
    void loadProgress();
  }, [loadProgress]);

  const onWorkoutPress = (weekId: number, dayId: number) => {
    if (isCompleted(weekId, dayId)) {
      router.push(`/completed/${weekId}/${dayId}`);
    } else {
      router.push(`/workout/${weekId}/${dayId}`);
    }
  };

  return {
    weeks: C25K_SCHEDULE,
    progress,
    isLoading,
    completedCount: progress.completedWorkouts.length,
    isCompleted,
    isUnlocked,
    onWorkoutPress,
  };
};
