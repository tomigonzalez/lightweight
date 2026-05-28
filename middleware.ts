// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // 1. Inicializamos el cliente de Supabase optimizado para Middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 2. Le preguntamos a Supabase Auth si el usuario tiene una sesión activa
  const { data: { user } } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // 3. REBOTE INTRUSOS: Si no está logueado e intenta entrar a las pantallas del gimnasio
  const rutasProtegidas = ['/dashboard', '/rutinas', '/progreso', '/ajustes','/rutinas/nueva']
  const intentaEntrarAProtegida = rutasProtegidas.some(ruta => pathname.startsWith(ruta))

  if (!user && intentaEntrarAProtegida) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // 4. REBOTE LOGUEADOS: Si ya inició sesión e intenta volver al Login o Registro
  const rutasAuth = ['/login', '/register']
  const intentaEntrarAAuth = rutasAuth.some(ruta => pathname.startsWith(ruta))

  if (user && intentaEntrarAAuth) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

// 5. FILTRO DE PETICIONES: Evita que el middleware corra al cargar fotos, estilos o iconos
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}