import { jwtVerify } from "jose";
import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_NAME } from "@/lib/constants";

async function getAdminFromCookie(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const secret = process.env.JWT_SECRET;
  if (!token || !secret) return null;

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return {
      id: String(payload.sub ?? ""),
      email: String(payload.email ?? ""),
    };
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAdminPath = path.startsWith("/admin");
  const isLoginPath = path === "/admin/login";

  if (!isAdminPath) {
    return NextResponse.next();
  }

  const user = await getAdminFromCookie(request);

  if (!isLoginPath && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", path);
    return NextResponse.redirect(url);
  }

  if (isLoginPath && user) {
    const next = request.nextUrl.searchParams.get("next");
    const url = request.nextUrl.clone();
    url.pathname =
      next?.startsWith("/admin") && next !== "/admin/login"
        ? next
        : "/admin/projects";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$).*)",
  ],
};
