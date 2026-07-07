"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

interface DiaFormulario {
  name: string;
  isDescanso: boolean;
  exercises: { id: string }[];
}

interface PlanFormData {
  plan: { [key: number]: DiaFormulario };
}
const NOMBRES_DIAS: Record<number, string> = {
  0: "Domingo",
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
};

export async function guardarPlanSemanalAction(formData: PlanFormData) {
  const supabase = await createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        error: "No autorizado.",
      };
    }

    const { plan } = formData;

    const diasKeys = Object.keys(plan).map(Number);

    console.log("PLAN:", plan);

    // Crear nuevas
    // Crear / actualizar rutinas
    for (const dayOfWeek of diasKeys) {
      const dia = plan[dayOfWeek];

      // Buscar si ya existe una rutina para ese día
      const { data: rutinaExistente, error: errorBusqueda } = await supabase
        .from("Routine")
        .select("id")
        .eq("userId", user.id)
        .eq("dayOfWeek", dayOfWeek)
        .maybeSingle();

      if (errorBusqueda) {
        throw errorBusqueda;
      }

      // Si el día es descanso, eliminar la rutina (si existe)
      if (dia.isDescanso) {
        if (rutinaExistente) {
          // Primero eliminar los ejercicios de la rutina
          const { error: errorDeleteExercises } = await supabase
            .from("RoutineExercise")
            .delete()
            .eq("routineId", rutinaExistente.id);

          if (errorDeleteExercises) throw errorDeleteExercises;

          // Luego eliminar la rutina
          const { error: errorDeleteRoutine } = await supabase
            .from("Routine")
            .delete()
            .eq("id", rutinaExistente.id);

          if (errorDeleteRoutine) throw errorDeleteRoutine;
        }

        continue;
      }

      const nombreDia = dia.name.trim() || NOMBRES_DIAS[dayOfWeek];

      const nombreCompleto = nombreDia;

      let rutinaId: string;

      // Si existe, actualizar
      if (rutinaExistente) {
        rutinaId = rutinaExistente.id;

        const { error } = await supabase
          .from("Routine")
          .update({
            name: nombreCompleto,
            updatedAt: new Date().toISOString(),
          })
          .eq("id", rutinaId);

        if (error) throw error;
      } else {
        // Si no existe, crear
        rutinaId = crypto.randomUUID();

        const { error } = await supabase.from("Routine").insert({
          id: rutinaId,
          name: nombreCompleto,
          dayOfWeek,
          userId: user.id,
          updatedAt: new Date().toISOString(),
        });

        if (error) throw error;
      }

      // Eliminar ejercicios anteriores
      const { error: errorDeleteExercises } = await supabase
        .from("RoutineExercise")
        .delete()
        .eq("routineId", rutinaId);

      if (errorDeleteExercises) {
        throw errorDeleteExercises;
      }

      // Insertar ejercicios nuevos
      if (dia.exercises.length > 0) {
        const relaciones = dia.exercises.map((ex, index) => ({
          id: crypto.randomUUID(),
          routineId: rutinaId,
          exerciseId: ex.id,
          order: index + 1,
        }));

        const { error: errorEjercicios } = await supabase
          .from("RoutineExercise")
          .insert(relaciones);

        if (errorEjercicios) {
          throw errorEjercicios;
        }
      }
    }

    revalidatePath("/dashboard");
    revalidatePath("/rutinas");

    return {
      success: true,
    };
  } catch (error: any) {
    console.error("guardarPlanSemanalAction:", error);

    return {
      success: false,
      error: error.message || "Error al guardar el plan.",
    };
  }
}
