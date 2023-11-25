import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";
import type { JwtPayload } from "jsonwebtoken";

type TAccessTokenPayload = {
  id: string;
  name: string;
  roles: Array<string>;
};

const authedRoutes = ["/profile"];
const adminRoutes = ["/admin"];

const middleware = (req: NextRequest) => {
  const accessToken = req.cookies.get("access-token");

  if (accessToken?.value) {
    const decoded = jwt.decode(accessToken.value) as TAccessTokenPayload;
    const isAdmin = decoded.roles.includes("admin");
    const isAuthed = decoded.roles.includes("user");

    if (!isAdmin && req.nextUrl.pathname.startsWith("/admin")) {
      const absoluteURL = new URL("/", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }

    if (!isAuthed && req.nextUrl.pathname.startsWith("/profile")) {
      const absoluteURL = new URL("/", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }
};

export default middleware;

export const config = {
  matcher: ["/profile/:path*", "/admin/:path*"],
};
