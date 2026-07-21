import WorkoutForm from "@/app/components/WorkoutForm/WorkoutForm";
import { getWorkoutComplete } from "@/app/services/workoutQueries";
import { createClient } from "@/utils/supabase/server";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function WorkoutPage({ params }: Props) {
  const supabase = await createClient();

  const { id } = await params;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>No autorizado</div>;
  }

  const workout = await getWorkoutComplete(id, user.id);

  if (!workout || !workout.routine) {
    return <div>Workout o rutina no encontrada</div>;
  }

  return <WorkoutForm workout={workout as any} userId={user.id} />;
}
