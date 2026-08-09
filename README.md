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

## Deploy

Dự án là Next.js App Router, deploy thẳng lên Vercel không cần biến môi trường:

```bash
npm run build
```

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
