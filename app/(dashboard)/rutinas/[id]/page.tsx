import { FiCheck, FiClock, FiChevronLeft } from "react-icons/fi";
import Link from "next/link";

export default function EntrenamientoActivo() {
  // Simulación de datos que vendrían de Prisma
  const ejercicios = [
    { id: 1, nombre: "Sentadillas", lastWeight: "20kg", lastReps: "6" },
    { id: 2, nombre: "Press Militar", lastWeight: "15kg", lastReps: "8" },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header con Volver */}
      <header className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="p-2 bg-zinc-900 rounded-lg text-zinc-400"
        >
          <FiChevronLeft />
        </Link>
        <div>
          <h1 className="text-2xl font-black italic uppercase tracking-tighter">
            PULL <span className="text-yellow-400">DAY</span>
          </h1>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
            Semana 2 • Sesión de Fuerza
          </p>
        </div>
      </header>

      {/* Lista de Ejercicios */}
      <div className="space-y-4">
        {ejercicios.map((ej) => (
          <div
            key={ej.id}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-black italic uppercase text-lg">
                {ej.nombre}
              </h3>
              <span className="text-yellow-400 text-[10px] font-bold bg-yellow-400/10 px-2 py-1 rounded">
                ÚLTIMO: {ej.lastWeight} x {ej.lastReps}
              </span>
            </div>

            {/* Inputs de carga actual */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[8px] font-black text-zinc-500 uppercase ml-1">
                  Peso (kg)
                </span>
                <input
                  type="number"
                  placeholder={ej.lastWeight.replace("kg", "")}
                  className="bg-black border border-zinc-800 rounded-xl py-3 text-center font-bold focus:border-yellow-400 outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[8px] font-black text-zinc-500 uppercase ml-1">
                  Reps
                </span>
                <input
                  type="number"
                  placeholder={ej.lastReps}
                  className="bg-black border border-zinc-800 rounded-xl py-3 text-center font-bold focus:border-yellow-400 outline-none"
                />
              </div>
              <div className="flex items-end">
                <button className="w-full bg-zinc-800 hover:bg-yellow-400 hover:text-black h-[50px] rounded-xl flex items-center justify-center transition-all">
                  <FiCheck className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botón Finalizar */}
      <button className="w-full bg-yellow-400 text-black font-black py-5 rounded-2xl uppercase tracking-[0.2em] shadow-xl shadow-yellow-400/10 active:scale-95 transition-all">
        Finalizar y Guardar
      </button>
    </div>
  );
}
