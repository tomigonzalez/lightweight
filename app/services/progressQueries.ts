import { createClient } from "@/utils/supabase/server";

export async function getPerformanceData(userId: string) {
  const supabase = await createClient();

  const { data: sets, error } = await supabase
    .from("Set")
    .select(`
      weight,
      reps,
      isWarmup,
      workout:Workout!inner(
        id,
        userId
      )
    `)
    .eq("workout.userId", userId)
    .eq("isWarmup", false);

  if (error) {
    console.error("Error obteniendo datos de rendimiento:", error);
    return null;
  }

  const effectiveSets = sets ?? [];

  if (effectiveSets.length === 0) {
    return {
      maxWeight: 0,
      maxReps: 0,
      totalSets: 0,
      workouts: 0,
    };
  }

  // Peso máximo
  const maxWeight = Math.max(
    ...effectiveSets.map((set) => set.weight ?? 0)
  );

  // Repeticiones máximas
  const maxReps = Math.max(
    ...effectiveSets.map((set) => set.reps ?? 0)
  );

  // Cantidad de series efectivas
  const totalSets = effectiveSets.length;

  // Workouts únicos
  const workoutIds = new Set(
    effectiveSets.map((set) => set.workout.id)
  );
  const workouts = workoutIds.size;

  return {
    maxWeight,
    maxReps,
    totalSets,
    workouts,
  };
}