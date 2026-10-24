// Base URL của API Backend.
// Mặc định lấy từ biến môi trường VITE_API_URL khi deploy lên Render/Vercel/Production.
// Khi chạy ở local, tự động fallback về http://localhost:3000.
export const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '')
