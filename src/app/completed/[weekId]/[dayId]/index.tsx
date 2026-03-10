import React from "react";
import { useCompleted } from "@features/completed/hooks/useCompleted";
import { CompletedView } from "@features/completed/views/CompletedView";

const CompletedScreen = () => {
  const hook = useCompleted();
  return (
    <CompletedView
      wId={hook.wId}
      dId={hook.dId}
      workout={hook.workout}
      completion={hook.completion}
      isLastWorkout={hook.isLastWorkout}
      hasNextWorkout={!!hook.nextWorkout}
      onNextRun={hook.onNextRun}
      onRedo={hook.onRedo}
      onHome={hook.onHome}
    />
  );
};

export default CompletedScreen;
