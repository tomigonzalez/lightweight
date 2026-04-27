import { FiSave, FiPlus, FiTrash2, FiMenu } from "react-icons/fi";

export default function NuevaRutina() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">
            CREAR <span className="text-yellow-400">RUTINA</span>
          </h1>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">
            Diseñá tu plan de entrenamiento
          </p>
        </div>
        <button className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-yellow-500 transition-all flex items-center gap-2">
          <FiSave /> Guardar
        </button>
      </header>

      {/* Info Básica */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-zinc-500 ml-1">
            Nombre de la Rutina
          </label>
          <input
            type="text"
            placeholder="Ej: Empuje - Fuerza"
            className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 focus:border-yellow-400 outline-none transition"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-zinc-500 ml-1">
            Día Sugerido
          </label>
          <select className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 focus:border-yellow-400 outline-none transition uppercase font-bold text-xs">
            <option>Lunes</option>
            <option>Martes</option>
            <option>Miércoles</option>
            <option>Jueves</option>
            <option>Viernes</option>
            <option>Sábado</option>
            <option>Domingo</option>
          </select>
        </div>
      </section>

      {/* Lista de Ejercicios (Draggable en el futuro) */}
      <section className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">
          Ejercicios de la sesión
        </h3>

        <div className="space-y-3">
          {/* Item de Ejercicio */}
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center gap-4 group">
            <FiMenu className="text-zinc-700 cursor-move" />
            <div className="flex-1">
              <p className="font-bold uppercase italic text-sm text-zinc-300">
                Sentadilla con barra
              </p>
              <p className="text-[10px] text-zinc-600 font-bold uppercase">
                4 Series • RPE 8
              </p>
            </div>
            <button className="text-zinc-700 hover:text-red-500 transition-colors">
              <FiTrash2 />
            </button>
          </div>

          {/* Botón Agregar Ejercicio */}
          <button className="w-full border-2 border-dashed border-zinc-800 hover:border-yellow-400/50 hover:bg-yellow-400/5 py-4 rounded-2xl flex items-center justify-center gap-2 text-zinc-500 hover:text-yellow-400 transition-all group">
            <FiPlus className="group-hover:rotate-90 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest">
              Agregar Ejercicio
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
