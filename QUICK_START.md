# 🚀 Quick Start - Hiển Thị Model 3D Di Tích

## ✅ Những gì đã được cài đặt

Tôi đã tạo sẵn các file sau cho bạn:

```
src/
├── MonumentModal.js              # Modal hiển thị thông tin + 3D
├── MonumentModal.css             # Styling cho modal
├── monumentsData.js              # Data di tích (có thể mở rộng)
├── MapboxExample.js              # ✅ ĐÃ CẬP NHẬT - 1 di tích
└── MapboxExample-MultiMonuments.js  # Ví dụ nhiều di tích
```

---

## 🎯 Cách Sử Dụng

### **Option 1: Hiển thị 1 di tích (như hiện tại)**

✅ **Không cần làm gì thêm!** File `MapboxExample.js` đã được cập nhật.

1. Chạy app:
```bash
npm start
```

2. Click vào marker Tháp Rùa trên bản đồ
3. Modal sẽ hiển thị với model 3D House.glb

### **Option 2: Hiển thị nhiều di tích**

1. Mở `src/App.js`
2. Thay đổi import:

```javascript
// Thay đổi từ:
import MapBoxExample from './MapboxExample';

// Thành:
import MapBoxExample from './MapboxExample-MultiMonuments';
```

3. Thêm di tích mới trong `src/monumentsData.js`
4. Chạy `npm start`

---

## 📝 Thêm Di Tích Mới

### **Bước 1:** Chuẩn bị file model 3D (.glb)

Đặt file vào folder `public/` hoặc `public/models/`:
```
public/
├── House.glb           # ✅ Đã có
└── models/
    ├── house.glb       # ✅ Đã có
    ├── fish.glb        # ✅ Đã có
    └── your-model.glb  # ← Thêm file mới vào đây
```

### **Bước 2:** Thêm data vào `monumentsData.js`

```javascript
export const monuments = [
  {
    id: 1,
    name: 'Tháp Rùa',
    description: 'Mô tả...',
    coordinates: '21°01′40″N 105°51′08″E',
    position: [105.85229, 21.02785],
    address: 'Địa chỉ đầy đủ',
    yearBuilt: '1886',
    modelPath: '/House.glb',
    markerColor: '#ff6b6b'
  },
  // Thêm di tích mới:
  {
    id: 2,
    name: 'Di Tích Mới',
    description: 'Mô tả di tích mới...',
    coordinates: 'Tọa độ',
    position: [lng, lat],  // ← Thay bằng tọa độ thực
    address: 'Địa chỉ',
    yearBuilt: 'Năm',
    modelPath: '/models/your-model.glb',  // ← Đường dẫn model
    markerColor: '#4ecdc4'  // ← Màu marker tùy chọn
  }
];
```

### **Bước 3:** Sử dụng version nhiều di tích

Đổi import trong `App.js` như hướng dẫn ở Option 2.

---

## 🎮 Công Nghệ Sử Dụng

| Công nghệ | Mục đích |
|-----------|----------|
| **Three.js** | Render 3D WebGL |
| **@react-three/fiber** | React wrapper cho Three.js |
| **@react-three/drei** | Helpers (OrbitControls, GLTFLoader, Stage) |
| **OrbitControls** | Cho phép xoay/zoom model bằng chuột |
| **useGLTF** | Load file GLB/GLTF |
| **Canvas** | Container 3D |
| **Suspense** | Xử lý loading |

### ✅ **Tất cả đã được cài đặt trong `package.json`**

---

## 🎨 Tùy Chỉnh Nhanh

### 1. Đổi màu marker

```javascript
markerColor: '#ff6b6b'  // Red
markerColor: '#4ecdc4'  // Cyan
markerColor: '#95e1d3'  // Green
```

### 2. Điều chỉnh kích thước model

Trong `MonumentModal.js`:
```javascript
<primitive object={scene} scale={1.5} />  // To hơn
<primitive object={scene} scale={0.5} />  // Nhỏ hơn
```

### 3. Đổi màu modal

Trong `MonumentModal.css`:
```css
.modal-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* Đổi gradient tại đây */
}
```

---

## 🎯 Điều Khiển 3D Viewer

| Thao tác | Chức năng |
|----------|-----------|
| 🖱️ Kéo trái | Xoay model |
| 🔍 Cuộn | Zoom |
| 🖱️ Kéo phải | Di chuyển |

---

## 🐛 Troubleshooting

### ❌ Model không hiển thị
- ✅ Kiểm tra đường dẫn `modelPath` đúng chưa
- ✅ File `.glb` phải trong folder `public/`
- ✅ Mở Console (F12) xem lỗi

### ❌ Modal không mở
- ✅ Kiểm tra đã import `MonumentModal` chưa
- ✅ Xem Console có lỗi gì không

### ❌ Model quá to/nhỏ
- ✅ Điều chỉnh `scale` prop

---

## 📚 Tài Liệu Chi Tiết

Xem file `HUONG_DAN_SU_DUNG_3D.md` để biết thêm chi tiết về:
- Cách hoạt động của từng phần
- Tùy chỉnh lighting, camera
- Tối ưu performance
- API documentation

---

## 🎉 Hoàn Thành!

Bây giờ bạn có thể:
- ✅ Click marker → Xem model 3D
- ✅ Xoay model bằng chuột
- ✅ Xem thông tin di tích
- ✅ Thêm nhiều di tích dễ dàng

**Chúc bạn thành công! 🚀**

