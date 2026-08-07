import { FiCalendar, FiEdit3, FiPlus, FiCheckCircle } from "react-icons/fi";
import Link from "next/link";
import { getPlans } from "@/app/services/planQueries";
import { getCurrentUserProfile } from "@/app/services/userQueries";
import { redirect } from "next/navigation";

export default async function RutinasGestionPage() {
  const profile = await getCurrentUserProfile();

  if (!profile) {
    redirect("/login");
  }

  const routines = await getPlans(profile.id);

  const diasSemana = Array(7).fill(null);

  routines.forEach((routine) => {
    if (routine.dayOfWeek !== null) {
      diasSemana[routine.dayOfWeek] = routine;
    }
  });
  const frecuencia = routines.length;

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* HEADER */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">
            MI <span className="text-yellow-400">RUTINA</span>
          </h1>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">
            Gestioná tu rutina
          </p>
        </div>
      </header>

      {/* 1. PLAN ACTUAL (EL QUE ESTÁ EN USO) */}
      <section className="space-y-4">
        <h2 className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
          <FiCheckCircle className="text-green-500" /> Plan Activo
        </h2>

        <div className="bg-zinc-900 border-2 border-yellow-400/20 rounded-3xl p-6 md:p-8 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-black italic uppercase text-white">
                  PLAN SEMANAL
                </h3>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">
                  {frecuencia} DÍAS CONFIGURADOS
                </p>
              </div>
              <Link
                href="/rutinas/nueva" // O /rutinas/editar/[id]
                className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors text-yellow-400"
              >
                <FiEdit3 />
              </Link>
            </div>

            {/* Vista Previa de la Semana */}
            {frecuencia > 0 ? (
              <div className="grid grid-cols-7 gap-2 mt-8">
                {diasSemana.map((routine, i) => (
                  <div
                    key={i}
                    className={`w-full aspect-square rounded-lg flex items-center justify-center font-black text-[10px] ${
                      routine
                        ? "bg-brand-gradient text-black"
                        : "bg-zinc-800 text-zinc-600"
                    }`}
                  >
                    {["D", "L", "M", "X", "J", "V", "S"][i]}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <FiCalendar className="text-6xl text-zinc-700 mb-5" />

                <p className="text-zinc-400 font-bold uppercase tracking-widest text-sm mb-6">
                  Todavía no creaste una rutina
                </p>

                <Link
                  href="/rutinas/nueva"
                  className="bg-brand-gradient text-black px-6 py-3 rounded-xl font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  <FiPlus />
                  Agregar rutina
                </Link>
              </div>
            )}

            {/* Marca de agua de fondo */}
            <FiCalendar className="absolute -right-8 -bottom-8 text-white/3 text-[12rem] -rotate-12 pointer-events-none" />
          </div>
        </div>
      </section>
    </div>
  );
}
