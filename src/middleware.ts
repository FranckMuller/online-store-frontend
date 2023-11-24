import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/profile"];

const middleware = (req: NextRequest) => {
  // console.log(req.nextUrl.pathname);
  if (req.nextUrl.pathname) {
    const accessToken = req.cookies.get("jwt");
    // console.log(accessToken);
  }
};

export default middleware;

export const config = {
  matcher: ["/profile", "/admin"],
};
