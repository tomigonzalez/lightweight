// app/services/dashboardQueries.ts

import { createClient } from "@/utils/supabase/server";

export async function getDashboardData(userId: string) {
  const supabase = await createClient();

  // ==========================
  // Rutina de hoy
  // ==========================
  const today = new Date().getDay();

  const { data: todayRoutine } = await supabase
    .from("Routine")
    .select(`
      id,
      name,
      exercises:RoutineExercise(
        id
      )
    `)
    .eq("userId", userId)
    .eq("dayOfWeek", today)
    .maybeSingle();

  // ==========================
  // Plan semanal
  // ==========================
  const { data: weeklyRoutines } = await supabase
    .from("Routine")
    .select(`
      id,
      name,
      dayOfWeek
    `)
    .eq("userId", userId)
    .order("dayOfWeek");

  // ==========================
  // Entrenamientos del mes
  // ==========================
  const firstDayOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1,
  );

  const { count: workoutsThisMonth } = await supabase
    .from("Workout")
    .select("*", {
      head: true,
      count: "exact",
    })
    .eq("userId", userId)
    .gte("date", firstDayOfMonth.toISOString());

  // ==========================
  // Último entrenamiento
  // ==========================
  const { data: lastWorkout } = await supabase
    .from("Workout")
    .select(`
      id,
      date,
      routine:Routine(
        name
      ),
      sets:Set(
        weight,
        reps
      )
    `)
    .eq("userId", userId)
    .order("date", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  // ==========================
  // Volumen último entrenamiento
  // ==========================
  const lastWorkoutVolume =
    lastWorkout?.sets?.reduce(
      (acc: number, set: any) => acc + set.weight * set.reps,
      0,
    ) ?? 0;

  // ==========================
  // Racha
  // ==========================
  const { data: workouts } = await supabase
    .from("Workout")
    .select("date")
    .eq("userId", userId)
    .order("date", {
      ascending: false,
    });

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
      } else {
        break;
      }
    }
  }

  return {
    todayRoutine,
    weeklyRoutines: weeklyRoutines ?? [],
    workoutsThisMonth: workoutsThisMonth ?? 0,
    streak,
    lastWorkout,
    lastWorkoutVolume,
  };
}