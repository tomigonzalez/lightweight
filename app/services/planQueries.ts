import { createClient } from "@/utils/supabase/server";

export async function getPlans(userId: string) {
  const supabase = await createClient();

  const { data: routines } = await supabase
    .from("Routine")
    .select(`
      id,
      name,
      dayOfWeek,
      createdAt,
      updatedAt,
      exercises:RoutineExercise(
        id
      )
    `)
    .eq("userId", userId)
    .order("dayOfWeek");

  return routines ?? [];
}