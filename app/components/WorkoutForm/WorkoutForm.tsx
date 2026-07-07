"use client";

import { WorkoutComplete } from "@/app/types/workout";
import ExerciseCard from "./ExerciseCard/ExerciseCard";
import { useState } from "react";

interface Props {
  workout: WorkoutComplete;
  userId: string;
}
interface WorkoutSet {
  setNumber: number;
  weight: number | "";
  reps: number | "";
}

interface ExerciseWorkoutState {
  exerciseId: string;
  sets: WorkoutSet[];
}

export default function WorkoutForm({ workout }: Props) {
  const [exerciseData, setExerciseData] = useState<ExerciseWorkoutState[]>(() =>
    workout.routine.exercises.map((item) => ({
      exerciseId: item.exercise.id,
      sets: item.exercise.lastSets?.map((set) => ({
        setNumber: set.setNumber,
        weight: set.weight,
        reps: set.reps,
      })) ?? [
        {
          setNumber: 1,
          weight: "",
          reps: "",
        },
      ],
    })),
  );
  const actualizarSet = (
    exerciseId: string,
    index: number,
    campo: "weight" | "reps",
    valor: number | "",
  ) => {
    setExerciseData((prev) =>
      prev.map((exercise) =>
        exercise.exerciseId === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets.map((set, i) =>
                i === index
                  ? {
                      ...set,
                      [campo]: valor,
                    }
                  : set,
              ),
            }
          : exercise,
      ),
    );
  };

  const agregarSerie = (exerciseId: string) => {
    setExerciseData((prev) =>
      prev.map((exercise) =>
        exercise.exerciseId === exerciseId
          ? {
              ...exercise,
              sets: [
                ...exercise.sets,
                {
                  setNumber: exercise.sets.length + 1,
                  weight: "",
                  reps: "",
                },
              ],
            }
          : exercise,
      ),
    );
  };

  const eliminarSerie = (exerciseId: string, index: number) => {
    setExerciseData((prev) =>
      prev.map((exercise) =>
        exercise.exerciseId === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets
                .filter((_, i) => i !== index)
                .map((set, i) => ({
                  ...set,
                  setNumber: i + 1,
                })),
            }
          : exercise,
      ),
    );
  };
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <header>
        <p className="text-xs uppercase text-zinc-500 font-black">
          Entrenamiento
        </p>

        <h1 className="text-4xl font-black italic uppercase">
          {workout.routine.name}
        </h1>
      </header>

      <div className="space-y-5">
        {workout.routine.exercises.map((item) => (
          <div
            key={item.exercise.id}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
          >
            <span className="text-[10px] uppercase text-yellow-400 font-black tracking-widest">
              {item.exercise.muscleGroup}
            </span>

            <h2 className="text-xl font-black italic uppercase mt-1 mb-5">
              {item.exercise.name}
            </h2>

            <ExerciseCard
              exercise={item.exercise}
              sets={
                exerciseData.find((e) => e.exerciseId === item.exercise.id)!
                  .sets
              }
              onChange={actualizarSet}
              onAddSet={agregarSerie}
              onDeleteSet={eliminarSerie}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
