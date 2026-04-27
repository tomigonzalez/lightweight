import { FiZap } from "react-icons/fi";

export default function ProgresoPage() {
  return (
    <div className="space-y-10">
      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-black italic uppercase tracking-tighter">
          ANÁLISIS DE <span className="text-yellow-400">FUERZA</span>
        </h1>
        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">
          Visualizá tu sobrecarga progresiva
        </p>
      </header>

      {/* 1. MÉTRICAS RÁPIDAS (Top) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          label="Volumen Semanal"
          value="+12%"
          subValue="45.200 kg"
          trend="up"
        />
        <MetricCard
          label="Frecuencia"
          value="4.2"
          subValue="Días/Sem"
          trend="neutral"
        />
        <MetricCard
          label="PRs del Mes"
          value="8"
          subValue="Nuevas Marcas"
          trend="up"
        />
      </div>

      {/* 2. GRÁFICO DE EVOLUCIÓN (Placeholder visual) */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-lg font-black italic uppercase">
              Evolución por Ejercicio
            </h3>
            <p className="text-zinc-500 text-xs font-bold uppercase">
              Sentadilla libre (High Bar)
            </p>
          </div>
          {/* Selector de ejercicio (Maqueta) */}
          <select className="bg-black border border-zinc-800 rounded-xl px-4 py-2 text-xs font-bold uppercase outline-none focus:border-yellow-400">
            <option>Sentadilla</option>
            <option>Press de Banca</option>
            <option>Peso Muerto</option>
          </select>
        </div>

        {/* Simulador de Gráfico */}
        <div className="h-64 w-full flex items-end gap-3 px-2 border-b border-zinc-800">
          {[60, 65, 62, 70, 75, 72, 85, 90, 88, 100].map((height, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col items-center gap-2 group"
            >
              <div
                className="w-full bg-zinc-800 group-hover:bg-yellow-400 transition-all rounded-t-lg relative"
                style={{ height: `${height}%` }}
              >
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-black opacity-0 group-hover:opacity-100 transition-opacity">
                  {height}kg
                </span>
              </div>
              <span className="text-[8px] text-zinc-600 font-bold mb-2">
                S{i + 1}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. LISTA DE RÉCORDS (PRs) */}
      <section className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">
          Logros Recientes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PRCard
            exercise="Sentadilla"
            old="20kg x 6"
            current="22kg x 6"
            date="Hoy"
          />
          <PRCard
            exercise="Press Militar"
            old="15kg x 8"
            current="17kg x 6"
            date="Ayer"
          />
        </div>
      </section>
    </div>
  );
}

// COMPONENTES AUXILIARES
function MetricCard({ label, value, subValue, trend }: any) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl">
      <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">
        {label}
      </p>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-black italic uppercase">{value}</span>
        <span
          className={`text-[10px] font-bold ${trend === "up" ? "text-green-500" : "text-zinc-500"}`}
        >
          {trend === "up" ? "▲" : "●"}
        </span>
      </div>
      <p className="text-zinc-400 text-xs font-medium mt-1">{subValue}</p>
    </div>
  );
}

function PRCard({ exercise, old, current, date }: any) {
  return (
    <div className="bg-zinc-900/30 border border-zinc-800 p-5 rounded-2xl flex items-center justify-between group hover:border-yellow-400/30 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-yellow-400/10 rounded-xl flex items-center justify-center text-yellow-400">
          <FiZap />
        </div>
        <div>
          <p className="font-black italic uppercase text-sm">{exercise}</p>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">
            {old} <span className="text-zinc-700">→</span>{" "}
            <span className="text-white">{current}</span>
          </p>
        </div>
      </div>
      <span className="text-[10px] font-black text-zinc-700 group-hover:text-yellow-400 transition-colors uppercase italic">
        {date}
      </span>
    </div>
  );
}
