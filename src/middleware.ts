import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRoutes = ["/auth/sign-in", "/auth/sign-up"];
const privateRoutes = ["/profile"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const incomingRoute = request.nextUrl.pathname;

  // Check auth routes
  if (authRoutes.some((route) => incomingRoute.startsWith(route)) && token) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // Check private routes
  if (
    privateRoutes.some((route) => incomingRoute.startsWith(route)) &&
    !token
  ) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  // Next
  return NextResponse.next();
}

export const config = {
  matcher: [...authRoutes, ...privateRoutes],
};
