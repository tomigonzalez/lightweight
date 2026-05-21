// app/(auth)/login/actions.ts
'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server' // Nuestro cliente de servidor

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return redirect('/login?error=Todos los campos son obligatorios')
  }

  // Le pedimos a Supabase Auth que verifique las credenciales e inicie sesión
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  // Si le erró a la contraseña o el mail no existe
  if (error) {
    return redirect(`/login?error=${encodeURIComponent('Credenciales incorrectas')}`)
  }

  // ¡LOGIN EXITOSO! Lo mandamos directo al Dashboard (el Rack de entrenamiento)
  return redirect('/dashboard')
}