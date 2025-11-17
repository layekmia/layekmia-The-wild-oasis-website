import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const privateRoutes = ["/account"];
const authPages = ["/auth/signin"]; // your custom login page

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Get token if logged in
  const token = await getToken({ req, secret });

  // Redirect logged-in users away from login page
  if (authPages.some((path) => pathname.startsWith(path)) && token) {
    return NextResponse.redirect(new URL("/account", req.url));
  }

  if (privateRoutes.some((path) => pathname.startsWith(path)) && !token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // Allow request
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
