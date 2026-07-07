export interface LastSet {
  id: string;
  setNumber: number;
  weight: number;
  reps: number;
  isWarmup: boolean;
  exerciseId: string;
  workoutId: string;
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  lastSets?: LastSet[];
}

export interface RoutineExercise {
  order: number;
  exercise: Exercise;
}

export interface Routine {
  id: string;
  name: string;
  exercises: RoutineExercise[];
}

export interface WorkoutComplete {
  id: string;
  routine: Routine;
}