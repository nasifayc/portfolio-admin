import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const path = request.nextUrl.pathname;
  if (path.startsWith("/admin")) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.log("User not found, redirecting to auth page...");
      return NextResponse.redirect(
        new URL("/auth", process.env.NEXT_PUBLIC_BASE_URL),
      );
    }
    const admin_email = process.env.ADMIN_EMAIL;

    if (user.app_metadata?.provider !== "google" || user.email != admin_email) {
      await supabase.auth.signOut();
      return NextResponse.redirect(
        new URL("/unauthorised", process.env.NEXT_PUBLIC_BASE_URL),
      );
    }
  }

  return supabaseResponse;
}
