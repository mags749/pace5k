import * as Haptics from "expo-haptics";
import { useCallback, useEffect, useRef, useState } from "react";
import { audioService } from "@infra/audio/audioService";
import type { Interval } from "@shared/constants/schedule";

// ─── Types ────────────────────────────────────────────────────────────────────

export type WorkoutState = "idle" | "running" | "paused" | "completed";

// ─── Constants ────────────────────────────────────────────────────────────────

const COUNTDOWN_SECONDS = 5;

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useWorkoutTimer = (intervals: Interval[]) => {
  const [state, setState] = useState<WorkoutState>("idle");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [intervalTimeLeft, setIntervalTimeLeft] = useState(intervals[0]?.duration ?? 0);
  const [totalTimeElapsed, setTotalTimeElapsed] = useState(0);
  const [countdownActive, setCountdownActive] = useState(false);

  // Refs mirror state for use inside setInterval callback
  const stateRef = useRef<WorkoutState>("idle");
  const indexRef = useRef(0);
  const timeLeftRef = useRef(intervals[0]?.duration ?? 0);
  const totalRef = useRef(0);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  stateRef.current = state;
  indexRef.current = currentIndex;
  timeLeftRef.current = intervalTimeLeft;
  totalRef.current = totalTimeElapsed;

  // ─── Advance interval ──────────────────────────────────────────────────────

  const advanceInterval = useCallback(
    (fromIndex: number) => {
      const nextIndex = fromIndex + 1;

      if (nextIndex >= intervals.length) {
        setState("completed");
        if (tickRef.current) clearInterval(tickRef.current);
        void audioService.playComplete();
        void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        return;
      }

      const nextInterval = intervals[nextIndex];
      if (nextInterval) {
        void audioService.playIntervalStart(nextInterval.type);
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        setCurrentIndex(nextIndex);
        setIntervalTimeLeft(nextInterval.duration);
      }
      setCountdownActive(false);
    },
    [intervals]
  );

  // ─── Tick ──────────────────────────────────────────────────────────────────

  const tick = useCallback(() => {
    if (stateRef.current !== "running") return;

    const newTimeLeft = timeLeftRef.current - 1;
    setTotalTimeElapsed((t) => t + 1);

    if (newTimeLeft <= 0) {
      advanceInterval(indexRef.current);
    } else {
      if (newTimeLeft <= COUNTDOWN_SECONDS) {
        setCountdownActive(true);
        void audioService.playBeep();
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } else {
        setCountdownActive(false);
      }
      setIntervalTimeLeft(newTimeLeft);
    }
  }, [advanceInterval]);

  useEffect(() => {
    if (state === "running") {
      tickRef.current = setInterval(tick, 1000);
    } else {
      if (tickRef.current) {
        clearInterval(tickRef.current);
        tickRef.current = null;
      }
    }
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [state, tick]);

  // ─── Controls ──────────────────────────────────────────────────────────────

  const start = useCallback(() => {
    const first = intervals[0];
    if (first) void audioService.playIntervalStart(first.type);
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setState("running");
  }, [intervals]);

  const pause = useCallback(() => {
    setState("paused");
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  const resume = useCallback(() => {
    setState("running");
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  const skipToNext = useCallback(() => {
    if (indexRef.current < intervals.length - 1) {
      advanceInterval(indexRef.current);
    }
  }, [advanceInterval, intervals.length]);

  const reset = useCallback(() => {
    if (tickRef.current) clearInterval(tickRef.current);
    setState("idle");
    setCurrentIndex(0);
    setIntervalTimeLeft(intervals[0]?.duration ?? 0);
    setTotalTimeElapsed(0);
    setCountdownActive(false);
  }, [intervals]);

  return {
    state,
    currentIndex,
    intervalTimeLeft,
    totalTimeElapsed,
    countdownActive,
    currentInterval: intervals[currentIndex],
    nextInterval: intervals[currentIndex + 1] ?? null,
    completedIntervals: intervals.slice(0, currentIndex),
    isLastInterval: currentIndex === intervals.length - 1,
    start,
    pause,
    resume,
    skipToNext,
    reset,
  };
};
