// app/(auth)/register/page.tsx
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { signup } from "./actions";

interface RegisterPageProps {
  searchParams: Promise<{ error?: string }>;
}
export default async function RegisterPage({
  searchParams,
}: RegisterPageProps) {
  // si viene algún error desde la URL
  const { error } = await searchParams;
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
        <div className="text-center">
          <h2 className="text-4xl font-black italic tracking-tighter uppercase">
            UNITE AL <span className="text-yellow-400">TEAM</span>
          </h2>
          <p className="text-zinc-500 mt-2 font-medium">
            Empezá a trackear tus ganancias hoy mismo.
          </p>
        </div>

        {error && (
          <div className="p-4 bg-rose-950/40 border border-rose-500/50 rounded-xl text-rose-400 text-sm text-center font-bold tracking-wide">
            ⚠️ {error}
          </div>
        )}

        <form className="mt-8 space-y-4" action={signup}>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">
              Nombre
            </label>
            <input
              name="name"
              type="text"
              placeholder="Tomás González"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 mt-1 focus:outline-none focus:border-yellow-400 transition"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="tu@email.com"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 mt-1 focus:outline-none focus:border-yellow-400 transition"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 mt-1 focus:outline-none focus:border-yellow-400 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-black py-4 rounded-xl uppercase tracking-widest hover:bg-yellow-500 transition-all active:scale-[0.98] mt-4"
          >
            Crear Cuenta
          </button>
        </form>

        <p className="text-center text-zinc-500 text-sm cursor-pointer">
          ¿Ya tenés cuenta?{" "}
          <a href="/login" className="text-yellow-400 font-bold">
            Iniciá Sesión
          </a>
        </p>
      </div>
    </div>
  );
}
