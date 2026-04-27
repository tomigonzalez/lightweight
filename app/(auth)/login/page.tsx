import Link from "next/link";
import { FaGoogle } from "react-icons/fa"; // Si no tenés react-icons, podés usar un SVG
import { FiArrowLeft } from "react-icons/fi";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <div className="absolute top-8 left-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">
            Volver
          </span>
        </Link>
      </div>
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-black italic tracking-tighter uppercase">
            BIENVENIDO <span className="text-yellow-400">DE NUEVO</span>
          </h2>
          <p className="text-zinc-500 mt-2 font-medium uppercase text-xs tracking-widest">
            Preparate para otra sesión intensa
          </p>
        </div>

        {/* Botón de Google */}
        <div className="space-y-4 mt-8">
          <button className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-zinc-200 transition-all active:scale-[0.98]">
            <FaGoogle className="text-xl" />
            Continuar con Google
          </button>

          {/* Divisor */}
          <div className="flex items-center gap-4 py-2">
            <div className="h-[1px] bg-zinc-800 flex-1"></div>
            <span className="text-zinc-600 text-xs font-bold uppercase">
              o con email
            </span>
            <div className="h-[1px] bg-zinc-800 flex-1"></div>
          </div>
        </div>

        {/* Formulario Tradicional */}
        <form className="space-y-4">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">
              Email
            </label>
            <input
              type="email"
              placeholder="tu@email.com"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 mt-1 focus:outline-none focus:border-yellow-400 transition text-sm"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 mt-1 focus:outline-none focus:border-yellow-400 transition text-sm"
            />
          </div>

          <button className="w-full bg-yellow-400 text-black font-black py-4 rounded-xl uppercase tracking-widest hover:bg-yellow-500 transition-all active:scale-[0.98] mt-2">
            Entrar al Rack
          </button>
        </form>

        <p className="text-center text-zinc-500 text-sm">
          ¿Sos nuevo?{" "}
          <a href="/register" className="text-yellow-400 font-bold">
            Creá tu cuenta
          </a>
        </p>
      </div>
    </div>
  );
}
