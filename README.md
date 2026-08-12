# Make Your Move — The Strategy Game

Website hướng dẫn người chơi cho Gameshow **Make Your Move – The Strategy Game**, Xipat Company Trip 2026.

- `/` — Trang mã QR, dùng để chiếu lên màn hình hoặc in ra tại sự kiện. Mã QR tự trỏ về domain đang phục vụ trang, nên bản local, bản preview và bản production đều quét ra đúng địa chỉ mà không cần cấu hình.
- `/huong-dan` — Toàn bộ luật chơi: 05 Thử thách, cơ chế đầu tư Energy, đấu giá Booster, hệ thống 04 Booster, Thử thách phân định và 07 điều cần nhớ. Tối ưu cho điện thoại vì người chơi đọc ngay sau khi quét mã.

## Chạy local

```bash
npm install
npm run dev
```

Mở http://localhost:3000.

## Sửa nội dung luật chơi

Phần lớn dữ liệu lặp lại (sơ đồ Hải trình, 04 Booster, quy tắc Booster, 07 điều cần nhớ, mục lục) nằm trong một file duy nhất:

```
src/lib/content.ts
```

Nội dung dạng văn bản dài của từng mục nằm trong `src/app/huong-dan/page.tsx`.

## Khoá Hướng dẫn tới giờ mở

Hướng dẫn chỉ mở từ **19:30 ngày 14/08/2026 (giờ Việt Nam)**. Trước thời điểm đó, mọi lượt truy cập `/huong-dan` đều bị [proxy.ts](src/proxy.ts) chuyển về trang chủ — kể cả khi gõ thẳng URL.

Nội dung luật được dựng ở phía máy chủ ([sections/index.tsx](src/components/sections/index.tsx)) nên **không nằm trong gói JavaScript tải về trình duyệt**; trước giờ mở không có cách nào đọc trước qua DevTools.

BTC vào sớm bằng ô mật khẩu ở trang chủ. Đặt mật khẩu trên Vercel:

```
Project → Settings → Environment Variables
ADMIN_PASSWORD = <mật khẩu của BTC>
```

Chạy local:

```bash
ADMIN_PASSWORD=mat-khau npm run dev
```

Nếu chưa đặt biến này, hệ thống dùng mật khẩu dự phòng `xipat-btc-2026` — **nên đổi trước sự kiện**. Mật khẩu đúng sẽ đặt một cookie `HttpOnly` có hiệu lực 7 ngày; cookie chỉ lưu vân tay của mật khẩu, không lưu mật khẩu.

Đổi mốc giờ mở tại [event-time.ts](src/lib/event-time.ts).

## Deploy

Dự án là Next.js App Router, deploy thẳng lên Vercel:

```bash
npm run build
```

Chỉ cần khai báo `ADMIN_PASSWORD`; ngoài ra không cần biến môi trường nào khác.

> **Đừng bỏ cờ `--webpack` trong script `build`.** Turbopack của Next 16.3 dựng
> hỏng CSS của `next/font/google` khi build trên Vercel (`Can't resolve
> '@vercel/turbopack-next/internal/font/google/font'`). Webpack dựng đúng.
> `next dev` vẫn chạy Turbopack bình thường.

## Cấu trúc

```
src/
├─ app/
│  ├─ page.tsx           # Trang mã QR (Key Visual)
│  ├─ huong-dan/page.tsx # Trang luật chơi
│  ├─ globals.css        # Design tokens, easing, hiệu ứng nền
│  └─ icon.svg           # Favicon
├─ components/           # Section, Card, Accordion, JourneyMap, BoosterCard…
└─ lib/content.ts        # Nội dung luật chơi
```
