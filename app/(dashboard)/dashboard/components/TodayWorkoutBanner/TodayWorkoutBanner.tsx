import StartWorkoutButton from "../Buttons/StartWorkoutButton";

interface TodayWorkoutBannerProps {
  hoy: string;
  nombreRutina: string;
  cantidadEjercicios: number;
  todayRoutineId?: string;
}

export function TodayWorkoutBanner({
  hoy,
  nombreRutina,
  cantidadEjercicios,
  todayRoutineId,
}: TodayWorkoutBannerProps) {
  return (
    <section className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 relative overflow-hidden group">
      <div className="relative z-10">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400 mb-4 block">
          Sugerencia para hoy ({hoy})
        </span>
        <h2 className="text-4xl font-black italic uppercase leading-none mb-2">
          {nombreRutina}
        </h2>

        <div className="flex items-center gap-3 mb-8 bg-black/40 w-fit px-4 py-2 rounded-xl border border-zinc-800/50">
          <div className="text-zinc-500 text-[10px] font-bold uppercase">
            Última vez
          </div>
          <div className="text-white font-black italic text-sm">
            {cantidadEjercicios} ejercicios
          </div>
        </div>

        {todayRoutineId ? (
          <StartWorkoutButton routineId={todayRoutineId} />
        ) : (
          <button
            disabled
            className="bg-zinc-800 text-zinc-500 font-black px-8 py-4 rounded-2xl uppercase tracking-widest cursor-not-allowed"
          >
            HOY ES DESCANSO
          </button>
        )}
      </div>

      <div className="absolute -right-2.5 -bottom-5 text-9xl font-black italic text-white/3 pointer-events-none group-hover:text-yellow-400/[0.07] transition-colors uppercase select-none">
        {nombreRutina.split(" ")[0]}
      </div>
    </section>
  );
}
