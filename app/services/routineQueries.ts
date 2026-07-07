import { createClient } from "@/utils/supabase/server";

export async function getTodayRoutine() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const hoy = new Date().getDay(); // 0 Domingo - 6 Sábado

  const { data: rutina, error } = await supabase
    .from("Routine")
    .select(`
      id,
      name,
      dayOfWeek,
      exercises:RoutineExercise(
        id,
        exercise:Exercise(
          id,
          name,
          muscleGroup
        )
      )
    `)
    .eq("userId", user.id)
    .eq("dayOfWeek", hoy)
    .maybeSingle();

  if (error) throw error;

  return rutina;
}