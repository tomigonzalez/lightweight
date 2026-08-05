import React from "react";

interface PinnedPRCardProps {
  pinnedPR?: {
    exercise: string;
    weight: number;
    reps: number;
  } | null;
}

export const PinnedPRCard = ({ pinnedPR }: PinnedPRCardProps) => {
  return (
    <div className="relative overflow-hidden bg-brand-gradient p-6 rounded-3xl text-black shadow-lg shadow-yellow-500/10 border border-yellow-300/30">
      {pinnedPR ? (
        <div className="relative z-10 flex flex-col justify-between h-full min-h-47.5">
          <div className="mt-4">
            <h4 className="text-2xl font-black italic uppercase leading-none tracking-tight">
              {pinnedPR.exercise}
            </h4>
          </div>

          <div className="mt-6 flex items-baseline justify-between pt-4 border-t border-black/10">
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black italic tracking-tighter leading-none">
                {pinnedPR.weight}
              </span>
              <span className="text-xl font-black italic opacity-80">KG</span>
            </div>

            <div className="bg-black text-yellow-400 font-black italic text-xs px-3 py-1.5 rounded-xl uppercase tracking-wider shadow-sm">
              {pinnedPR.reps} {pinnedPR.reps === 1 ? "Rep" : "Reps"}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex flex-col justify-between h-full min-h-47.5">
          <div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/10 border border-black/10 text-[10px] font-black uppercase tracking-widest text-black/70">
              Destacado
            </span>
            <h4 className="text-2xl font-black italic uppercase mt-3 leading-tight">
              Elegí un ejercicio ⭐
            </h4>
            <p className="text-xs font-semibold mt-2 text-black/70 leading-relaxed">
              Marcá un ejercicio de tu rutina activa para seguir tu peso máximo
              directo en el dashboard.
            </p>
          </div>

          <div className="mt-6 pt-3 border-t border-black/10">
            <span className="text-[10px] font-black uppercase tracking-wider text-black/60">
              Sin datos fijados
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
