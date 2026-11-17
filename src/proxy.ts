import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE } from "@/constants/storage-keys";

export function proxy(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const isLoginPage = request.nextUrl.pathname === "/login";

  // A home é a landing page pública: fica acessível mesmo com sessão ativa.
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Rotas que precisam passar pelo "pedágio" acima
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
