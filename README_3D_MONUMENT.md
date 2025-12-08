# 🏛️ Hệ Thống Hiển Thị Di Tích 3D Trên Bản Đồ

## 📌 Giới Thiệu

Đây là giải pháp hoàn chỉnh cho bài toán:
> **"Hiển thị di tích trên bản đồ → Click → Mở modal → Xem thông tin + Mô hình 3D"**

### ✨ Tính Năng
- ✅ Hiển thị marker di tích trên bản đồ Mapbox
- ✅ Click marker mở modal đẹp mắt
- ✅ Hiển thị thông tin chi tiết di tích
- ✅ Xem mô hình 3D (GLB/GLTF)
- ✅ Xoay, zoom, di chuyển model bằng chuột
- ✅ Responsive (Desktop + Mobile)
- ✅ Dễ mở rộng thêm nhiều di tích

---

## 🛠️ Công Nghệ Sử Dụng

| Công Nghệ | Version | Mục Đích |
|-----------|---------|----------|
| **Three.js** | ^0.177.0 | Engine render 3D WebGL |
| **@react-three/fiber** | ^9.1.2 | React wrapper cho Three.js |
| **@react-three/drei** | ^10.3.0 | Helpers (OrbitControls, useGLTF, Stage) |
| **Mapbox GL JS** | ^3.13.0 | Bản đồ tương tác |
| **React** | ^19.1.0 | Framework UI |

### ✅ **Tất cả đã có sẵn trong `package.json` - Không cần cài thêm!**

---

## 🚀 Quick Start

### **Bước 1: Chạy Ứng Dụng**

```bash
npm start
```

### **Bước 2: Sử Dụng**

1. Mở browser tại `http://localhost:3000`
2. Click vào marker 📍 Tháp Rùa trên bản đồ
3. Modal sẽ hiển thị với:
   - Thông tin di tích
   - Model 3D House.glb có thể xoay

### **Bước 3: Điều Khiển 3D**

| Thao Tác | Chức Năng |
|----------|-----------|
| 🖱️ Kéo chuột trái | Xoay model |
| 🔍 Cuộn chuột | Zoom in/out |
| 🖱️ Kéo chuột phải | Di chuyển model |

---

## 📁 Cấu Trúc File Mới

```
src/
├── MapboxExample.js              ✅ ĐÃ CẬP NHẬT - Component chính
├── MonumentModal.js              ✅ MỚI - Modal hiển thị 3D
├── MonumentModal.css             ✅ MỚI - Styling modal
├── MapboxMarker.css              ✅ MỚI - Styling marker
├── monumentsData.js              ✅ MỚI - Data di tích
└── MapboxExample-MultiMonuments.js  ✅ MỚI - Ví dụ nhiều di tích

Tài liệu:
├── QUICK_START.md                📖 Hướng dẫn nhanh
├── HUONG_DAN_SU_DUNG_3D.md      📖 Hướng dẫn chi tiết
└── SUMMARY.md                    📖 Tóm tắt kỹ thuật
```

---

## 🎯 Cách Hoạt Động

### **1. Hiển Thị Marker**

```javascript
// MapboxExample.js
const markerEl = document.createElement('div');
markerEl.addEventListener('click', () => {
  setSelectedMonument(monumentInfo);
  setIsModalOpen(true);
});
```

### **2. Load Model 3D**

```javascript
// MonumentModal.js
const Model3D = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);  // Auto load GLB
  return <primitive object={scene} />;
};
```

### **3. Xoay Model**

```javascript
<Canvas>
  <Model3D modelPath="/House.glb" />
  <OrbitControls />  {/* Cho phép xoay */}
</Canvas>
```

---

## 🎨 Tùy Chỉnh

### **1. Thêm Di Tích Mới**

**Cách 1: Đơn giản (1 di tích)**

Trong `MapboxExample.js`:

```javascript
const monumentInfo = {
  name: 'Tên Di Tích',
  description: 'Mô tả...',
  coordinates: '21°01′40″N 105°51′08″E',
  address: 'Địa chỉ đầy đủ',
  yearBuilt: '2024',
  modelPath: '/your-model.glb'  // ← Đổi model
};
```

**Cách 2: Nâng cao (Nhiều di tích)**

Trong `monumentsData.js`:

```javascript
export const monuments = [
  { id: 1, name: 'Di Tích 1', modelPath: '/model1.glb', ... },
  { id: 2, name: 'Di Tích 2', modelPath: '/model2.glb', ... },
  // Thêm tùy ý...
];
```

Sau đó dùng file `MapboxExample-MultiMonuments.js`

### **2. Đổi Model 3D**

1. Đặt file `.glb` vào folder `public/`
2. Cập nhật `modelPath` trong data

```javascript
modelPath: '/ten-file-moi.glb'
```

### **3. Tùy Chỉnh Giao Diện Modal**

Trong `MonumentModal.css`:

```css
/* Đổi màu header */
.modal-header {
  background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%);
}

/* Đổi kích thước canvas 3D */
.canvas-wrapper {
  height: 600px;  /* Cao hơn */
}
```

### **4. Điều Chỉnh Camera 3D**

Trong `MonumentModal.js`:

```javascript
<Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
  {/* position: [x, y, z] - vị trí camera */}
  {/* fov: field of view - góc nhìn */}
</Canvas>
```

### **5. Điều Chỉnh Kích Thước Model**

```javascript
<primitive object={scene} scale={2} />    // To gấp đôi
<primitive object={scene} scale={0.5} />  // Nhỏ lại một nửa
```

---

## 📱 Responsive

### **Desktop**
- Canvas 3D: 500px height
- Modal: 90% width, max 900px

### **Mobile (< 768px)**
- Canvas 3D: 350px height
- Modal: 95% width
- Font size tự động điều chỉnh

---

## 🔧 Troubleshooting

### ❌ **Model không hiển thị**

**Nguyên nhân:**
- Đường dẫn file sai
- File không có trong `public/`
- Format file không đúng

**Giải pháp:**
```javascript
// Kiểm tra đường dẫn
modelPath: '/House.glb'  // ✅ Đúng (file trong public/)
modelPath: 'House.glb'   // ❌ Sai (thiếu /)

// Kiểm tra file tồn tại
public/
└── House.glb  ✅
```

### ❌ **Modal không mở**

**Giải pháp:**
1. Kiểm tra Console (F12) xem có lỗi gì
2. Đảm bảo đã import `MonumentModal`:
```javascript
import MonumentModal from './MonumentModal';
```

### ❌ **Model quá to/nhỏ**

**Giải pháp:**
```javascript
// Điều chỉnh scale
<primitive object={scene} scale={1.5} />
```

### ❌ **Xoay không mượt**

**Giải pháp:**
```javascript
// Giảm quality xuống
<Canvas dpr={[1, 1]}>  // Thay vì [1, 2]
```

---

## 📚 Tài Liệu Chi Tiết

### **Hướng Dẫn Nhanh**
👉 Đọc file `QUICK_START.md`

### **Hướng Dẫn Đầy Đủ**
👉 Đọc file `HUONG_DAN_SU_DUNG_3D.md`

### **Chi Tiết Kỹ Thuật**
👉 Đọc file `SUMMARY.md`

---

## 🎓 Học Thêm

### **Three.js**
- [Official Docs](https://threejs.org/docs/)
- [Examples](https://threejs.org/examples/)

### **React Three Fiber**
- [Documentation](https://docs.pmnd.rs/react-three-fiber/)
- [Examples](https://docs.pmnd.rs/react-three-fiber/getting-started/examples)

### **Drei (Helpers)**
- [GitHub](https://github.com/pmndrs/drei)
- [Storybook](https://drei.pmnd.rs/)

### **GLTF/GLB Format**
- [Khronos GLTF](https://www.khronos.org/gltf/)
- [GLTF Viewer Online](https://gltf-viewer.donmccurdy.com/)

---

## 🔗 Resources Hữu Ích

### **Tool Tạo/Edit Model 3D**
- [Blender](https://www.blender.org/) - Free 3D software
- [SketchUp](https://www.sketchup.com/) - Easy 3D modeling
- [Tinkercad](https://www.tinkercad.com/) - Online 3D design

### **Tool Nén/Tối Ưu GLB**
- [gltf-pipeline](https://github.com/CesiumGS/gltf-pipeline)
- [glTF Transform](https://gltf-transform.donmccurdy.com/)

### **Download Free 3D Models**
- [Sketchfab](https://sketchfab.com/)
- [Free3D](https://free3d.com/)
- [CGTrader](https://www.cgtrader.com/)

---

## 💡 Tips & Best Practices

### **1. Tối Ưu Performance**

```javascript
// Giới hạn DPR (Device Pixel Ratio)
<Canvas dpr={[1, 2]}>  // Max 2x

// Preload models
useGLTF.preload('/House.glb');

// Sử dụng Suspense
<Suspense fallback={<Loader />}>
  <Model3D />
</Suspense>
```

### **2. Kích Thước File Model**

- ✅ Nên < 10MB
- ✅ Dùng GLB (binary) thay vì GLTF (text)
- ✅ Compress textures
- ✅ Giảm polygon count

### **3. Lighting**

```javascript
// Dùng Stage cho auto lighting
<Stage environment="city" intensity={0.6}>
  <Model3D />
</Stage>

// Hoặc custom lighting
<ambientLight intensity={0.5} />
<spotLight position={[10, 10, 10]} />
```

### **4. Camera Settings**

```javascript
<Canvas camera={{
  position: [0, 0, 5],  // Vị trí camera
  fov: 50,              // Field of view
  near: 0.1,            // Near clipping
  far: 1000             // Far clipping
}}>
```

---

## 🌟 Features Nâng Cao (Tùy Chọn)

Bạn có thể mở rộng thêm:

### **1. Auto Rotate**
```javascript
<OrbitControls autoRotate autoRotateSpeed={2} />
```

### **2. Animation**
```javascript
const { scene, animations } = useGLTF(modelPath);
const { actions } = useAnimations(animations, scene);
```

### **3. Screenshot 3D**
```javascript
const screenshot = renderer.domElement.toDataURL();
```

### **4. Multiple Views**
```javascript
<PerspectiveCamera />
<OrthographicCamera />
```

### **5. Environment Map**
```javascript
<Environment preset="sunset" />
```

---

## 📊 So Sánh Giải Pháp

| Giải Pháp | Ưu Điểm | Nhược Điểm |
|-----------|---------|------------|
| **Three.js + R3F** ✅ | Performance cao, flexible, cộng đồng lớn | Learning curve cao hơn |
| Model-viewer | Dễ dùng | Ít tùy biến |
| Babylon.js | Feature-rich | File size lớn |
| A-Frame | VR-ready | Performance thấp hơn |

**→ Chọn Three.js + React Three Fiber là tối ưu nhất!**

---

## 🎯 Roadmap (Future)

- [ ] Thêm AR mode (WebXR)
- [ ] Multiple camera angles
- [ ] Animation timeline
- [ ] Material editor
- [ ] Annotations on model
- [ ] VR mode
- [ ] Social sharing
- [ ] Analytics tracking

---

## 🤝 Support

Nếu gặp vấn đề:
1. Kiểm tra Console (F12)
2. Đọc tài liệu trong folder
3. Xem ví dụ trong `MapboxExample-MultiMonuments.js`

---

## 📝 License

MIT License - Free to use

---

## 👨‍💻 Author

**AI Assistant**  
Created: Dec 8, 2025  
Version: 1.0.0

---

## 🎉 Kết Luận

✅ **Bài toán đã được giải quyết hoàn toàn:**

- Hiển thị di tích trên bản đồ ✓
- Click mở modal ✓
- Xem thông tin ✓
- Xem mô hình 3D ✓
- Xoay được các góc ✓

**→ Sẵn sàng sử dụng ngay!**

**Chúc bạn thành công! 🚀**

