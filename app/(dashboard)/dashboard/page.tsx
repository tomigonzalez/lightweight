import { FiActivity, FiAward, FiClock, FiArrowRight } from "react-icons/fi";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 1. Header de Bienvenida */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase leading-none">
            HOLA, <span className="text-yellow-400">TOMÁS</span>
          </h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-2">
            ¿Qué rompemos hoy?
          </p>
        </div>
        {/* Avatar visible solo en móvil (opcional, ya que el sidebar de PC suele tenerlo) */}
        <div className="md:hidden w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-xl">
          👤
        </div>
      </header>

      {/* 2. Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna Izquierda: Acción Principal y Rutinas */}
        <div className="lg:col-span-2 space-y-8">
          {/* Tarjeta de Sugerencia */}
          <section className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 relative overflow-hidden group">
            <div className="relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400 mb-4 block">
                Sugerencia para hoy
              </span>
              <h2 className="text-4xl font-black italic uppercase leading-none mb-2">
                PUSH DAY
              </h2>
              <p className="text-zinc-500 font-medium mb-8">
                Pecho, Hombros y Tríceps
              </p>
              <button className="bg-yellow-400 text-black font-black px-8 py-4 rounded-2xl uppercase tracking-widest hover:bg-yellow-500 transition-all active:scale-[0.98] shadow-lg shadow-yellow-400/10">
                EMPEZAR AHORA
              </button>
            </div>
            {/* Decoración de fondo (Marca de agua) */}
            <div className="absolute -right-2.5 -bottom-5 text-9xl font-black italic text-white/3 pointer-events-none group-hover:text-yellow-400/[0.07] transition-colors">
              PUSH
            </div>
          </section>

          {/* Tus Rutinas Recientes */}
          <section className="space-y-4">
            <div className="flex justify-between items-end">
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">
                Mis Rutinas
              </h3>
              <button className="text-yellow-400 text-[10px] font-black uppercase tracking-widest hover:underline">
                Ver todas
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["Pull Day", "Legs Focus", "Full Body", "Upper Body"].map(
                (rutina) => (
                  <div
                    key={rutina}
                    className="bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex justify-between items-center transition-all cursor-pointer group"
                  >
                    <span className="font-bold uppercase italic group-hover:text-yellow-400 transition-colors">
                      {rutina}
                    </span>
                    <FiArrowRight className="text-zinc-700 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
                  </div>
                ),
              )}
            </div>
          </section>
        </div>

        {/* Columna Derecha: Estadísticas y Progreso */}
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
            <StatCard icon={<FiAward />} label="Último PR" value="100 KG" />
          </div>
        </aside>
      </div>
    </div>
  );
}

// Componente de Tarjeta de Estadísticas (Podés moverlo a /components después)
function StatCard({
  icon,
  label,
  value,
}: {
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
