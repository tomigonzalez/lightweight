// app/(dashboard)/rutinas/nueva/form.tsx
"use client";

import { useState } from "react";
import {
  FiSave,
  FiPlus,
  FiTrash2,
  FiClock,
  FiCalendar,
  FiEdit,
} from "react-icons/fi";

import { useRouter } from "next/navigation";
import { guardarPlanSemanalAction } from "./actions";

interface ExerciseBase {
  id: string;
  name: string;
  muscleGroup: string;
}

interface DiaEstado {
  name: string;
  isDescanso: boolean;
  exercises: ExerciseBase[];
}

interface PlanEstado {
  [key: number]: DiaEstado;
}

const DIAS_SEMANA = [
  { id: 1, name: "Lunes" },
  { id: 2, name: "Martes" },
  { id: 3, name: "Miércoles" },
  { id: 4, name: "Jueves" },
  { id: 5, name: "Viernes" },
  { id: 6, name: "Sábado" },
  { id: 0, name: "Domingo" },
];

function crearEstadoInicial(rutinasActuales: any[]): PlanEstado {
  const estado = DIAS_SEMANA.reduce(
    (acc, dia) => ({
      ...acc,
      [dia.id]: {
        name: "",
        isDescanso: true,
        exercises: [],
      },
    }),
    {} as PlanEstado,
  );

  for (const rutina of rutinasActuales) {
    estado[rutina.dayOfWeek] = {
      name: rutina.name,
      isDescanso: false,
      exercises:
        rutina.exercises?.map((re: any) => ({
          id: re.exercise.id,
          name: re.exercise.name,
          muscleGroup: re.exercise.muscleGroup,
        })) ?? [],
    };
  }

  return estado;
}
export default function PlanSemanalForm({
  exercisesBase,
  rutinasActuales,
}: {
  exercisesBase: ExerciseBase[];
  rutinasActuales: any[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // los días inician como descanso para obligar a darles un nombre o activarlos
  const [plan, setPlan] = useState<PlanEstado>(() =>
    crearEstadoInicial(rutinasActuales),
  );

  const toggleDescanso = (diaId: number) => {
    setPlan((prev) => {
      const eraDescanso = prev[diaId].isDescanso;
      return {
        ...prev,
        [diaId]: {
          ...prev[diaId],
          isDescanso: !eraDescanso,
          exercises: eraDescanso ? prev[diaId].exercises : [],
          name: eraDescanso ? "" : "Descanso",
        },
      };
    });
  };

  const handleNombreRutinaChange = (diaId: number, valor: string) => {
    setPlan((prev) => ({
      ...prev,
      [diaId]: { ...prev[diaId], name: valor },
    }));
  };

  const agregarEjercicioADia = (diaId: number, exerciseId: string) => {
    if (!exerciseId) return;
    const cacheEx = exercisesBase.find((e) => e.id === exerciseId);
    if (!cacheEx) return;

    setPlan((prev) => ({
      ...prev,
      [diaId]: {
        ...prev[diaId],
        exercises: [...prev[diaId].exercises, cacheEx],
      },
    }));
  };

  const eliminarEjercicioDeDia = (diaId: number, indexAEliminar: number) => {
    setPlan((prev) => ({
      ...prev,
      [diaId]: {
        ...prev[diaId],
        exercises: prev[diaId].exercises.filter(
          (_, idx) => idx !== indexAEliminar,
        ),
      },
    }));
  };

  const handleGuardarTodo = async () => {
    setLoading(true);

    try {
      const res = await guardarPlanSemanalAction({ plan });

      if (res?.success) {
        router.push("/dashboard");
      } else {
        alert("Error al guardar: " + res?.error);
      }
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error inesperado al procesar la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="">
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">
            MI <span className="text-yellow-400">RUTINA SEMANAL</span>
          </h1>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">
            Editá tu rutina semanal cuando lo necesites.
          </p>
        </div>
        <button
          onClick={handleGuardarTodo}
          disabled={loading}
          className="w-full md:w-auto bg-yellow-400 text-black px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-yellow-500 transition-all shadow-lg shadow-yellow-400/10 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <FiSave /> {loading ? "GUARDANDO FIERROS..." : "Guardar"}
        </button>
      </header>

      <div className="space-y-6 ">
        <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2 ">
          <FiCalendar className="text-yellow-400" /> Distribución por días
        </h3>

        {DIAS_SEMANA.map((dia) => {
          const diaEstado = plan[dia.id];

          return (
            <div
              key={dia.id}
              className={`bg-zinc-900 border rounded-3xl overflow-hidden transition-all ${
                diaEstado.isDescanso
                  ? "border-zinc-900/50 opacity-60"
                  : "border-zinc-800"
              }`}
            >
              <div className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-800/50 bg-zinc-900/50">
                <div className="flex items-center gap-4 flex-1 w-full">
                  <span className="w-12 h-12 bg-black border border-zinc-800 rounded-xl flex items-center justify-center font-black italic text-yellow-400 text-sm">
                    {dia.name.substring(0, 2).toUpperCase()}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-black italic uppercase text-lg">
                      {dia.name}
                    </h4>
                    {!diaEstado.isDescanso ? (
                      <input
                        type="text"
                        value={diaEstado.name}
                        onChange={(e) =>
                          handleNombreRutinaChange(dia.id, e.target.value)
                        }
                        placeholder="Ej: Empuje / Piernas"
                        className="bg-transparent text-sm border-b border-zinc-800 focus:border-yellow-400 outline-none font-bold text-white w-full py-1 max-w-xs transition-colors"
                      />
                    ) : (
                      <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-tighter">
                        Estado: Descanso Total
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex w-full md:w-auto gap-2 items-center">
                  <button
                    type="button"
                    onClick={() => toggleDescanso(dia.id)}
                    className="flex-1 md:flex-none bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors whitespace-nowrap"
                  >
                    {diaEstado.isDescanso ? "Activar Día" : "Marcar Descanso"}
                  </button>

                  {!diaEstado.isDescanso && (
                    <div className="relative bg-zinc-950 px-3 py-2 rounded-lg border border-zinc-800 flex items-center gap-2">
                      <FiPlus className="text-yellow-400" />
                      <select
                        onChange={(e) => {
                          agregarEjercicioADia(dia.id, e.target.value);
                          e.target.value = "";
                        }}
                        defaultValue=""
                        className="bg-transparent text-[10px] font-black uppercase tracking-widest text-zinc-400 outline-none cursor-pointer pr-2"
                      >
                        <option value="" disabled>
                          Agregar Ejercicio
                        </option>
                        {exercisesBase.map((ex) => (
                          <option
                            key={ex.id}
                            value={ex.id}
                            className="bg-zinc-900 text-white"
                          >
                            [{ex.muscleGroup.toUpperCase()}] {ex.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 space-y-2 bg-black/20">
                {diaEstado.isDescanso ? (
                  <div className="p-4 text-xs font-bold text-zinc-600 italic uppercase">
                    🔋 Creciendo en el sillón. Hoy no se entrena.
                  </div>
                ) : diaEstado.exercises.length === 0 ? (
                  <div className="flex items-center gap-4 p-4 bg-black/40 rounded-2xl border border-zinc-800/50">
                    <FiClock className="text-zinc-700" />
                    <span className="text-sm font-bold text-zinc-500 italic">
                      No hay ejercicios agregados aún. Escribí un nombre arriba
                      y agregá movimientos.
                    </span>
                  </div>
                ) : (
                  diaEstado.exercises.map((ex, index) => (
                    <div
                      key={`${ex.id}-${index}`}
                      className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-zinc-800/50"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-black text-zinc-600">
                          #{index + 1}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-black text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-2 py-0.5 rounded uppercase">
                            {ex.muscleGroup}
                          </span>
                          <span className="text-sm font-bold text-white uppercase italic">
                            {ex.name}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => {}}
                          className="text-zinc-500 hover:text-yellow-400 transition-colors cursor-pointer p-1"
                        >
                          <FiEdit size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => eliminarEjercicioDeDia(dia.id, index)}
                          className="text-zinc-500 hover:text-red-400 transition-colors cursor-pointer p-1"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
