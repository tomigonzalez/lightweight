import { createClient } from "@/utils/supabase/server";

export async function getProgressStats(
  userId: string,
  days: number = 30,
) {
  const supabase = await createClient();

  const startDate = new Date();

  startDate.setDate(startDate.getDate() - days);

  const { data: sets, error } = await supabase
    .from("Set")
    .select(`
      weight,
      reps,
      isWarmup,
      workout:Workout!inner(
        id,
        userId,
        date
      )
    `)
    .eq("workout.userId", userId)
    .eq("isWarmup", false)
    .gte("workout.date", startDate.toISOString());

  if (error) {
    console.error("Error obteniendo estadísticas:", error);
    return null;
  }

  const effectiveSets = sets ?? [];

  // Cantidad de series efectivas
  const totalSets = effectiveSets.length;

  // Entrenamientos distintos
  const workoutIds = new Set(
    effectiveSets.map((set) => set.workout.id)
  );

  const workouts = workoutIds.size;

  return {
    totalSets,
    workouts,
  };
}

export async function getMuscleDistribution(
  userId: string,
  days: number = 30,
) {
  const supabase = await createClient();

  const startDate = new Date();

  startDate.setDate(startDate.getDate() - days);

  const { data: sets, error } = await supabase
    .from("Set")
    .select(`
      isWarmup,
      workout:Workout!inner(
        userId,
        date
      ),
      exercise:Exercise(
        muscleGroup
      )
    `)
    .eq("workout.userId", userId)
    .eq("isWarmup", false)
    .gte("workout.date", startDate.toISOString());

  if (error) {
    console.error(
      "Error obteniendo distribución muscular:",
      error
    );

    return null;
  }

  const distribution: Record<string, number> = {};

  for (const set of sets ?? []) {
    const muscleGroup = set.exercise?.muscleGroup;

    if (!muscleGroup) {
      continue;
    }

    distribution[muscleGroup] =
      (distribution[muscleGroup] ?? 0) + 1;
  }


  return Object.entries(distribution).map(
  ([muscleGroup, sets]) => ({
    muscleGroup,
    sets,
  })
);
}