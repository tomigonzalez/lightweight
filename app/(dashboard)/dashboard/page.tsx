import { getCurrentUserProfile } from "@/app/services/userQueries";
import { redirect } from "next/navigation";
import {
  FiActivity,
  FiAward,
  FiArrowRight,
  FiTrendingUp,
} from "react-icons/fi";

export default async function DashboardPage() {
  // 1. Llamamos al helper en una sola línea limpia
  const profile = await getCurrentUserProfile();

  // 2. Si no hay perfil (no está logueado), rebote automático
  if (!profile) {
    redirect("/login");
  }

  // 3. Usamos el nombre real de la BD con un fallback seguro por las dudas
  const nombreUsuario =
    profile.name?.toUpperCase() || profile.email.split("@")[0].toUpperCase();
  // Estos datos luego vendrán de tu DB
  const hoy = "Lunes";
  const rutinaHoy = "Push Day";
  const ultimaCargaTotal = "42,500 kg";
  const porcentajeMejora = "+5.2%";

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 1. Header de Bienvenida */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase leading-none">
            HOLA, <span className="text-yellow-400">{nombreUsuario}</span>
          </h1>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-2">
            Hoy es {hoy}, ¿listo para la sobrecarga?
          </p>
        </div>
        <div className="md:hidden w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-xl">
          👤
        </div>
      </header>

      {/* 2. Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Tarjeta de Sugerencia Dinámica (Basada en el día) */}
          <section className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 relative overflow-hidden group">
            <div className="relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400 mb-4 block">
                Sugerencia para hoy ({hoy})
              </span>
              <h2 className="text-4xl font-black italic uppercase leading-none mb-2">
                {rutinaHoy}
              </h2>

              {/* COMPARATIVA DE "SOBREESCRITURA" VISUAL */}
              <div className="flex items-center gap-3 mb-8 bg-black/40 w-fit px-4 py-2 rounded-xl border border-zinc-800/50">
                <div className="text-zinc-500 text-[10px] font-bold uppercase">
                  Última vez
                </div>
                <div className="text-white font-black italic text-sm">
                  {ultimaCargaTotal}
                </div>
                <div className="text-green-500 font-black text-[10px] flex items-center gap-1">
                  <FiTrendingUp /> {porcentajeMejora}
                </div>
              </div>

              <button className="bg-yellow-400 text-black font-black px-8 py-4 rounded-2xl uppercase tracking-widest hover:bg-yellow-500 transition-all active:scale-[0.98] shadow-lg shadow-yellow-400/10 flex items-center gap-2 group/btn">
                EMPEZAR AHORA{" "}
                <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Decoración de fondo */}
            <div className="absolute -right-2.5 -bottom-5 text-9xl font-black italic text-white/3 pointer-events-none group-hover:text-yellow-400/[0.07] transition-colors uppercase">
              {rutinaHoy.split(" ")[0]}
            </div>
          </section>

          {/* Tus Rutinas de la Semana */}
          <section className="space-y-4">
            <div className="flex justify-between items-end">
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">
                Plan Semanal Activo
              </h3>
              <button className="text-yellow-400 text-[10px] font-black uppercase tracking-widest hover:underline">
                Ver Plan Completo
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Lunes: Push",
                "Martes: Pull",
                "Jueves: Legs",
                "Viernes: Upper",
              ].map((rutina) => (
                <div
                  key={rutina}
                  className="bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex justify-between items-center transition-all cursor-pointer group"
                >
                  <span className="font-bold uppercase italic text-sm group-hover:text-yellow-400 transition-colors">
                    {rutina}
                  </span>
                  <FiArrowRight className="text-zinc-700 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Columna Derecha: Estadísticas */}
        <aside className="space-y-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">
            Resumen de Fuerza
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            <StatCard
              icon={<FiActivity />}
              label="Racha Actual"
              value="4 DÍAS"
            />
            <StatCard icon={<FiAward />} label="PR Sentadilla" value="120 KG" />

            {/* Widget de Próximo Objetivo */}
            <div className="bg-yellow-400 p-6 rounded-3xl text-black">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-70">
                Próximo Objetivo
              </p>
              <p className="text-xl font-black italic uppercase leading-tight mt-1">
                Banca 100KG
              </p>
              <div className="mt-4 h-1.5 bg-black/20 rounded-full overflow-hidden">
                <div className="h-full bg-black w-[80%]"></div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-3xl flex flex-col gap-2 hover:border-zinc-700 transition-colors">
      <div className="text-yellow-400 text-xl">{icon}</div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
          {label}
        </p>
        <p className="text-2xl font-black italic uppercase leading-tight">
          {value}
        </p>
      </div>
    </div>
  );
}
