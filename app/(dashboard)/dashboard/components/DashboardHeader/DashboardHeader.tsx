interface DashboardHeaderProps {
  nombreUsuario: string;
  hoy: string;
}

export function DashboardHeader({ nombreUsuario, hoy }: DashboardHeaderProps) {
  return (
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
  );
}
