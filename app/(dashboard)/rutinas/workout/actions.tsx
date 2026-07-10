"use server";

import { createClient } from "@/utils/supabase/server";

export async function saveWorkoutAction(
  workoutId: string,
  exercises: {
    exerciseId: string;
    sets: {
      setNumber: number;
      weight: number;
      reps: number;
    }[];
  }[],
) {
  const supabase = await createClient();

  await supabase.from("Set").delete().eq("workoutId", workoutId);

  const rows = exercises.flatMap((exercise) =>
    exercise.sets
      .filter((set) => set.weight > 0 && set.reps > 0)
      .map((set) => ({
        workoutId,
        exerciseId: exercise.exerciseId,
        setNumber: set.setNumber,
        weight: set.weight,
        reps: set.reps,
        isWarmup: false,
      })),
  );

  if (rows.length === 0) {
    return;
  }

  const { error } = await supabase.from("Set").insert(rows);

  if (error) {
    throw error;
  }
}
