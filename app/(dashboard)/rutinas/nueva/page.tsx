// app/(dashboard)/rutinas/nueva/page.tsx
import { FiSave, FiPlus, FiTrash2, FiClock, FiCalendar } from "react-icons/fi";

export default function NuevaPlanificacionSemanal() {
  const diasSemana = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      {/* 1. Header con Guardado Global */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">
            CONFIGURAR <span className="text-yellow-400">PLAN SEMANAL</span>
          </h1>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">
            Definí tu distribución de entrenamiento para los 7 días
          </p>
        </div>
        <button className="w-full md:w-auto bg-yellow-400 text-black px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-yellow-500 transition-all shadow-lg shadow-yellow-400/10 flex items-center justify-center gap-2">
          <FiSave /> Guardar Plan Completo
        </button>
      </header>

      {/* 2. Información General del Plan */}
      <section className="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-zinc-500 ml-1 italic">
            Nombre del Plan
          </label>
          <input
            type="text"
            placeholder="Ej: Mi Rutina de Volumen 2026"
            className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-4 focus:border-yellow-400 outline-none transition font-bold"
          />
        </div>
      </section>

      {/* 3. El Core: Acordeón o Lista de Días */}
      <div className="space-y-6">
        <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
          <FiCalendar className="text-yellow-400" /> Distribución por días
        </h3>

        {diasSemana.map((dia) => (
          <div
            key={dia}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden group"
          >
            {/* Cabecera del Día */}
            <div className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-800/50 bg-zinc-900/50">
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 bg-black border border-zinc-800 rounded-xl flex items-center justify-center font-black italic text-yellow-400 text-sm">
                  {dia.substring(0, 2)}
                </span>
                <div>
                  <h4 className="font-black italic uppercase text-lg">{dia}</h4>
                  <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-tighter">
                    Estado: Personalizando
                  </p>
                </div>
              </div>

              <div className="flex w-full md:w-auto gap-2">
                <button className="flex-1 md:flex-none bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors">
                  Marcar Descanso
                </button>
                <button className="flex-1 md:flex-none bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400 hover:text-black px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-yellow-400/20">
                  <FiPlus /> Agregar Ejercicio
                </button>
              </div>
            </div>

            {/* Lista de Ejercicios del Día (Simulación de "Dropslot") */}
            <div className="p-4 space-y-2">
              {/* Aquí se renderizarían los ejercicios que el usuario va sumando para ese día específico */}
              <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-zinc-800/50">
                <div className="flex items-center gap-4">
                  <FiClock className="text-zinc-700" />
                  <span className="text-sm font-bold text-zinc-400 italic">
                    No hay ejercicios agregados aún
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
