import React from "react";
import { usePlan } from "@features/plan/hooks/usePlan";
import { PlanView } from "@features/plan/views/PlanView";

const PlanScreen = () => {
  const hook = usePlan();
  return (
    <PlanView
      weeks={hook.weeks}
      progress={hook.progress}
      completedCount={hook.completedCount}
      isCompleted={hook.isCompleted}
      isUnlocked={hook.isUnlocked}
      onWorkoutPress={hook.onWorkoutPress}
    />
  );
};

export default PlanScreen;
