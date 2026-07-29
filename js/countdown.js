/**
 * Hàm tính thời gian đếm ngược đến hết tháng hiện tại
 * Tự động reset và đếm ngược cho tháng tiếp theo khi chuyển tháng
 */
function updateMonthlyCountdown() {
  const now = new Date();
  
  // Lấy thời điểm bắt đầu của tháng tiếp theo (00:00:00 ngày mùng 1 tháng sau)
  // Ví dụ: đang ở tháng 7 (index = 6), now.getMonth() + 1 sẽ là 7 (tháng 8) -> 01/08 lúc 00:00:00
  // JavaScript tự động xử lý khi tháng là 12 (chuyển sang năm mới)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0);
  
  // Khoảng thời gian còn lại (tính bằng milliseconds)
  const diff = endOfMonth - now;
  
  if (diff <= 0) {
    // Khi vừa qua tháng mới, diff = 0, lần gọi tiếp theo sẽ tự động tính cho tháng mới
    return;
  }
  
  // Quy đổi milliseconds sang ngày, giờ, phút, giây
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  // Cập nhật giá trị lên giao diện (dùng padStart(2, '0') để luôn hiển thị 2 chữ số như 05, 09)
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  
  if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
  if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
  if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
  if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
}

// Chạy ngay lần đầu để tránh độ trễ 1 giây khi tải trang
updateMonthlyCountdown();

// Cập nhật liên tục mỗi giây
setInterval(updateMonthlyCountdown, 1000);
