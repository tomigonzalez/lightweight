// app/(dashboard)/rutinas/nueva/page.tsx
import { createClient } from "@/utils/supabase/server";
import PlanSemanalForm from "./form";

export default async function NuevaPlanificacionSemanal() {
  const supabase = await createClient();

  // Usuario logueado
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Ejercicios disponibles
  const { data: exercises } = await supabase
    .from("Exercise")
    .select("id, name, muscleGroup")
    .order("muscleGroup", { ascending: true });

  // Rutinas existentes del usuario
  const { data: rutinas } = await supabase
    .from("Routine")
    .select(
      `
      id,
      name,
      dayOfWeek,
      exercises:RoutineExercise (
        order,
        exercise:Exercise (
          id,
          name,
          muscleGroup
        )
      )
    `,
    )
    .eq("userId", user!.id)
    .order("dayOfWeek", { ascending: true });

  return (
    <PlanSemanalForm
      exercisesBase={exercises || []}
      rutinasActuales={rutinas || []}
    />
  );
}
