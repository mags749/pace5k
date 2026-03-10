import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { TOTAL_WORKOUTS } from "@shared/constants/schedule";
import type { AppProgress, WorkoutCompletion } from "@shared/types";

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "c25k_progress_v1";

const DEFAULT_PROGRESS: AppProgress = {
  completedWorkouts: [],
  currentWeekId: 1,
  currentDayId: 1,
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProgressState {
  progress: AppProgress;
  isLoading: boolean;
  loadProgress: () => Promise<void>;
  markComplete: (weekId: number, dayId: number, totalTimeSeconds: number) => Promise<void>;
  isCompleted: (weekId: number, dayId: number) => boolean;
  isUnlocked: (weekId: number, dayId: number) => boolean;
  getCompletion: (weekId: number, dayId: number) => WorkoutCompletion | undefined;
  resetProgress: () => Promise<void>;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useProgressStore = create<ProgressState>((set, get) => ({
  progress: DEFAULT_PROGRESS,
  isLoading: true,

  loadProgress: async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        set({ progress: JSON.parse(stored) as AppProgress, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch {
      set({ isLoading: false });
    }
  },

  markComplete: async (weekId, dayId, totalTimeSeconds) => {
    const { progress } = get();

    const alreadyDone = progress.completedWorkouts.some(
      (w) => w.weekId === weekId && w.dayId === dayId
    );

    const completedWorkouts = alreadyDone
      ? progress.completedWorkouts
      : [
          ...progress.completedWorkouts,
          {
            weekId,
            dayId,
            completedAt: new Date().toISOString(),
            totalTimeSeconds,
          } satisfies WorkoutCompletion,
        ];

    // Advance pointer if this was the current workout
    let newWeekId = progress.currentWeekId;
    let newDayId = progress.currentDayId;

    if (weekId === progress.currentWeekId && dayId === progress.currentDayId) {
      if (dayId < 3) {
        newDayId = dayId + 1;
      } else if (weekId < 9) {
        newWeekId = weekId + 1;
        newDayId = 1;
      }
    }

    const next: AppProgress = {
      completedWorkouts,
      currentWeekId: newWeekId,
      currentDayId: newDayId,
    };

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    set({ progress: next });
  },

  isCompleted: (weekId, dayId) => {
    return get().progress.completedWorkouts.some(
      (w) => w.weekId === weekId && w.dayId === dayId
    );
  },

  isUnlocked: (weekId, dayId) => {
    const { progress, isCompleted } = get();
    if (weekId === 1 && dayId === 1) return true;
    if (weekId === progress.currentWeekId && dayId === progress.currentDayId) return true;
    if (isCompleted(weekId, dayId)) return true;

    const prevDayId = dayId === 1 ? 3 : dayId - 1;
    const prevWeekId = dayId === 1 ? weekId - 1 : weekId;
    return isCompleted(prevWeekId, prevDayId);
  },

  getCompletion: (weekId, dayId) => {
    return get().progress.completedWorkouts.find(
      (w) => w.weekId === weekId && w.dayId === dayId
    );
  },

  resetProgress: async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    set({ progress: DEFAULT_PROGRESS });
  },
}));
