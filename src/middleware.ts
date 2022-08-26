import { NextRequest, NextResponse } from "next/server";

const HELO_API_PATH_LENGTH = "/helo-api/".length;

const getBackendUrl = (request: NextRequest): string =>
  `${process.env.BACKEND_URL}${request.nextUrl.pathname.substring(
    HELO_API_PATH_LENGTH
  )}${request.nextUrl.search}`;

export function middleware(request: NextRequest): NextResponse {
  return NextResponse.rewrite(getBackendUrl(request));
}

export const config = {
  matcher: "/helo-api/:path*",
};
