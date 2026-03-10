// ─── C25K Schedule Data ───────────────────────────────────────────────────────

export type IntervalType = "warmup" | "run" | "walk" | "cooldown";

export interface Interval {
  type: IntervalType;
  duration: number; // seconds
  label: string;
}

export interface Workout {
  weekId: number;
  dayId: number;
  totalMinutes: number;
  description: string;
  intervals: Interval[];
}

export interface Week {
  id: number;
  title: string;
  workouts: Workout[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const WARMUP: Interval = {
  type: "warmup",
  duration: 5 * 60,
  label: "Warm Up Walk",
};
const COOLDOWN: Interval = {
  type: "cooldown",
  duration: 5 * 60,
  label: "Cool Down Walk",
};

function wrap(
  coreIntervals: Interval[],
  weekId: number,
  dayId: number,
  totalMinutes: number,
  description: string,
): Workout {
  return {
    weekId,
    dayId,
    totalMinutes,
    description,
    intervals: [WARMUP, ...coreIntervals, COOLDOWN],
  };
}

function repeat(
  pairs: Array<{ type: IntervalType; duration: number }>,
  times: number,
): Interval[] {
  const result: Interval[] = [];
  const labels: Record<IntervalType, string> = {
    run: "Run",
    walk: "Walk",
    warmup: "Warm Up",
    cooldown: "Cool Down",
  };
  for (let i = 0; i < times; i++) {
    for (const p of pairs) {
      if (p.type === "walk" && i === times - 1) continue;
      result.push({
        type: p.type,
        duration: p.duration,
        label: labels[p.type],
      });
    }
  }
  return result;
}

// ─── Schedule ─────────────────────────────────────────────────────────────────

export const C25K_SCHEDULE: Week[] = [
  {
    id: 1,
    title: "Week 1 — Starting Out",
    workouts: [
      wrap(
        repeat(
          [
            { type: "run", duration: 60 },
            { type: "walk", duration: 90 },
          ],
          8,
        ),
        1,
        1,
        20,
        "1 min run, 1.5 min walk × 8",
      ),
      wrap(
        repeat(
          [
            { type: "run", duration: 60 },
            { type: "walk", duration: 90 },
          ],
          8,
        ),
        1,
        2,
        20,
        "1 min run, 1.5 min walk × 8",
      ),
      wrap(
        repeat(
          [
            { type: "run", duration: 60 },
            { type: "walk", duration: 90 },
          ],
          8,
        ),
        1,
        3,
        20,
        "1 min run, 1.5 min walk × 8",
      ),
    ],
  },
  {
    id: 2,
    title: "Week 2 — Building Up",
    workouts: [
      wrap(
        repeat(
          [
            { type: "run", duration: 90 },
            { type: "walk", duration: 120 },
          ],
          6,
        ),
        2,
        1,
        21,
        "1.5 min run, 2 min walk × 6",
      ),
      wrap(
        repeat(
          [
            { type: "run", duration: 90 },
            { type: "walk", duration: 120 },
          ],
          6,
        ),
        2,
        2,
        21,
        "1.5 min run, 2 min walk × 6",
      ),
      wrap(
        repeat(
          [
            { type: "run", duration: 90 },
            { type: "walk", duration: 120 },
          ],
          6,
        ),
        2,
        3,
        21,
        "1.5 min run, 2 min walk × 6",
      ),
    ],
  },
  {
    id: 3,
    title: "Week 3 — Getting Stronger",
    workouts: [
      wrap(
        repeat(
          [
            { type: "run", duration: 90 },
            { type: "walk", duration: 90 },
            { type: "run", duration: 180 },
            { type: "walk", duration: 180 },
          ],
          2,
        ),
        3,
        1,
        18,
        "1.5, 1.5, 3, 3 min intervals × 2",
      ),
      wrap(
        repeat(
          [
            { type: "run", duration: 90 },
            { type: "walk", duration: 90 },
            { type: "run", duration: 180 },
            { type: "walk", duration: 180 },
          ],
          2,
        ),
        3,
        2,
        18,
        "1.5, 1.5, 3, 3 min intervals × 2",
      ),
      wrap(
        repeat(
          [
            { type: "run", duration: 90 },
            { type: "walk", duration: 90 },
            { type: "run", duration: 180 },
            { type: "walk", duration: 180 },
          ],
          2,
        ),
        3,
        3,
        18,
        "1.5, 1.5, 3, 3 min intervals × 2",
      ),
    ],
  },
  {
    id: 4,
    title: "Week 4 — Pushing Further",
    workouts: [
      wrap(
        [
          { type: "run", duration: 180, label: "Run" },
          { type: "walk", duration: 90, label: "Walk" },
          { type: "run", duration: 300, label: "Run" },
          { type: "walk", duration: 150, label: "Walk" },
          { type: "run", duration: 180, label: "Run" },
          { type: "walk", duration: 90, label: "Walk" },
          { type: "run", duration: 300, label: "Run" },
        ],
        4,
        1,
        21.5,
        "3, 5, 3, 5 min runs with walks",
      ),
      wrap(
        [
          { type: "run", duration: 180, label: "Run" },
          { type: "walk", duration: 90, label: "Walk" },
          { type: "run", duration: 300, label: "Run" },
          { type: "walk", duration: 150, label: "Walk" },
          { type: "run", duration: 180, label: "Run" },
          { type: "walk", duration: 90, label: "Walk" },
          { type: "run", duration: 300, label: "Run" },
        ],
        4,
        2,
        21.5,
        "3, 5, 3, 5 min runs with walks",
      ),
      wrap(
        [
          { type: "run", duration: 180, label: "Run" },
          { type: "walk", duration: 90, label: "Walk" },
          { type: "run", duration: 300, label: "Run" },
          { type: "walk", duration: 150, label: "Walk" },
          { type: "run", duration: 180, label: "Run" },
          { type: "walk", duration: 90, label: "Walk" },
          { type: "run", duration: 300, label: "Run" },
        ],
        4,
        3,
        21.5,
        "3, 5, 3, 5 min runs with walks",
      ),
    ],
  },
  {
    id: 5,
    title: "Week 5 — The Big Change",
    workouts: [
      wrap(
        [
          { type: "run", duration: 300, label: "Run" },
          { type: "walk", duration: 180, label: "Walk" },
          { type: "run", duration: 300, label: "Run" },
          { type: "walk", duration: 180, label: "Walk" },
          { type: "run", duration: 300, label: "Run" },
        ],
        5,
        1,
        21,
        "5 min run × 3 with 3 min walks",
      ),
      wrap(
        [
          { type: "run", duration: 480, label: "Run" },
          { type: "walk", duration: 300, label: "Walk" },
          { type: "run", duration: 480, label: "Run" },
        ],
        5,
        2,
        21,
        "8 min run, 5 min walk, 8 min run",
      ),
      wrap(
        [{ type: "run", duration: 1200, label: "Run" }],
        5,
        3,
        20,
        "20 minute continuous run!",
      ),
    ],
  },
  {
    id: 6,
    title: "Week 6 — Consistency",
    workouts: [
      wrap(
        [
          { type: "run", duration: 300, label: "Run" },
          { type: "walk", duration: 180, label: "Walk" },
          { type: "run", duration: 480, label: "Run" },
          { type: "walk", duration: 180, label: "Walk" },
          { type: "run", duration: 300, label: "Run" },
        ],
        6,
        1,
        24,
        "5, 8, 5 min runs with 3 min walks",
      ),
      wrap(
        [
          { type: "run", duration: 600, label: "Run" },
          { type: "walk", duration: 180, label: "Walk" },
          { type: "run", duration: 600, label: "Run" },
        ],
        6,
        2,
        23,
        "10 min run, 3 min walk, 10 min run",
      ),
      wrap(
        [{ type: "run", duration: 1500, label: "Run" }],
        6,
        3,
        25,
        "25 minute continuous run!",
      ),
    ],
  },
  {
    id: 7,
    title: "Week 7 — Running Strong",
    workouts: [
      wrap(
        [{ type: "run", duration: 1500, label: "Run" }],
        7,
        1,
        25,
        "25 minute continuous run",
      ),
      wrap(
        [{ type: "run", duration: 1500, label: "Run" }],
        7,
        2,
        25,
        "25 minute continuous run",
      ),
      wrap(
        [{ type: "run", duration: 1500, label: "Run" }],
        7,
        3,
        25,
        "25 minute continuous run",
      ),
    ],
  },
  {
    id: 8,
    title: "Week 8 — Almost There",
    workouts: [
      wrap(
        [{ type: "run", duration: 1680, label: "Run" }],
        8,
        1,
        28,
        "28 minute continuous run",
      ),
      wrap(
        [{ type: "run", duration: 1680, label: "Run" }],
        8,
        2,
        28,
        "28 minute continuous run",
      ),
      wrap(
        [{ type: "run", duration: 1680, label: "Run" }],
        8,
        3,
        28,
        "28 minute continuous run",
      ),
    ],
  },
  {
    id: 9,
    title: "Week 9 — Finish Line!",
    workouts: [
      wrap(
        [{ type: "run", duration: 1800, label: "Run" }],
        9,
        1,
        30,
        "30 minute continuous run",
      ),
      wrap(
        [{ type: "run", duration: 1800, label: "Run" }],
        9,
        2,
        30,
        "30 minute continuous run",
      ),
      wrap(
        [{ type: "run", duration: 1800, label: "Run" }],
        9,
        3,
        30,
        "30 minute run — FINISH LINE! 🏆",
      ),
    ],
  },
];

export const DAY_LABELS = ["Monday", "Wednesday", "Friday"] as const;
export const TOTAL_WORKOUTS = 27;

export function getWorkout(weekId: number, dayId: number): Workout | undefined {
  return C25K_SCHEDULE.find((w) => w.id === weekId)?.workouts.find(
    (d) => d.dayId === dayId,
  );
}

export function getNextWorkout(
  weekId: number,
  dayId: number,
): { weekId: number; dayId: number } | null {
  if (dayId < 3) return { weekId, dayId: dayId + 1 };
  if (weekId < 9) return { weekId: weekId + 1, dayId: 1 };
  return null;
}

export function formatTimer(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  if (s === 0) return `${m}m`;
  return `${m}m ${s}s`;
}
