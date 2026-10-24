# 🏥 CRE-HINT (Clinical Record Entry & Healthcare Information System)

> **Hệ thống Quản lý Hồ sơ Y tế & Hỗ trợ Lâm sàng Thông minh**
> Kiến trúc Monorepo Fullstack hiện đại gồm Express API (Backend) và React + Vite SPA (Frontend), tối ưu hóa triển khai sẵn sàng trên GitHub và Render.com.

---

## 📑 Mục lục
1. [Giới thiệu tính năng](#-giới-thiệu-tính-năng)
2. [Cấu trúc thư mục (Project Structure)](#-cấu-trúc-thư-mục-project-structure)
3. [Tài khoản Demo & Vai trò](#-tài-khoản-demo--vai-trò)
4. [Hướng dẫn cài đặt & Chạy Local](#-hướng-dẫn-cài-đặt--chạy-local)
5. [Hướng dẫn đẩy lên GitHub](#-hướng-dẫn-đẩy-lên-github)
6. [Hướng dẫn triển khai lên Render (Deploy to Render)](#-hướng-dẫn-triển-khai-lên-render)
   - [Cách 1: Triển khai 1-Click tự động qua Blueprint (Khuyên dùng)](#cách-1-triển-khai-tự-động-qua-render-blueprint-khuyên-dùng)
   - [Cách 2: Triển khai thủ công từng Service](#cách-2-triển-khai-thủ-công-từng-service)
7. [Danh sách API Endpoints](#-danh-sách-api-endpoints)

---

## 🌟 Giới thiệu tính năng

- **Bệnh nhân (Patient)**:
  - Xem chỉ số sinh tồn (Huyết áp, Nhịp tim, SpO2, Cân nặng).
  - Khai báo chỉ số sức khỏe định kỳ & phát hiện cảnh báo bất thường.
  - Đăng ký lịch khám theo chuyên khoa.
  - Theo dõi tiến trình hàng đợi khám bệnh và kết quả khám lâm sàng theo thời gian thực.
  - Nhận thông báo cập nhật kết quả, lịch hẹn tái khám.

- **Bác sĩ (Doctor)**:
  - Dashboard tổng quan danh sách bệnh nhân và các cảnh báo nguy cấp.
  - Quản lý hàng đợi khám bệnh trong ngày (Gọi lượt, Đang khám, Hoàn thành, Vắng mặt).
  - Nhập chẩn đoán lâm sàng, chỉ định xét nghiệm, đơn thuốc và lịch hẹn tái khám.
  - **Mô phỏng hỗ trợ lâm sàng (AI-CDSS Support)**: Tích hợp dữ liệu bệnh viện giả lập (HIS/EMR, LIS, PACS), gợi ý chẩn đoán phân biệt, phác đồ điều trị, cảnh báo an toàn thuốc và lưu lịch sử phiên bản backup kết quả khám.

- **Tiếp đón / Lễ tân (Receptionist)**:
  - Tiếp nhận bệnh nhân tại quầy, xếp số thứ tự và phân bổ vào phòng khám.
  - Đăng ký lượt khám trực tiếp cho bệnh nhân.

---

## 📁 Cấu trúc thư mục (Project Structure)

Dự án được cấu trúc theo mô hình **Monorepo chuẩn**, tách biệt rõ ràng giữa Backend và Frontend, được quản lý tập trung từ thư mục gốc:

```text
CRE-HINT/
├── .env.example              # Mẫu biến môi trường cho toàn dự án
├── .gitignore                # Danh sách file/thư mục bỏ qua khi commit Git
├── package.json              # Monorepo root script điều phối cả Backend & Frontend
├── render.yaml               # Blueprint cấu hình tự động triển khai lên Render.com
├── README.md                 # Tài liệu hướng dẫn dự án chi tiết
│
├── backend/                  # 🌐 BACKEND (Node.js + Express + SQLite)
│   ├── .env.example          # Mẫu biến môi trường cho Backend
│   ├── database.js           # Khởi tạo SQLite schema, migrations & seed data
│   ├── package.json          # Dependencies & npm scripts của backend
│   ├── package-lock.json     # Khóa phiên bản dependency
│   └── server.js             # Express API Server, Middleware JWT & Endpoints
│
└── frontend/                 # 💻 FRONTEND (React 19 + Vite 8)
    ├── .env.example          # Mẫu biến môi trường cho Frontend (VITE_API_URL)
    ├── .gitignore            # Gitignore riêng của frontend
    ├── .oxlintrc.json        # Cấu hình linter Oxlint
    ├── index.html            # File HTML gốc của SPA
    ├── package.json          # Dependencies React, Vite & scripts
    ├── package-lock.json     # Khóa phiên bản dependency
    ├── vite.config.js        # Cấu hình bundler Vite
    ├── public/               # Static assets công khai
    │   ├── favicon.svg       # Favicon ứng dụng
    │   └── icons.svg         # SVG icons bundle
    └── src/
        ├── App.css           # Toàn bộ CSS giao diện & responsive layout
        ├── App.jsx           # Component điều hướng chính & Authentication
        ├── config.js         # Quản lý Base URL API động (Local / Production)
        ├── index.css         # Reset & global typography CSS
        ├── main.jsx          # Entry point React DOM
        ├── assets/           # Hình ảnh & logo đồ họa
        └── pages/            # Các trang chức năng của hệ thống
            ├── AddVitals.jsx           # Khai báo chỉ số sinh tồn
            ├── Alerts.jsx              # Cảnh báo chỉ số nguy hiểm (Doctor)
            ├── Appointments.jsx        # Lịch hẹn bệnh nhân
            ├── ClinicalSupport.jsx     # Hỗ trợ lâm sàng AI & Quản lý phiên bản
            ├── DoctorAppointments.jsx  # Lịch hẹn của bác sĩ
            ├── DoctorDashboard.jsx     # Trang chủ Bác sĩ
            ├── DoctorQueue.jsx         # Quản lý hàng đợi khám bệnh
            ├── HealthHistory.jsx       # Lịch sử chỉ số theo thời gian
            ├── Medication.jsx          # Đơn thuốc và liều dùng
            ├── PatientDashboard.jsx    # Trang chủ Bệnh nhân
            ├── PatientDetail.jsx       # Chi tiết hồ sơ bệnh nhân
            ├── PatientList.jsx         # Danh sách tất cả bệnh nhân
            ├── PatientVisits.jsx       # Tiến trình lượt khám & Thông báo
            ├── Profile.jsx             # Cập nhật hồ sơ bệnh nhân
            ├── ReceptionDashboard.jsx  # Bàn tiếp đón bệnh viện
            ├── Register.jsx            # Đăng ký tài khoản mới
            └── VisitBooking.jsx        # Đăng ký lượt khám mới
```

---

## 👥 Tài khoản Demo & Vai trò

Hệ thống tích hợp sẵn tài khoản khởi tạo tự động khi database khởi chạy lần đầu:

| Vai trò | Email / Mã đăng nhập | Mật khẩu | Quyền hạn |
| :--- | :--- | :--- | :--- |
| **Tiếp đón (Receptionist)** | `reception@demo.vn` | `123456` | Tiếp nhận lượt khám, xếp phòng, tạo khám trực tiếp |
| **Bác sĩ (Doctor)** | Đăng ký trực tiếp tại trang Đăng ký | Tự chọn (≥ 6 ký tự) | Xem danh sách BN, gọi khám, nhập kết quả, AI Support |
| **Bệnh nhân (Patient)** | Mã bệnh nhân (vd: `BN0001`) | Tự chọn (≥ 6 ký tự) | Khai báo chỉ số, đặt khám, xem đơn thuốc, nhận thông báo |

> 💡 **Mẹo đăng ký**: Nhấp vào **"Đăng ký tài khoản mới"** trên giao diện:
> - Chọn vai trò **Bác sĩ**: Nhập Họ tên, Email, Mật khẩu $\rightarrow$ Đăng nhập bằng Email.
> - Chọn vai trò **Bệnh nhân**: Nhập Họ tên, Mật khẩu $\rightarrow$ Hệ thống tự sinh mã (VD: `BN0001`) $\rightarrow$ Dùng mã này để đăng nhập.

---

## 💻 Hướng dẫn cài đặt & Chạy Local

### Yêu cầu tiên quyết
- [Node.js](https://nodejs.org/) phiên bản 18 trở lên (Khuyên dùng v20 LTS hoặc v22).
- Git được cài đặt trên máy.

### Bước 1: Cài đặt Dependencies cho cả 2 dự án
Mở terminal tại thư mục gốc `CRE-HINT`:
```bash
npm run install:all
```
*(Lệnh trên sẽ tự động cài `npm install` cho cả thư mục `backend` và `frontend`)*.

### Bước 2: Chạy Backend Server
Mở một cửa sổ Terminal riêng:
```bash
npm run dev:backend
```
Server backend sẽ chạy tại: `http://localhost:3000` (Database SQLite `cre_hint.db` sẽ tự động khởi tạo).

### Bước 3: Chạy Frontend Application
Mở một cửa sổ Terminal thứ hai:
```bash
npm run dev:frontend
```
Truy cập trình duyệt tại: `http://localhost:5173`.

---

## 🚀 Hướng dẫn đẩy lên GitHub

1. **Khởi tạo kho chứa Git cục bộ (nếu chưa có)**:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit CRE-HINT fullstack codebase ready for render deployment"
   ```

2. **Tạo Repository mới trên GitHub**:
   - Truy cập [GitHub](https://github.com/new).
   - Đặt tên Repository (VD: `CRE-HINT`).
   - Chọn chế độ **Public** hoặc **Private** tùy ý (không cần tích thêm README hay .gitignore vì dự án đã có sẵn).

3. **Liên kết và đẩy mã nguồn lên GitHub**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<tai-khoan-cua-ban>/<ten-repo>.git
   git push -u origin main
   ```

---

## ☁️ Hướng dẫn triển khai lên Render

### Cách 1: Triển khai tự động qua Render Blueprint (Khuyên dùng - Nhanh nhất)

Dự án đã có sẵn file cấu hình [`render.yaml`](./render.yaml). Render sẽ tự động dựng đồng thời cả Backend và Frontend chỉ trong một thao tác:

1. Đăng nhập vào [Render.com](https://dashboard.render.com).
2. Nhấp vào nút **New +** ở góc trên bên phải $\rightarrow$ Chọn **Blueprint**.
3. Kết nối tài khoản GitHub và chọn kho lưu trữ `CRE-HINT` vừa tải lên.
4. Render sẽ tự động đọc `render.yaml` và phát hiện 2 dịch vụ:
   - `cre-hint-backend` (Node Web Service)
   - `cre-hint-frontend` (Static Site - Tự động liên kết `VITE_API_URL` từ backend)
5. Nhấp **Apply** và chờ Render tiến hành build và deploy.
6. Sau khi hoàn tất, Render sẽ cung cấp 2 đường link:
   - Frontend URL: `https://cre-hint-frontend.onrender.com`
   - Backend URL: `https://cre-hint-backend.onrender.com`

---

### Cách 2: Triển khai thủ công từng Service

Nếu bạn muốn cấu hình từng dịch vụ riêng biệt trên giao diện Render Dashboard:

#### A. Triển khai Backend (Web Service)
1. Trên Render Dashboard, chọn **New +** $\rightarrow$ **Web Service**.
2. Chọn repo `CRE-HINT`.
3. Điền các thông số:
   - **Name**: `cre-hint-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan Type**: `Free`
4. Mở phần **Environment Variables**, thêm:
   - `NODE_ENV`: `production`
   - `JWT_SECRET`: `cre-hint-super-secret-key-change-in-prod`
5. Nhấp **Deploy Web Service** và sao chép đường dẫn domain backend (VD: `https://cre-hint-backend.onrender.com`).

#### B. Triển khai Frontend (Static Site)
1. Trên Render Dashboard, chọn **New +** $\rightarrow$ **Static Site**.
2. Chọn repo `CRE-HINT`.
3. Điền các thông số:
   - **Name**: `cre-hint-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Mở phần **Environment Variables**, thêm:
   - `VITE_API_URL`: `https://cre-hint-backend.onrender.com` *(Dán URL backend đã lấy ở bước trên)*
5. Trong mục **Redirects/Rewrites**, thêm quy tắc rewrite cho SPA:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: `Rewrite`
6. Nhấp **Deploy Static Site**.

---

## 📡 Danh sách API Endpoints

| Phương thức | Đường dẫn (Path) | Quyền hạn | Mô tả chức năng |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Public | Kiểm tra trạng thái máy chủ (Health check) |
| `POST` | `/api/register` | Public | Đăng ký tài khoản (Bác sĩ, Bệnh nhân, Lễ tân) |
| `POST` | `/api/login` | Public | Đăng nhập hệ thống & nhận JWT Token |
| `POST` | `/api/vitals` | Bệnh nhân | Gửi chỉ số sinh tồn mới |
| `GET` | `/api/vitals` | Đã xác thực | Lấy lịch sử chỉ số sinh tồn của người dùng |
| `GET` | `/api/patients` | Bác sĩ | Lấy danh sách toàn bộ bệnh nhân & chỉ số mới nhất |
| `PUT` | `/api/patients/:userId/profile` | Bệnh nhân | Cập nhật hồ sơ cá nhân |
| `POST` | `/api/visits` | Bệnh nhân | Đặt lịch khám bệnh |
| `GET` | `/api/visits/mine` | Bệnh nhân | Danh sách lượt khám của bệnh nhân |
| `GET` | `/api/visits/queue` | Bác sĩ / Lễ tân | Lấy danh sách hàng đợi khám theo ngày |
| `POST` | `/api/visits/:id/check-in` | Bác sĩ / Lễ tân | Tiếp nhận bệnh nhân vào phòng khám |
| `POST` | `/api/visits/:id/call` | Bác sĩ | Gọi lượt bệnh nhân |
| `POST` | `/api/visits/:id/start` | Bác sĩ | Bắt đầu ca khám |
| `POST` | `/api/visits/:id/absent` | Bác sĩ | Đánh dấu bệnh nhân vắng mặt |
| `PUT` | `/api/visits/:id/result` | Bác sĩ | Cập nhật kết luận, đơn thuốc, hẹn tái khám |
| `GET` | `/api/visits/:id/clinical-support` | Bác sĩ | Lấy dữ liệu hỗ trợ chuyên môn của lượt khám |
| `POST` | `/api/visits/:id/mock-hospital-data` | Bác sĩ | Giả lập nạp dữ liệu HIS/EMR cho lượt khám |
| `POST` | `/api/visits/:id/ai-support` | Bác sĩ | Kích hoạt AI-CDSS phân tích hỗ trợ chuyên môn |
| `PUT` | `/api/visits/:id/ai-review` | Bác sĩ | Bác sĩ duyệt/điều chỉnh/từ chối gợi ý của AI |
| `PUT` | `/api/visits/:id/draft` | Bác sĩ | Lưu bản nháp kết quả khám |
| `POST` | `/api/visits/:id/publish` | Bác sĩ | Xác nhận và công bố kết quả cho bệnh nhân |
| `POST` | `/api/visits/:id/restore-version` | Bác sĩ | Khôi phục bản ghi kết quả từ phiên bản backup |
| `GET` | `/api/notifications` | Đã xác thực | Lấy danh sách thông báo |
| `POST` | `/api/notifications/:id/read` | Đã xác thực | Đánh dấu thông báo đã đọc |

---

## 📄 Bản quyền & Tác giả
- Phát triển bởi nhóm dự án **CRE-HINT**.
- Giấy phép: ISC.
