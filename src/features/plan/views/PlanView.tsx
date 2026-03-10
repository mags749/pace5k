import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "tamagui";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Spacing } from "@shared/constants/design";
import type { Week } from "@shared/constants/schedule";
import type { AppProgress } from "@shared/types";

import { PlanHeader } from "./PlanHeader";
import { PlanSectionHeader } from "./PlanSectionHeader";
import { TodayRunCard } from "./TodayRunCard";
import { WorkoutDayRow } from "./WorkoutDayRow";
import { WeekCard, RowDivider } from "./WeekCard";
import { WeekLabel } from "./WeekLabel";
import { NameDialog } from "@shared/components/ui/NameDialog";

// ─── Styled ───────────────────────────────────────────────────────────────────

const Container = styled(SafeAreaView, {
  flex: 1,
} as any);

const ScrollContent = styled(ScrollView, {
  flex: 1,
} as any);

// ─── Constants ────────────────────────────────────────────────────────────────

const FIRST_NAME_KEY = "user:firstName";
type ViewMode = "this_week" | "full_plan";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PlanViewProps {
  weeks: Week[];
  progress: AppProgress;
  completedCount: number;
  isCompleted: (weekId: number, dayId: number) => boolean;
  isUnlocked: (weekId: number, dayId: number) => boolean;
  onWorkoutPress: (weekId: number, dayId: number) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const PlanView = ({
  weeks,
  progress,
  completedCount,
  isCompleted,
  isUnlocked,
  onWorkoutPress,
}: PlanViewProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>("this_week");
  const [firstName, setFirstName] = useState<string | null>(null);
  const [nameLoaded, setNameLoaded] = useState(false);

  // Load name from AsyncStorage on mount
  useEffect(() => {
    AsyncStorage.getItem(FIRST_NAME_KEY)
      .then((stored) => {
        setFirstName(stored);
        setNameLoaded(true);
      })
      .catch(() => setNameLoaded(true));
  }, []);

  const handleSaveName = async (name: string) => {
    await AsyncStorage.setItem(FIRST_NAME_KEY, name);
    setFirstName(name);
  };

  const weeksToShow =
    viewMode === "this_week"
      ? weeks.filter((w) => w.id === progress.currentWeekId)
      : weeks;

  // Don't render until we know whether name is set (avoids flash)
  if (!nameLoaded) return null;

  return (
    <LinearGradient
      colors={["#FFF3D6", "#F9F9F9"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <Container edges={["top"]}>
        <ScrollContent
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: Spacing.xl,
            paddingTop: Spacing.sm,
            paddingBottom: 100,
            gap: Spacing.lg,
          }}
        >
          <PlanHeader
            firstName={firstName ?? "Runner"}
            completedCount={completedCount}
          />

          <View style={{ marginTop: Spacing.xs }}>
            <TodayRunCard
              weekId={progress.currentWeekId}
              dayId={progress.currentDayId}
              onPress={() =>
                onWorkoutPress(progress.currentWeekId, progress.currentDayId)
              }
            />
          </View>

          <PlanSectionHeader
            currentWeekId={progress.currentWeekId}
            completedCount={completedCount}
            viewMode={viewMode}
            onToggle={setViewMode}
          />

          {weeksToShow.map((week) => (
            <View key={week.id}>
              {viewMode === "full_plan" && (
                <WeekLabel weekId={week.id} title={week.title} />
              )}
              <WeekCard>
                {week.workouts.map((workout, dayIndex) => {
                  const completed = isCompleted(workout.weekId, workout.dayId);
                  const unlocked = isUnlocked(workout.weekId, workout.dayId);
                  const isCurrent =
                    progress.currentWeekId === workout.weekId &&
                    progress.currentDayId === workout.dayId;

                  return (
                    <View key={dayIndex}>
                      <WorkoutDayRow
                        dayIndex={dayIndex}
                        description={workout.description}
                        completed={completed}
                        isCurrent={isCurrent}
                        unlocked={unlocked}
                        onPress={() =>
                          onWorkoutPress(workout.weekId, workout.dayId)
                        }
                      />
                      {dayIndex < week.workouts.length - 1 && <RowDivider />}
                    </View>
                  );
                })}
              </WeekCard>
            </View>
          ))}
        </ScrollContent>
      </Container>

      {/* Persistent name dialog if name not set */}
      {!firstName && nameLoaded && <NameDialog onSave={handleSaveName} />}
    </LinearGradient>
  );
};
