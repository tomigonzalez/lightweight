import {
  FiHome,
  FiList,
  FiTrendingUp,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { signout } from "@/app/(auth)/login/actions";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      <aside className="hidden md:flex md:w-64 lg:w-72 border-r border-zinc-900 flex-col p-6 sticky top-0 h-screen">
        <h2 className="text-xl font-black italic tracking-tighter uppercase mb-10">
          Lightweight <span className="text-yellow-400">Baby!</span>
        </h2>
        <nav className="flex flex-col gap-2 flex-1">
          <SidebarItem href="/dashboard" icon={<FiHome />} label="Dashboard" />
          <SidebarItem href="/rutinas" icon={<FiList />} label="Mis Rutinas" />
          <SidebarItem
            href="/progreso"
            icon={<FiTrendingUp />}
            label="Progreso"
          />
          <SidebarItem href="/ajustes" icon={<FiSettings />} label="Ajustes" />
        </nav>

        <form action={signout}>
          <button
            type="submit"
            className="w-full cursor-pointer flex items-center gap-4 px-4 py-3 rounded-xl font-bold uppercase italic tracking-widest text-red-500 hover:text-white hover:bg-red-950/30 transition-all text-left"
          >
            <span className="text-xl">
              <FiLogOut />
            </span>
            <span className="text-xs">Cerrar Sesión</span>
          </button>
        </form>
      </aside>

      <main className="flex-1 flex justify-center ">
        <div className="w-full max-w-5xl px-6 py-10 pb-32 md:pb-10">
          {children}
        </div>
      </main>

      <nav className="md:hidden fixed bottom-0 w-full bg-black/80 backdrop-blur-md border-t border-zinc-900 px-8 py-4 flex justify-between items-center z-50">
        <Link href="/dashboard" className="text-2xl text-zinc-600">
          <FiHome />
        </Link>
        <Link href="/rutinas" className="text-2xl text-zinc-600">
          <FiList />
        </Link>
        <Link href="/progreso" className="text-2xl text-zinc-600">
          <FiTrendingUp />
        </Link>
        <Link href="/ajustes" className="text-2xl text-zinc-600">
          <FiSettings />
        </Link>
        <form action={signout} className="flex items-center">
          <button
            type="submit"
            className="text-2xl text-red-500 hover:text-red-400 cursor-pointer"
          >
            <FiLogOut />
          </button>
        </form>
      </nav>
    </div>
  );
}

function SidebarItem({
  href,
  icon,
  label,
}: {
  href: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 px-4 py-3 rounded-xl font-bold uppercase italic tracking-widest text-zinc-500 hover:text-white hover:bg-zinc-900 transition-all"
    >
      <span className="text-xl">{icon}</span>
      <span className="text-xs">{label}</span>
    </Link>
  );
}
