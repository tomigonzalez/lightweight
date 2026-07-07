import { createClient } from "@/utils/supabase/server";


type LastSet = {
  id: string;
  setNumber: number;
  weight: number;
  reps: number;
  isWarmup: boolean;
  exerciseId: string;
  workoutId: string;
};

export async function getWorkoutComplete(
  workoutId: string,
  userId: string,
) {
  const supabase = await createClient();

  // 1. Workout actual
  const { data: workout, error } = await supabase
    .from("Workout")
    .select(`
      id,
      routine:Routine(
        id,
        name,
        exercises:RoutineExercise(
          order,
          exercise:Exercise(
            id,
            name,
            muscleGroup
          )
        )
      )
    `)
    .eq("id", workoutId)
    .eq("userId", userId)
    .single();

  if (error || !workout) {
    return null;
  }

  // 2. Para cada ejercicio buscamos su último entrenamiento
  
  for (const item of workout.routine.exercises) {
    const exerciseId = item.exercise.id;

    // Último set registrado de ese ejercicio
    const { data: ultimoSet } = await supabase
      .from("Set")
      .select(`
        workoutId,
        workout:Workout!inner(
          id,
          userId,
          date
        )
      `)
      .eq("exerciseId", exerciseId)
      .eq("workout.userId", userId)
      .neq("workoutId", workoutId) // importante: excluir el workout actual
      .order("createdAt", { ascending: false })
      .limit(1)
      .maybeSingle();

    let lastSets: LastSet[] = [];

    if (ultimoSet) {
      // Traemos TODAS las series de ese workout
      const { data: sets } = await supabase
        .from("Set")
        .select(`
          id,
          setNumber,
          weight,
          reps,
          isWarmup,
          exerciseId,
          workoutId
        `)
        .eq("exerciseId", exerciseId)
        .eq("workoutId", ultimoSet.workoutId)
        .order("setNumber", { ascending: true });

      lastSets = sets ?? [];
    }

    item.exercise.lastSets = lastSets;
  }

  return workout;
}