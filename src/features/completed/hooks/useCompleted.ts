import { useLocalSearchParams, useRouter } from "expo-router";
import { useProgressStore } from "@infra/storage/progressStore";
import { getNextWorkout, getWorkout } from "@shared/constants/schedule";

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useCompleted = () => {
  const { weekId, dayId } = useLocalSearchParams<{ weekId: string; dayId: string }>();
  const router = useRouter();
  const { getCompletion } = useProgressStore();

  const wId = parseInt(weekId ?? "1");
  const dId = parseInt(dayId ?? "1");
  const workout = getWorkout(wId, dId);
  const completion = getCompletion(wId, dId);
  const nextWorkout = getNextWorkout(wId, dId);
  const isLastWorkout = wId === 9 && dId === 3;

  return {
    wId,
    dId,
    workout,
    completion,
    nextWorkout,
    isLastWorkout,
    onNextRun: () => nextWorkout && router.replace(`/workout/${nextWorkout.weekId}/${nextWorkout.dayId}`),
    onRedo: () => router.replace(`/workout/${wId}/${dId}`),
    onHome: () => router.replace("/"),
  };
};
