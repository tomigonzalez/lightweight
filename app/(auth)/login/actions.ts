// app/(auth)/login/actions.ts
'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server' // cliente de servidor

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return redirect('/login?error=Todos los campos son obligatorios')
  }

  // verifica las credenciales 
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  // LOGIN FALLO
  if (error) {
    return redirect(`/login?error=${encodeURIComponent('Credenciales incorrectas')}`)
  }

  // LOGIN EXITOSO
  return redirect('/dashboard')
}

export async function signout() {
  const supabase = await createClient()

  // Desloguear
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Error al cerrar sesión:', error.message)
  }

  return redirect('/login')
}