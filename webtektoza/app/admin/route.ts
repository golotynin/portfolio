// app/admin/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function GET(req: NextRequest) {
  // Редиректим на статический HTML из /public — без layout и гидрации
  const url = new URL("/admin/index.html", req.url);
  return NextResponse.redirect(url);
}
