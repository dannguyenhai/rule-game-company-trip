import { NextResponse } from "next/server";
import {
  ACCESS_COOKIE,
  ACCESS_MAX_AGE,
  accessToken,
  adminPassword,
} from "@/lib/access";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const password =
    body && typeof body === "object" && "password" in body
      ? String((body as { password: unknown }).password ?? "")
      : "";

  // Làm chậm mỗi lần thử để việc dò mật khẩu không còn khả thi.
  await new Promise((resolve) => setTimeout(resolve, 400));

  if (password !== adminPassword()) {
    return NextResponse.json(
      { ok: false, message: "Mật khẩu không đúng." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ACCESS_COOKIE,
    value: await accessToken(password),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ACCESS_MAX_AGE,
  });
  return response;
}
