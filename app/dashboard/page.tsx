import {
  FiPlus,
  FiActivity,
  FiAward,
  FiClock,
  FiHome,
  FiList,
  FiTrendingUp,
  FiSettings,
} from "react-icons/fi";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* 1. SIDEBAR (Solo visible en Desktop) */}
      <aside className="hidden md:flex md:w-64 lg:w-72 border-r border-zinc-900 flex-col p-6 sticky top-0 h-screen">
        <h2 className="text-xl font-black italic tracking-tighter uppercase mb-10">
          Lightweight <span className="text-yellow-400">Baby!</span>
        </h2>

        <nav className="flex flex-col gap-2 flex-1">
          <SidebarItem icon={<FiHome />} label="Dashboard" active />
          <SidebarItem icon={<FiList />} label="Mis Rutinas" />
          <SidebarItem icon={<FiTrendingUp />} label="Progreso" />
          <SidebarItem icon={<FiSettings />} label="Ajustes" />
        </nav>

        <div className="mt-auto p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800">
          <p className="text-[10px] font-black uppercase text-zinc-500 mb-1">
            Usuario
          </p>
          <p className="text-sm font-bold italic">Tomás González</p>
        </div>
      </aside>

      {/* 2. CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-5xl px-6 py-10 pb-32 md:pb-10 space-y-8">
          {/* Header (En móvil sale el nombre, en PC puede ser un saludo) */}
          <header className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase leading-none">
                HOLA, <span className="text-yellow-400">TOMÁS</span>
              </h1>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-2">
                ¿Qué rompemos hoy?
              </p>
            </div>
            {/* Solo se ve en móvil porque en PC está en el sidebar */}
            <div className="md:hidden w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-xl">
              👤
            </div>
          </header>

          {/* Grid Principal (Layout cambia en Desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna Izquierda/Centro: Entrenamiento y Rutinas */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tarjeta de Acción Principal */}
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
                  <button className="bg-yellow-400 text-black font-black px-8 py-4 rounded-2xl uppercase tracking-widest hover:bg-yellow-500 transition-all active:scale-[0.98]">
                    EMPEZAR AHORA
                  </button>
                </div>
                {/* Decoración de fondo */}
                <div className="absolute -right-5 -bottom-5 text-9xl font-black italic text-white/3 pointer-events-none group-hover:text-yellow-400/5 transition-colors">
                  PUSH
                </div>
              </section>

              {/* Tus Rutinas */}
              <section className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">
                  Mis Rutinas
                </h3>
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
                        <FiClock className="text-zinc-700" />
                      </div>
                    ),
                  )}
                </div>
              </section>
            </div>

            {/* Columna Derecha: Stats (En Desktop queda al costado) */}
            <aside className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">
                Progreso
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                <StatCard icon={<FiActivity />} label="Racha" value="4 DÍAS" />
                <StatCard icon={<FiAward />} label="Último PR" value="100 KG" />
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* 3. BOTÓN FLOTANTE (Solo móvil) */}
      <button className="md:hidden fixed bottom-24 right-6 w-14 h-14 bg-yellow-400 text-black rounded-full flex items-center justify-center text-2xl shadow-2xl active:scale-90 transition-transform z-50">
        <FiPlus />
      </button>

      {/* 4. NAVEGACIÓN INFERIOR (Solo visible en Móvil) */}
      <nav className="md:hidden fixed bottom-0 w-full bg-black/80 backdrop-blur-md border-t border-zinc-900 px-8 py-4 flex justify-between items-center z-50">
        <NavIcon icon={<FiHome />} active />
        <NavIcon icon={<FiList />} />
        <NavIcon icon={<FiTrendingUp />} />
        <NavIcon icon={<FiSettings />} />
      </nav>
    </div>
  );
}

// COMPONENTES AUXILIARES
function SidebarItem({
  icon,
  label,
  active = false,
}: {
  icon: any;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold uppercase italic tracking-widest transition-all ${active ? "bg-yellow-400 text-black" : "text-zinc-500 hover:text-white hover:bg-zinc-900"}`}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-xs">{label}</span>
    </button>
  );
}

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
    <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-3xl flex flex-col gap-2">
      <div className="text-yellow-400 text-xl">{icon}</div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
          {label}
        </p>
        <p className="text-2xl font-black italic uppercase">{value}</p>
      </div>
    </div>
  );
}

function NavIcon({ icon, active = false }: { icon: any; active?: boolean }) {
  return (
    <button
      className={`flex flex-col items-center p-2 rounded-xl transition-all ${active ? "text-yellow-400 bg-yellow-400/10" : "text-zinc-600"}`}
    >
      <span className="text-2xl">{icon}</span>
    </button>
  );
}
