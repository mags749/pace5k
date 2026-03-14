import React from "react";
import { useWorkout } from "@features/workout/hooks/useWorkout";
import { WorkoutView } from "@features/workout/views/WorkoutView";

const WorkoutScreen = () => {
  const hook = useWorkout();

  if (!hook.workout) return null;

  return (
    <WorkoutView
      wId={hook.wId}
      dId={hook.dId}
      workout={hook.workout}
      state={hook.timer.state}
      currentInterval={hook.timer.currentInterval}
      nextInterval={hook.timer.nextInterval}
      completedIntervals={hook.timer.completedIntervals}
      intervalTimeLeft={hook.timer.intervalTimeLeft}
      totalTimeRemaining={hook.timer.totalTimeRemaining}
      countdownActive={hook.timer.countdownActive}
      isLastInterval={hook.timer.isLastInterval}
      onBack={hook.onBack}
      onStart={hook.timer.start}
      onPause={hook.timer.pause}
      onResume={hook.timer.resume}
      onSkip={hook.timer.skipToNext}
    />
  );
};

export default WorkoutScreen;
