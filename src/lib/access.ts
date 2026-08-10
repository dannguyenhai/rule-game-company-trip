/**
 * Cổng vào Hướng dẫn trước giờ mở.
 *
 * Mật khẩu đặt qua biến môi trường ADMIN_PASSWORD trên Vercel. Nếu chưa đặt,
 * hệ thống dùng mật khẩu dự phòng bên dưới — BTC nên đổi trước sự kiện.
 */

export const ACCESS_COOKIE = "btc-unlock";
export const ACCESS_MAX_AGE = 60 * 60 * 24 * 7; // 7 ngày

const FALLBACK_PASSWORD = "xipat-btc-2026";

export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD?.trim() || FALLBACK_PASSWORD;
}

/**
 * Cookie lưu vân tay của mật khẩu chứ không lưu mật khẩu, nên đọc được cookie
 * cũng không đọc ra mật khẩu.
 */
export async function accessToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(`make-your-move|${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
