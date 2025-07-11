# 💬 Pink Heart Chat Overlay cho OBS & TikTok LiveStudio

Một dự án đơn giản giúp hiển thị tin nhắn chat TikTok trên màn hình livestream thông qua OBS hoặc TikTok LiveStudio. Dễ cài đặt, dễ tùy chỉnh, phù hợp cho mọi streamer 💖

---

## 📦 Yêu cầu hệ thống

- [Node.js](https://nodejs.org/) (khuyến nghị v16+)
- [NPM](https://www.npmjs.com/)
- [Cloudflared](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install/) (để public overlay cho OBS)
- Sử dụng qua Tikfinity Event API

---

## 🚀 Cài đặt & Chạy server

### 1. Tải source về

Clone hoặc tải project:

```bash
git clone https://github.com/your-username/pink-heart-co-tls.git
cd pink-heart-co-tls
```

Hoặc đơn giản chỉ cần đặt toàn bộ source vào một thư mục trên máy.

### 2. Cài thư viện cần thiết

Chạy:

```bash
npm install
```

Thao tác này sẽ cài đặt `express` được khai báo trong `package.json`.

### 3. Khởi động server

Chạy:

```bash
npm start
```

Sau đó mở trình duyệt và truy cập:

```
http://localhost:5500
```

Nếu bạn thấy giao diện overlay hiện ra, tức là server đã chạy thành công ✅

---

## 🌐 Public overlay bằng Cloudflared

Để sử dụng overlay trong OBS hoặc TikTok LiveStudio, bạn cần biến localhost thành một đường dẫn public.

### Cài đặt Cloudflared (nếu chưa có)

```bash
npm i -g cloudflared
```

### Tạo tunnel tạm thời:

```bash
cloudflared tunnel --url http://localhost:5500
```

Sau vài giây, bạn sẽ thấy đường link dạng:

```
https://pink-chat-xyz.trycloudflare.com
```

📌 **Sao chép link này để sử dụng trong OBS / TikTok LiveStudio.**

---

## 🎥 Cách thêm vào OBS hoặc TikTok LiveStudio

### OBS Studio

1. Mở OBS.
2. Bấm nút **+** sources > chọn **Browser**.
3. Dán link `https://...trycloudflare.com` vào ô **URL**.
4. Chọn kích thước phù hợp (gợi ý: W800H820 hoặc tuỳ theo layout).
5. Nhấn **OK** và kéo nó vào vị trí bạn muốn.

### TikTok LiveStudio

1. Vào phần Scene đang sử dụng.
2. Thêm **Trình duyệt (Browser)**.
3. Dán link `https://...trycloudflare.com`.
4. Thiết lập chiều rộng / chiều cao.
5. Xác nhận và kéo đến vị trí hiển thị.

---

## 🗂️ Cấu trúc thư mục

```
pink-heart-co-tls/
├── public/
│   └── index.html       # Giao diện overlay
├── server.js            # File Node.js Express server
├── package.json         # Thông tin và script khởi động
└── README.md            # Hướng dẫn sử dụng (file này)
```

---

## 💡 Gợi ý nâng cao

- Kết hợp WebSocket để nhận dữ liệu chat TikTok realtime.
- Tuỳ chỉnh giao diện overlay bằng HTML/CSS trong `public/index.html`.
- Tạo hiệu ứng đẹp hơn bằng cách thêm thư viện như Anime.js, GSAP,...
- Dùng [PM2](https://pm2.keymetrics.io/) để giữ server luôn hoạt động.

---

## 🧁 Giấy phép

Dự án này dùng cho mục đích cá nhân / livestream. Bạn có thể tự do chỉnh sửa và chia sẻ lại nếu muốn 💕

---

## ✨ Người thực hiện

Made with love by Nhat Linh Nguyen 💗
