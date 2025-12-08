# 🏛️ Hướng Dẫn Sử Dụng Tính Năng Hiển Thị Di Tích 3D

## 📋 Tổng Quan

Tính năng này cho phép:
- ✅ Hiển thị các di tích trên bản đồ Mapbox
- ✅ Click vào marker để mở modal
- ✅ Xem thông tin chi tiết di tích
- ✅ Xem và xoay mô hình 3D (file .glb/.gltf)

---

## 🛠️ Công Nghệ Sử Dụng

### 1. **Three.js** (`three`)
- Engine render đồ họa 3D trong trình duyệt
- Hỗ trợ WebGL để render hiệu năng cao

### 2. **@react-three/fiber**
- React wrapper cho Three.js
- Cho phép viết Three.js code theo kiểu React component

### 3. **@react-three/drei**
- Tập hợp các helpers và components hữu ích:
  - `OrbitControls`: Điều khiển xoay, zoom, pan model
  - `useGLTF`: Hook để load file GLB/GLTF
  - `Stage`: Setup lighting và environment tự động
  - `PerspectiveCamera`: Camera 3D

### 4. **GLB/GLTF Format**
- Format file 3D chuẩn cho web
- GLB = binary version của GLTF (nhẹ hơn, load nhanh hơn)

---

## 📁 Cấu Trúc File

```
src/
├── MapboxExample.js          # Component chính với bản đồ
├── MonumentModal.js          # Modal hiển thị thông tin + 3D
├── MonumentModal.css         # Styling cho modal
public/
└── House.glb                 # File mô hình 3D (có thể thay đổi)
```

---

## 🎯 Cách Hoạt Động

### 1. **Hiển thị Marker trên Bản Đồ**

```javascript
const markerEl = document.createElement('div');
markerEl.addEventListener('click', () => {
  setSelectedMonument(monumentInfo);
  setIsModalOpen(true);
});
```

- Tạo marker tại vị trí di tích
- Khi click → set state để mở modal

### 2. **Hiển thị Modal với Thông Tin**

```javascript
<MonumentModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  monumentData={selectedMonument}
/>
```

### 3. **Render Mô Hình 3D**

```javascript
<Canvas>
  <Suspense fallback={null}>
    <Stage environment="city">
      <Model3D modelPath={monumentData.modelPath} />
    </Stage>
  </Suspense>
  <OrbitControls />
</Canvas>
```

**Giải thích:**
- `Canvas`: Container của Three.js trong React
- `Suspense`: Xử lý loading khi model chưa tải xong
- `Stage`: Setup lighting và environment tự động
- `OrbitControls`: Cho phép xoay model bằng chuột

---

## 🎮 Điều Khiển Model 3D

| Thao Tác | Chức Năng |
|----------|-----------|
| 🖱️ **Kéo chuột trái** | Xoay model |
| 🔍 **Cuộn chuột** | Zoom in/out |
| 🖱️ **Kéo chuột phải** | Di chuyển model (pan) |

---

## 🔧 Tùy Chỉnh

### 1. **Thêm Di Tích Mới**

Trong `MapboxExample.js`, tạo object mới:

```javascript
const monumentInfo = {
  name: 'Tên Di Tích',
  description: 'Mô tả chi tiết...',
  coordinates: '21°01′40″N 105°51′08″E',
  address: 'Địa chỉ đầy đủ',
  yearBuilt: '1886',
  modelPath: '/ten-file-model.glb'  // ← Đổi tên file model
};
```

### 2. **Thay Đổi Model 3D**

**Cách 1:** Đổi file trong folder `public/`:
- Đặt file `.glb` hoặc `.gltf` vào `public/`
- Cập nhật `modelPath` trong `monumentInfo`

**Cách 2:** Sử dụng URL từ internet:
```javascript
modelPath: 'https://example.com/model.glb'
```

### 3. **Tùy Chỉnh Kích Thước Model**

Trong `MonumentModal.js`, sửa thuộc tính `scale`:

```javascript
<primitive object={scene} scale={2} />  // Scale = 2 → to gấp đôi
<primitive object={scene} scale={0.5} /> // Scale = 0.5 → nhỏ lại một nửa
```

### 4. **Tùy Chỉnh Camera**

```javascript
<Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
```

- `position`: Vị trí camera [x, y, z]
- `fov`: Field of view (góc nhìn)

### 5. **Tùy Chỉnh Lighting**

```javascript
<ambientLight intensity={0.5} />  // Ánh sáng môi trường
<spotLight position={[10, 10, 10]} intensity={1} />  // Đèn pha
<pointLight position={[-10, -10, -10]} intensity={0.5} />  // Đèn điểm
```

### 6. **Giới Hạn Xoay Model**

```javascript
<OrbitControls
  minPolarAngle={0}              // Góc tối thiểu (0 = nhìn từ trên)
  maxPolarAngle={Math.PI / 2}    // Góc tối đa (π/2 = nhìn ngang)
  minDistance={2}                 // Zoom in tối đa
  maxDistance={20}                // Zoom out tối đa
/>
```

---

## 🎨 Tùy Chỉnh Giao Diện Modal

### Thay Đổi Màu Sắc

Trong `MonumentModal.css`:

```css
.modal-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* Đổi màu gradient theo ý thích */
}

.monument-info {
  border-left: 4px solid #667eea;  /* Đổi màu border */
}
```

### Thay Đổi Kích Thước Canvas 3D

```css
.canvas-wrapper {
  height: 500px;  /* Đổi chiều cao */
}
```

---

## 📱 Responsive

Modal đã được tối ưu cho mobile:
- Tự động thu nhỏ trên màn hình < 768px
- Canvas 3D giảm chiều cao xuống 350px trên mobile
- Font size và padding điều chỉnh phù hợp

---

## ⚠️ Lưu Ý Quan Trọng

### 1. **Định Dạng File Model**
- ✅ Nên dùng `.glb` (nhẹ hơn, load nhanh hơn)
- ✅ Có thể dùng `.gltf` (text format)
- ❌ Không hỗ trợ `.obj`, `.fbx`, `.stl` (cần convert)

### 2. **Kích Thước File**
- Model nên < 10MB để load nhanh
- Dùng tool như [gltf-pipeline](https://github.com/CesiumGS/gltf-pipeline) để nén

### 3. **Tối Ưu Performance**
```javascript
<Canvas dpr={[1, 2]}>  // Device pixel ratio: tối đa 2x
```

### 4. **Xử Lý Lỗi Load Model**

Nếu model không hiển thị:
1. Kiểm tra đường dẫn file
2. Mở Console (F12) xem lỗi
3. Kiểm tra format file có đúng GLB/GLTF không

---

## 🔗 Tài Liệu Tham Khảo

- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [Drei Helpers](https://github.com/pmndrs/drei)
- [GLTF/GLB Format](https://www.khronos.org/gltf/)

---

## 🚀 Chạy Ứng Dụng

```bash
npm start
```

Sau đó:
1. Mở trình duyệt tại `http://localhost:3000`
2. Click vào marker di tích trên bản đồ
3. Modal sẽ hiển thị với thông tin + model 3D
4. Kéo chuột để xoay model 3D

---

## 🐛 Troubleshooting

### Model không hiển thị
- Kiểm tra đường dẫn file trong `modelPath`
- Đảm bảo file `.glb` có trong folder `public/`

### Modal không mở
- Kiểm tra Console (F12) có lỗi không
- Đảm bảo đã import `MonumentModal` đúng

### Model quá to/nhỏ
- Điều chỉnh thuộc tính `scale` trong `Model3D`

### Xoay không mượt
- Kiểm tra GPU của máy
- Giảm `dpr` xuống `[1, 1]` trong Canvas

---

## 📧 Hỗ Trợ

Nếu cần thêm hỗ trợ, hãy mở issue trên GitHub hoặc liên hệ team phát triển.

**Chúc bạn thành công! 🎉**

