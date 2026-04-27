import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* --- NAVBAR --- */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full">
        <h1 className="text-xl md:text-2xl font-black italic tracking-tighter uppercase">
          Lightweight <span className="text-yellow-400">Baby!</span>
        </h1>
        <Link
          href="/login"
          className="text-[10px] md:text-sm font-bold uppercase tracking-widest hover:text-yellow-400 transition border-b border-transparent hover:border-yellow-400"
        >
          Iniciar Sesión
        </Link>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-10 md:py-20">
        <div className="max-w-4xl w-full">
          {/* Ajustamos el leading y el tamaño para móvil */}
          <h2 className="text-5xl sm:text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.85] mb-6">
            ENTRENÁ CON <br />
            <span className="text-yellow-400 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]">
              INTELIGENCIA
            </span>
          </h2>

          <p className="text-zinc-500 text-base md:text-xl max-w-xl mx-auto mb-10 font-medium leading-tight">
            La herramienta definitiva para el seguimiento de sobrecarga
            progresiva. Simple, rápida y diseñada para el gimnasio.
          </p>

          {/* Botones apilados en móvil, uno al lado del otro en sm: */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-sm mx-auto sm:max-w-none">
            <Link
              href="/register"
              className="w-full sm:w-auto bg-yellow-400 text-black px-10 py-4 md:py-5 rounded-xl font-black uppercase tracking-widest hover:bg-yellow-500 transition-all text-center"
            >
              Crear mi cuenta
            </Link>
            <button className="w-full cursor-pointer sm:w-auto bg-transparent border-2 border-zinc-800 text-white px-10 py-4 md:py-5 rounded-xl font-black uppercase tracking-widest hover:border-zinc-600 transition active:scale-95">
              Ver funciones
            </button>
          </div>
        </div>
      </main>

      {/* --- FEATURES PREVIEW --- */}

      <section className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-zinc-900">
        <FeatureItem
          num="01"
          title="REGISTRO RAPIDO"
          desc="Cargá tus series en segundos entre descansos."
        />
        <FeatureItem
          num="02"
          title="HISTORIAL REAL"
          desc="Recordamos tu marca anterior para que la superes."
        />
        <FeatureItem
          num="03"
          title="A MEDIDA"
          desc="Tus propios ejercicios, tu propio ritmo."
        />
      </section>
    </div>
  );
}

function FeatureItem({
  num,
  title,
  desc,
}: {
  num: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-zinc-900 last:border-0 hover:bg-zinc-950 transition">
      <span className="text-yellow-400 font-mono text-xs md:text-sm mb-3 md:mb-4 block">
        {num}
      </span>
      <h3 className="text-lg md:text-xl font-black italic uppercase mb-2">
        {title}
      </h3>
      <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
