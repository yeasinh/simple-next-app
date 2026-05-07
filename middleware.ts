import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("x-request-path", request.nextUrl.pathname);

  if (request.nextUrl.pathname.startsWith("/tasks/new")) {
    const canWrite = request.cookies.get("can_write_tasks")?.value === "true";
    if (!canWrite) {
      const deniedUrl = new URL("/access-denied", request.url);
      return NextResponse.redirect(deniedUrl);
    }
  }

  if (request.nextUrl.pathname === "/legacy-dashboard") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/tasks/new", "/legacy-dashboard"],
};
