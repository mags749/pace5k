// ─── Shared Types ─────────────────────────────────────────────────────────────

export interface WorkoutCompletion {
  weekId: number;
  dayId: number;
  completedAt: string; // ISO date
  totalTimeSeconds: number;
}

export interface AppProgress {
  completedWorkouts: WorkoutCompletion[];
  currentWeekId: number;
  currentDayId: number;
}
