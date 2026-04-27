import {
  FiUser,
  FiSettings,
  FiBell,
  FiShield,
  FiLogOut,
  FiMoon,
  FiDribbble,
} from "react-icons/fi";

export default function AjustesPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-black italic uppercase tracking-tighter">
          CONFIGURACIÓN DE <span className="text-yellow-400">SISTEMA</span>
        </h1>
        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">
          Gestioná tu perfil y preferencias de entrenamiento
        </p>
      </header>

      {/* 1. SECCIÓN PERFIL */}
      <section className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
          <FiUser className="text-yellow-400" /> Cuenta de Usuario
        </h3>
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex items-center gap-6">
          <div className="w-20 h-20 bg-zinc-800 rounded-2xl flex items-center justify-center text-3xl border border-zinc-700 relative group cursor-pointer">
            👤
            <div className="absolute inset-0 bg-yellow-400/20 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity flex items-center justify-center">
              <span className="text-[8px] font-black text-black uppercase">
                Cambiar
              </span>
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-black italic uppercase">
              Tomás González
            </h4>
            <p className="text-zinc-500 text-xs font-medium">
              Full-stack Developer
            </p>
            <div className="mt-2 inline-block px-2 py-1 bg-yellow-400/10 rounded text-[10px] font-black text-yellow-400 uppercase tracking-tighter">
              Miembro desde Abril 2026
            </div>
          </div>
        </div>
      </section>

      {/* 2. PREFERENCIAS TÉCNICAS */}
      <section className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
          <FiSettings className="text-yellow-400" /> Preferencias de la App
        </h3>
        <div className="grid grid-cols-1 gap-3">
          <SettingsItem
            icon={<FiMoon />}
            label="Unidades de Peso"
            desc="Elegí entre Kilogramos (KG) o Libras (LB)"
            action={
              <span className="text-yellow-400 font-black italic">KG</span>
            }
          />
          <SettingsItem
            icon={<FiBell />}
            label="Notificaciones"
            desc="Recordatorios de entrenamiento y días de descanso"
            action={
              <div className="w-10 h-5 bg-yellow-400 rounded-full relative">
                <div className="absolute right-1 top-1 w-3 h-3 bg-black rounded-full"></div>
              </div>
            }
          />
          <SettingsItem
            icon={<FiDribbble />}
            label="Integraciones"
            desc="Conectar con Google Health o Strava"
            action={
              <span className="text-zinc-700 font-black italic">
                PRÓXIMAMENTE
              </span>
            }
          />
        </div>
      </section>

      {/* 3. SEGURIDAD Y ACCIÓN FINAL */}
      <section className="pt-6 border-t border-zinc-800 space-y-4">
        <button className="w-full flex items-center justify-between p-4 bg-zinc-900/30 hover:bg-red-500/10 border border-zinc-800 hover:border-red-500/50 rounded-2xl transition-all group">
          <div className="flex items-center gap-4">
            <FiLogOut className="text-zinc-500 group-hover:text-red-500" />
            <span className="text-sm font-black italic uppercase text-zinc-400 group-hover:text-red-500">
              Cerrar Sesión
            </span>
          </div>
          <FiShield className="text-zinc-800" />
        </button>
      </section>
    </div>
  );
}

// Componente para items de ajustes
function SettingsItem({ icon, label, desc, action }: any) {
  return (
    <div className="flex items-center justify-between p-5 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-colors">
      <div className="flex items-center gap-4">
        <div className="text-zinc-500 text-xl">{icon}</div>
        <div>
          <p className="text-sm font-black italic uppercase text-zinc-200">
            {label}
          </p>
          <p className="text-[10px] text-zinc-600 font-medium">{desc}</p>
        </div>
      </div>
      <div>{action}</div>
    </div>
  );
}
