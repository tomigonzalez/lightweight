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

  // 1. Traemos el workout actual + rutina + ejercicios
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

  const exercises = workout.routine?.exercises ?? [];

  if (exercises.length === 0) {
    return workout;
  }

  // IDs de los ejercicios que aparecen en esta rutina
  const exerciseIds = exercises.map(
    (item) => item.exercise.id
  );

  // 2. Traemos TODOS los sets históricos de esos ejercicios
  //    pertenecientes al usuario, excepto el workout actual.
  const { data: historicalSets, error: setsError } = await supabase
    .from("Set")
    .select(`
      id,
      setNumber,
      weight,
      reps,
      isWarmup,
      exerciseId,
      workoutId,
      createdAt,
      workout:Workout!inner(
        id,
        userId,
        date
      )
    `)
    .in("exerciseId", exerciseIds)
    .eq("workout.userId", userId)
    .neq("workoutId", workoutId)
    .order("createdAt", { ascending: false });

  if (setsError) {
    console.error("Error obteniendo historial de sets:", setsError);
    return workout;
  }

  // 3. Para cada ejercicio buscamos su último workout
  //
  // Como historicalSets está ordenado por createdAt DESC,
  // el primer set que encontremos de cada exerciseId
  // pertenece a su sesión más reciente.
  const latestWorkoutByExercise = new Map<string, string>();

  for (const set of historicalSets ?? []) {
    if (!latestWorkoutByExercise.has(set.exerciseId)) {
      latestWorkoutByExercise.set(
        set.exerciseId,
        set.workoutId,
      );
    }
  }

  // 4. Agrupamos los sets de la última sesión de cada ejercicio
  const lastSetsByExercise = new Map<string, LastSet[]>();

  for (const set of historicalSets ?? []) {
    const latestWorkoutId = latestWorkoutByExercise.get(
      set.exerciseId,
    );

    if (latestWorkoutId !== set.workoutId) {
      continue;
    }

    const lastSet: LastSet = {
      id: set.id,
      setNumber: set.setNumber,
      weight: set.weight,
      reps: set.reps,
      isWarmup: set.isWarmup,
      exerciseId: set.exerciseId,
      workoutId: set.workoutId,
    };

    const existing = lastSetsByExercise.get(set.exerciseId);

    if (existing) {
      existing.push(lastSet);
    } else {
      lastSetsByExercise.set(set.exerciseId, [lastSet]);
    }
  }

  // 5. Ordenamos las series por número
  for (const sets of lastSetsByExercise.values()) {
    sets.sort((a, b) => a.setNumber - b.setNumber);
  }

  // 6. Agregamos lastSets a cada ejercicio
  for (const item of exercises) {
    const exerciseId = item.exercise.id;

    (item.exercise as any).lastSets =
      lastSetsByExercise.get(exerciseId) ?? [];
  }

  return workout;
}