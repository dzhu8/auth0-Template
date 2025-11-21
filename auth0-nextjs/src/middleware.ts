// The middleware does most of the heavy lifting for auth0. It mounts all of the following authentication routes:
//  - /auth/login
//  - /auth/logout
//  - /auth/callback
//  - /auth/profile
//  - /auth/access-token
//  - /auth/backchannel-logout
//  - /auth/me

import type { NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";

export async function middleware(request: NextRequest) {
     return await auth0.middleware(request);
}

export const config = {
     matcher: [
          /*
           * Match all request paths except for the ones starting with:
           * - _next/static (static files)
           * - _next/image (image optimization files)
           * - favicon.ico, sitemap.xml, robots.txt (metadata files)
           */
          "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
     ],
};
