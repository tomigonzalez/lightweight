// app/services/dashboardQueries.ts
import { createClient } from "@/utils/supabase/server";

export async function getDashboardData(userId: string) {
  const supabase = await createClient();
  const today = new Date().getDay();
  const firstDayOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );

  // 🚀 Disparamos todas las queries en paralelo (Waterfall elimination)
  const [
    { data: todayRoutine },
    { data: weeklyRoutines },
    { count: workoutsThisMonth },
    { data: lastWorkout },
    { data: workouts },
  ] = await Promise.all([
    // 1. Rutina de hoy
    supabase
      .from("Routine")
      .select(`
        id,
        name,
        exercises:RoutineExercise(
          id,
          isPinned,
          exerciseId,
          exercise:Exercise(
            id,
            name
          )
        )
      `)
      .eq("userId", userId)
      .eq("dayOfWeek", today)
      .maybeSingle(),

    // 2. Plan semanal
    supabase
      .from("Routine")
      .select("id, name, dayOfWeek")
      .eq("userId", userId)
      .order("dayOfWeek"),

    // 3. Entrenamientos del mes
    supabase
      .from("Workout")
      .select("*", { head: true, count: "exact" })
      .eq("userId", userId)
      .gte("date", firstDayOfMonth.toISOString()),

    // 4. Último entrenamiento
    supabase
      .from("Workout")
      .select(`
        id,
        date,
        routine:Routine(name),
        sets:Set(weight, reps)
      `)
      .eq("userId", userId)
      .order("date", { ascending: false })
      .limit(1)
      .maybeSingle(),

    // 5. Racha de entrenamientos
    supabase
      .from("Workout")
      .select("date")
      .eq("userId", userId)
      .order("date", { ascending: false }),
  ]);

  // Cálculo de volumen
  const lastWorkoutVolume =
    lastWorkout?.sets?.reduce(
      (acc: number, set: any) => acc + (set.weight || 0) * (set.reps || 0),
      0
    ) ?? 0;

  // Cálculo de racha
  let streak = 0;
  if (workouts?.length) {
    let current = new Date(workouts[0].date);
    current.setHours(0, 0, 0, 0);
    streak = 1;

    for (let i = 1; i < workouts.length; i++) {
      const next = new Date(workouts[i].date);
      next.setHours(0, 0, 0, 0);

      const diff =
        (current.getTime() - next.getTime()) / (1000 * 60 * 60 * 24);

      if (diff === 1) {
        streak++;
        current = next;
      } else if (diff > 1) {
        break;
      }
    }
  }

  // 6. PR del Ejercicio Pineado (depende de todayRoutine, por eso va después)
  const pinnedExercise = todayRoutine?.exercises?.find(
    (e: any) => e.isPinned
  );

  let pinnedPR = null;

  if (pinnedExercise?.exerciseId) {
    const { data: bestSet } = await supabase
      .from("Set")
      .select("weight, reps")
      .eq("exerciseId", pinnedExercise.exerciseId)
      .eq("isWarmup", false)
      .order("weight", { ascending: false })
      .order("reps", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (bestSet) {
      const exerciseName = Array.isArray(pinnedExercise.exercise)
        ? pinnedExercise.exercise[0]?.name
        : (pinnedExercise.exercise as any)?.name;

      pinnedPR = {
        exercise: exerciseName ?? "Ejercicio",
        weight: bestSet.weight,
        reps: bestSet.reps,
      };
    }
  }

  return {
    todayRoutine,
    weeklyRoutines: weeklyRoutines ?? [],
    workoutsThisMonth: workoutsThisMonth ?? 0,
    streak,
    lastWorkout,
    lastWorkoutVolume,
    pinnedPR,
  };
}