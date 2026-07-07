"use client";

import { useRouter } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";
import { startWorkoutAction } from "./actions";
import { useState } from "react";

interface Props {
  routineId: string;
}

export default function StartWorkoutButton({ routineId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);

      const workoutId = await startWorkoutAction(routineId);

      router.push(`/rutinas/workout/${workoutId}`);
    } catch (e) {
      console.error(e);
      alert("No se pudo iniciar el entrenamiento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="bg-yellow-400 text-black font-black px-8 py-4 rounded-2xl uppercase tracking-widest hover:bg-yellow-500 transition-all flex items-center gap-2 disabled:opacity-50"
    >
      {loading ? "INICIANDO..." : "EMPEZAR AHORA"}
      <FiArrowRight />
    </button>
  );
}
