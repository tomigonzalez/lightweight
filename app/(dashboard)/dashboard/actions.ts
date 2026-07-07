"use server";

import { createClient } from "@/utils/supabase/server";

export async function startWorkoutAction(routineId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No autorizado");
  }

  const { data: workout, error } = await supabase
    .from("Workout")
    .insert({
      id: crypto.randomUUID(),
      userId: user.id,
      routineId,
      date: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (error) throw error;

  return workout.id;
}