// app/(dashboard)/dashboard/page.tsx

import { getCurrentUserProfile } from "@/app/services/userQueries";
import { redirect } from "next/navigation";
import { FiActivity, FiAward } from "react-icons/fi";
export const dynamic = "force-dynamic";
import { getDashboardData } from "@/app/services/dashboardQueries";
import { ReactNode } from "react";

import { DashboardHeader } from "./components/DashboardHeader/DashboardHeader";
import { TodayWorkoutBanner } from "./components/TodayWorkoutBanner/TodayWorkoutBanner";
import { PinnedPRCard } from "./components/PinnedPRCard/PinnedPRCard";
import { WeeklyPlanSection } from "./components/WeeklyPlanSection/WeeklyPlanSection";

export default async function DashboardPage() {
  // Llamamos al helper
  const profile = await getCurrentUserProfile();

  // Si no hay perfil (no está logueado), rebote automático
  if (!profile) {
    redirect("/login");
  }

  const infoDashboard = await getDashboardData(profile.id);

  // Usamos el nombre real de la BD con un fallback
  const nombreUsuario =
    profile.name?.toUpperCase() || profile.email.split("@")[0].toUpperCase();

  const DAYS = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  const hoy = DAYS[new Date().getDay()];
  const cantidadEjercicios = infoDashboard.todayRoutine?.exercises?.length ?? 0;

  const nombreRutina = infoDashboard.todayRoutine?.name ?? "Descanso";

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <DashboardHeader nombreUsuario={nombreUsuario} hoy={hoy} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
        <div className="lg:col-span-2 space-y-8">
          <TodayWorkoutBanner
            hoy={hoy}
            nombreRutina={nombreRutina}
            cantidadEjercicios={cantidadEjercicios}
            todayRoutineId={infoDashboard.todayRoutine?.id}
          />
          <div className="hidden lg:block">
            <WeeklyPlanSection
              weeklyRoutines={infoDashboard.weeklyRoutines}
              days={DAYS}
            />
          </div>
        </div>

        <aside className="space-y-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">
            Resumen de Fuerza
          </h3>

          <div className="grid grid-cols-1 gap-4">
            <PinnedPRCard pinnedPR={infoDashboard.pinnedPR} />

            <div className="grid grid-cols-2 gap-4">
              <StatCard
                icon={<FiActivity />}
                label="Racha Actual"
                value={`${infoDashboard.streak} DÍAS`}
              />
              <StatCard
                icon={<FiAward />}
                label="Entrenamientos Mes"
                value={`${infoDashboard.workoutsThisMonth}`}
              />
            </div>

            {/* Último entrenamiento */}
            {infoDashboard.lastWorkout && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">
                  Último entrenamiento (
                  <span className="capitalize">
                    {
                      DAYS[
                        new Date(
                          infoDashboard.lastWorkout.date.includes("T")
                            ? infoDashboard.lastWorkout.date
                            : `${infoDashboard.lastWorkout.date}T00:00:00`,
                        ).getDay()
                      ]
                    }
                  </span>
                  )
                </p>
                <p className="text-xl font-black italic uppercase mt-2">
                  {infoDashboard.lastWorkout.routine?.name ?? "Rutina"}
                </p>

                <p className="text-zinc-400 text-sm mt-2 font-medium">
                  Volumen total:{" "}
                  <span className="text-white font-bold">
                    {Math.round(infoDashboard.lastWorkoutVolume)} kg
                  </span>
                </p>
              </div>
            )}
          </div>
        </aside>
        <div className="lg:hidden block">
          <WeeklyPlanSection
            weeklyRoutines={infoDashboard.weeklyRoutines}
            days={DAYS}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-zinc-900/30 border border-zinc-800 p-5 rounded-3xl flex flex-col gap-2 hover:border-zinc-700 transition-colors">
      <div className="text-yellow-400 text-xl">{icon}</div>
      <div>
        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500">
          {label}
        </p>
        <p className="text-xl font-black italic uppercase leading-tight">
          {value}
        </p>
      </div>
    </div>
  );
}
