// app/(auth)/register/actions.ts
'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!name || !email || !password) {
    return redirect('/register?error=Todos los campos son obligatorios')
  }

  // PASO A: Le mandamos el nombre a Supabase Auth adentro de los user_metadata (options.data)
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: name, // 👈 Clave para leerlo después en el dashboard
      }
    }
  })

  if (authError || !authData.user) {
    const errorMsg = authError?.message || 'Error en la autenticación'
    return redirect(`/register?error=${encodeURIComponent(errorMsg)}`)
  }

  // PASO B: Insertar a mano el registro en tu tabla pública "User" usando el mismo ID
  const { error: dbError } = await supabase
    .from('User') 
    .insert({
      id: authData.user.id, // Vinculamos el ID para que coincidan
      email: authData.user.email,
      name: name,   
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

  if (dbError) {
    console.error('Error insertando en la tabla User:', dbError)
    return redirect(`/register?error=${encodeURIComponent('Cuenta creada, pero falló la base de datos pública.')}`)
  }

  // ÉXITO
  return redirect('/login?message=¡Registro exitoso! Ya podés iniciar sesión.')
}