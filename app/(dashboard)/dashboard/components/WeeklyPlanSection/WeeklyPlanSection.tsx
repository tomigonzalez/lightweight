import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import StartWorkoutButton from "../Buttons/StartWorkoutButton";

interface WeeklyRoutine {
  id: string;
  name: string;
  dayOfWeek: number | null;
}

interface WeeklyPlanSectionProps {
  weeklyRoutines: WeeklyRoutine[];
  days: string[];
}

export function WeeklyPlanSection({
  weeklyRoutines,
  days,
}: WeeklyPlanSectionProps) {
  return (
    <section className="space-y-4 order-last lg:order-0">
      <div className="flex justify-between items-end">
        <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">
          Plan Semanal Activo
        </h3>
        <Link
          href="/rutinas/nueva"
          className="text-yellow-400 text-[10px] font-black uppercase tracking-widest hover:underline"
        >
          Ver Plan Completo
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {weeklyRoutines.map((routine) => (
          <StartWorkoutButton
            routineId={routine.id}
            variant="card"
            key={routine.id}
          >
            <div className="bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex justify-between items-center transition-all cursor-pointer group">
              <span className="font-bold uppercase italic text-sm group-hover:text-yellow-400 transition-colors">
                {routine.dayOfWeek !== null
                  ? days[routine.dayOfWeek]
                  : "Sin día"}
                : {routine.name}
              </span>

              <FiArrowRight className="text-zinc-700 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
            </div>
          </StartWorkoutButton>
        ))}
      </div>
    </section>
  );
}
