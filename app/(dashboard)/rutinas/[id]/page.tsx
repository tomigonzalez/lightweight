// app/(dashboard)/rutinas/[id]/page.tsx
export default function SesionDeEntrenamiento() {
  // Simulamos datos traídos de Prisma
  const ejerciciosPlanificados = [
    {
      id: "ex-1",
      nombre: "Sentadilla con Barra",
      series: 4,
      ultimoRegistro: { peso: 20, reps: 6 }, // <--- EL DATO A SUPERAR
    },
    // ... más ejercicios
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-black italic uppercase">
          ENTRENANDO: <span className="text-yellow-400">PULL</span>
        </h1>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
          Registrando sobrecarga progresiva
        </p>
      </header>

      <div className="space-y-4">
        {ejerciciosPlanificados.map((ej) => (
          <div
            key={ej.id}
            className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl space-y-4"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-black italic uppercase tracking-tight">
                {ej.nombre}
              </h3>
              {/* EL FANTASMA VISUAL */}
              <div className="bg-black border border-zinc-800 px-3 py-1 rounded-lg">
                <p className="text-[8px] font-black text-zinc-500 uppercase leading-none mb-1">
                  Semana Pasada
                </p>
                <p className="text-xs font-black italic text-yellow-400 uppercase">
                  {ej.ultimoRegistro.peso}kg x {ej.ultimoRegistro.reps} reps
                </p>
              </div>
            </div>

            {/* Inputs para el nuevo progreso */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-[9px] font-black text-zinc-600 uppercase ml-1">
                  Peso Hoy (KG)
                </span>
                <input
                  type="number"
                  placeholder={ej.ultimoRegistro.peso.toString()}
                  className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-center font-black focus:border-yellow-400 outline-none transition-all placeholder:text-zinc-800"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-black text-zinc-600 uppercase ml-1">
                  Reps Hoy
                </span>
                <input
                  type="number"
                  placeholder={ej.ultimoRegistro.reps.toString()}
                  className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-center font-black focus:border-yellow-400 outline-none transition-all placeholder:text-zinc-800"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full bg-white text-black font-black py-5 rounded-2xl uppercase tracking-widest hover:bg-yellow-400 transition-colors">
        Finalizar y Actualizar Marcas
      </button>
    </div>
  );
}
