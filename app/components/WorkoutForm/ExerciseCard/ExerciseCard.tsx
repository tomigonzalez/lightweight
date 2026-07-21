"use client";

import { Exercise } from "@/app/types/workout";
import { FiPlus, FiTrash2 } from "react-icons/fi";

interface WorkoutSet {
  setNumber: number;
  weight: number | "";
  reps: number | "";
}

interface ExerciseCardProps {
  exercise: Exercise;
  sets: WorkoutSet[];

  onChange: (
    exerciseId: string,
    index: number,
    campo: "weight" | "reps",
    valor: number | "",
  ) => void;

  onAddSet: (exerciseId: string) => void;

  onDeleteSet: (exerciseId: string, index: number) => void;
}

export default function ExerciseCard({
  exercise,
  sets,
  onChange,
  onAddSet,
  onDeleteSet,
}: ExerciseCardProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
      <div className="grid grid-cols-[50px_1fr_1fr_40px] gap-3 text-[10px] uppercase font-black text-zinc-500 mb-3 px-2">
        <span>#</span>
        <span className="text-center">Kg</span>
        <span className="text-center">Reps</span>
        <span></span>
      </div>

      <div className="space-y-2">
        {sets.map((set, index) => (
          <div
            key={set.setNumber}
            className="grid grid-cols-[50px_1fr_1fr_40px] gap-3 items-center"
          >
            <span className="font-black text-zinc-400 text-center">
              {set.setNumber}
            </span>

            <input
              type="number"
              value={set.weight}
              onChange={(e) =>
                onChange(
                  exercise.id,
                  index,
                  "weight",
                  e.target.value === "" ? "" : Number(e.target.value),
                )
              }
              className="w-full min-w-0 bg-black border border-zinc-800 rounded-xl py-3 text-center font-black outline-none focus:border-yellow-400"
            />

            <input
              type="number"
              value={set.reps}
              onChange={(e) =>
                onChange(
                  exercise.id,
                  index,
                  "reps",
                  e.target.value === "" ? "" : Number(e.target.value),
                )
              }
              className="w-full min-w-0 bg-black border border-zinc-800 rounded-xl py-3 text-center font-black outline-none focus:border-yellow-400"
            />

            <button
              type="button"
              onClick={() => onDeleteSet(exercise.id, index)}
              className="text-zinc-500 hover:text-red-400 transition"
            >
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onAddSet(exercise.id)}
        className="mt-5 w-full border border-dashed border-zinc-700 hover:border-yellow-400 rounded-2xl py-3 transition flex items-center justify-center gap-2 font-black uppercase text-xs"
      >
        <FiPlus />
        Agregar serie
      </button>
    </div>
  );
}
