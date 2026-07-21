// app/services/userQueries.ts
import { createClient } from "@/utils/supabase/server";

export async function getCurrentUserProfile() {
  try {
    const supabase = await createClient();
    
    //sesión en las cookies
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) return null;

    //Trae el registro usando el cliente nativo de Supabas
    const { data: dbUser, error: dbError } = await supabase
      .from('User')
      .select('id, email, name')
      .eq('id', user.id)
      .single(); // Trae un solo objeto en vez de un array

    if (dbError) {
      console.error("Error en Supabase DB:", dbError.message);
      return null;
    }

    return dbUser;
  } catch (error) {
    console.error("Error general:", error);
    return null;
  }
}