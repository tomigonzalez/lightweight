import {
  FiCalendar,
  FiEdit3,
  FiPlus,
  FiChevronRight,
  FiCheckCircle,
} from "react-icons/fi";
import Link from "next/link";

export default function RutinasGestionPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* HEADER */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">
            MIS <span className="text-yellow-400">PLANES</span>
          </h1>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">
            Gestioná tu programación semanal
          </p>
        </div>
        <Link
          href="/rutinas/nueva"
          className="bg-yellow-400 text-black p-3 md:px-6 md:py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-yellow-500 transition-all flex items-center gap-2 shadow-lg shadow-yellow-400/10"
        >
          <FiPlus className="text-lg" />
          <span className="hidden md:block">Nuevo Plan</span>
        </Link>
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
                  Hipertrofia - PPL
                </h3>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">
                  Creado hace 3 semanas • Frecuencia 5x
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
            <div className="grid grid-cols-7 gap-2 mt-8">
              {["L", "M", "M", "J", "V", "S", "D"].map((dia, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div
                    className={`w-full aspect-square rounded-lg flex items-center justify-center font-black text-[10px] ${i < 5 ? "bg-yellow-400 text-black" : "bg-zinc-800 text-zinc-600"}`}
                  >
                    {dia}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Marca de agua de fondo */}
          <FiCalendar className="absolute -right-8 -bottom-8 text-white/[0.03] text-[12rem] -rotate-12 pointer-events-none" />
        </div>
      </section>

      {/* 2. OTROS PLANES GUARDADOS (BIBLIOTECA) */}
      <section className="space-y-4">
        <h2 className="text-xs font-black uppercase tracking-widest text-zinc-500">
          Historial de Planes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Plan Card */}
          <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-2xl flex items-center justify-between group hover:border-zinc-700 transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-500 group-hover:text-yellow-400 transition-colors">
                <FiCalendar />
              </div>
              <div>
                <p className="font-black italic uppercase text-sm">
                  Fuerza 5x5 - Básicos
                </p>
                <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-tighter">
                  Usado por última vez en Enero
                </p>
              </div>
            </div>
            <FiChevronRight className="text-zinc-800 group-hover:text-yellow-400 transition-colors" />
          </div>

          {/* Otro Plan Card */}
          <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-2xl flex items-center justify-between group hover:border-zinc-700 transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-500 group-hover:text-yellow-400 transition-colors">
                <FiCalendar />
              </div>
              <div>
                <p className="font-black italic uppercase text-sm">
                  Full Body - 3 Días
                </p>
                <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-tighter">
                  Sin activar
                </p>
              </div>
            </div>
            <FiChevronRight className="text-zinc-800 group-hover:text-yellow-400 transition-colors" />
          </div>
        </div>
      </section>
    </div>
  );
}
