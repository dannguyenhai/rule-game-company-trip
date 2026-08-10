import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_COOKIE, accessToken, adminPassword } from "@/lib/access";
import { UNLOCK_AT_MS } from "@/lib/event-time";

/**
 * Chặn Hướng dẫn cho tới giờ mở. Chạy trước khi trang được render, nên trước
 * giờ G không ai lấy được nội dung luật — kể cả khi gọi thẳng URL.
 */
export async function proxy(request: NextRequest) {
  if (Date.now() >= UNLOCK_AT_MS) return NextResponse.next();

  const token = request.cookies.get(ACCESS_COOKIE)?.value;
  if (token && token === (await accessToken(adminPassword()))) {
    return NextResponse.next();
  }

  const url = new URL("/", request.url);
  url.searchParams.set("khoa", "1");
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/huong-dan", "/huong-dan/:path*"],
};
