# 💻 Code Examples - Ví Dụ Cụ Thể

## 📌 1. Component Chính - MapboxExample.js

### **Code Hoàn Chỉnh:**

```javascript
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MonumentModal from './MonumentModal';

const MapboxExample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMonument, setSelectedMonument] = useState(null);

  const monumentInfo = {
    name: 'Tháp Rùa',
    description: 'Tháp Rùa là một ngôi tháp nhỏ...',
    coordinates: '21°01′40″N 105°51′08″E',
    address: 'Hồ Hoàn Kiếm, Hà Nội',
    yearBuilt: '1886',
    modelPath: '/House.glb'  // ← Model 3D
  };

  useEffect(() => {
    const map = new mapboxgl.Map({...});
    
    map.on('load', () => {
      const markerEl = document.createElement('div');
      markerEl.addEventListener('click', () => {
        setSelectedMonument(monumentInfo);
        setIsModalOpen(true);
      });
      
      new mapboxgl.Marker({ element: markerEl })
        .setLngLat([105.85229, 21.02785])
        .addTo(map);
    });
  }, []);

  return (
    <>
      <div ref={mapContainerRef} />
      {selectedMonument && (
        <MonumentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          monumentData={selectedMonument}
        />
      )}
    </>
  );
};
```

---

## 📌 2. Modal Component - MonumentModal.js

### **Code Hoàn Chỉnh:**

```javascript
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage } from '@react-three/drei';

// Component load model 3D
const Model3D = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={1} />;
};

const MonumentModal = ({ isOpen, onClose, monumentData }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h2>{monumentData.name}</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Thông tin */}
          <div className="monument-info">
            <h3>Thông tin di tích</h3>
            <p><strong>Mô tả:</strong> {monumentData.description}</p>
            <p><strong>Địa chỉ:</strong> {monumentData.address}</p>
          </div>

          {/* 3D Canvas */}
          <div className="model-3d-container">
            <h3>Mô hình 3D</h3>
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} />
              
              <Suspense fallback={null}>
                <Stage environment="city">
                  <Model3D modelPath={monumentData.modelPath} />
                </Stage>
              </Suspense>
              
              {/* Cho phép xoay */}
              <OrbitControls />
            </Canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonumentModal;
```

---

## 📌 3. Data Di Tích - monumentsData.js

### **Ví Dụ Nhiều Di Tích:**

```javascript
export const monuments = [
  {
    id: 1,
    name: 'Tháp Rùa',
    description: 'Tháp Rùa là biểu tượng của Hồ Gươm...',
    coordinates: '21°01′40″N 105°51′08″E',
    position: [105.85229, 21.02785],  // [lng, lat]
    address: 'Hồ Hoàn Kiếm, quận Hoàn Kiếm, Hà Nội',
    yearBuilt: '1886',
    modelPath: '/House.glb',
    markerColor: '#ff6b6b'
  },
  {
    id: 2,
    name: 'Văn Miếu - Quốc Tử Giám',
    description: 'Trường đại học đầu tiên của Việt Nam...',
    coordinates: '21°01′42″N 105°50′09″E',
    position: [105.83583, 21.02833],
    address: '58 Quốc Tử Giám, Đống Đa, Hà Nội',
    yearBuilt: '1070',
    modelPath: '/models/vanmieu.glb',
    markerColor: '#4ecdc4'
  },
  {
    id: 3,
    name: 'Hoàng Thành Thăng Long',
    description: 'Di sản văn hóa thế giới UNESCO...',
    coordinates: '21°01′50″N 105°50′28″E',
    position: [105.84111, 21.03056],
    address: 'Hoàng Diệu, Ba Đình, Hà Nội',
    yearBuilt: '1010',
    modelPath: '/models/hoangthanhthanglong.glb',
    markerColor: '#95e1d3'
  }
];

// Helper function
export const getMonumentById = (id) => {
  return monuments.find(m => m.id === id);
};
```

---

## 📌 4. Styling - MonumentModal.css

### **CSS Chính:**

```css
/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Modal Content */
.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
}

/* Header với gradient đẹp */
.modal-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 30px;
  border-radius: 12px 12px 0 0;
}

/* Canvas 3D */
.canvas-wrapper {
  width: 100%;
  height: 500px;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
}

/* Responsive */
@media (max-width: 768px) {
  .canvas-wrapper {
    height: 350px;
  }
}
```

---

## 📌 5. Tùy Chỉnh Nâng Cao

### **A. Custom Lighting**

```javascript
<Canvas>
  {/* Ambient light - ánh sáng môi trường */}
  <ambientLight intensity={0.5} />
  
  {/* Directional light - ánh sáng định hướng */}
  <directionalLight position={[10, 10, 5]} intensity={1} />
  
  {/* Point light - đèn điểm */}
  <pointLight position={[-10, 0, -20]} intensity={0.5} />
  
  {/* Spot light - đèn pha */}
  <spotLight
    position={[0, 10, 10]}
    angle={0.3}
    penumbra={1}
    intensity={1}
    castShadow
  />
  
  <Model3D />
</Canvas>
```

### **B. Camera Controls**

```javascript
<OrbitControls
  // Xoay
  enableRotate={true}
  rotateSpeed={1.0}
  
  // Zoom
  enableZoom={true}
  zoomSpeed={1.0}
  minDistance={2}
  maxDistance={20}
  
  // Pan (di chuyển)
  enablePan={true}
  panSpeed={1.0}
  
  // Giới hạn góc xoay
  minPolarAngle={0}              // 0 = nhìn từ trên
  maxPolarAngle={Math.PI / 2}    // π/2 = nhìn ngang
  
  // Giới hạn góc quay ngang
  minAzimuthAngle={-Math.PI / 2}
  maxAzimuthAngle={Math.PI / 2}
/>
```

### **C. Auto Rotate**

```javascript
<OrbitControls
  autoRotate
  autoRotateSpeed={2}  // Tốc độ quay
/>
```

### **D. Multiple Camera Views**

```javascript
import { PerspectiveCamera, OrthographicCamera } from '@react-three/drei';

// Perspective Camera (thường dùng)
<PerspectiveCamera
  makeDefault
  position={[0, 0, 5]}
  fov={50}
/>

// Orthographic Camera (không có perspective)
<OrthographicCamera
  makeDefault
  position={[0, 0, 5]}
  zoom={1}
/>
```

### **E. Environment & Background**

```javascript
import { Environment, Sky, Stars } from '@react-three/drei';

<Canvas>
  {/* Environment preset */}
  <Environment preset="sunset" />
  {/* Hoặc: "city", "forest", "dawn", "night", "warehouse" */}
  
  {/* Sky */}
  <Sky sunPosition={[100, 10, 100]} />
  
  {/* Stars */}
  <Stars radius={100} depth={50} count={5000} />
  
  <Model3D />
</Canvas>
```

### **F. Animations**

```javascript
import { useAnimations } from '@react-three/drei';

const Model3D = ({ modelPath }) => {
  const group = useRef();
  const { scene, animations } = useGLTF(modelPath);
  const { actions, names } = useAnimations(animations, group);
  
  useEffect(() => {
    // Play animation
    if (names.length > 0) {
      actions[names[0]].play();
    }
  }, [actions, names]);
  
  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
};
```

### **G. Loading Progress**

```javascript
import { useProgress, Html } from '@react-three/drei';

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: 'white', fontSize: '20px' }}>
        Loading {progress.toFixed(0)}%
      </div>
    </Html>
  );
};

// Sử dụng
<Suspense fallback={<Loader />}>
  <Model3D />
</Suspense>
```

### **H. Preload Models**

```javascript
import { useGLTF } from '@react-three/drei';

// Preload trước khi render
useGLTF.preload('/House.glb');
useGLTF.preload('/models/vanmieu.glb');

// Trong component
const Model3D = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} />;
};
```

---

## 📌 6. Performance Optimization

### **A. Reduce Render Quality**

```javascript
<Canvas
  dpr={[1, 1]}  // Thay vì [1, 2] - giảm DPR
  gl={{ antialias: false }}  // Tắt antialiasing
  shadows={false}  // Tắt shadows nếu không cần
>
```

### **B. Use LOD (Level of Detail)**

```javascript
import { Detailed } from '@react-three/drei';

<Detailed distances={[0, 10, 20]}>
  <mesh>
    <boxGeometry args={[10, 10, 10]} />  {/* High detail */}
  </mesh>
  <mesh>
    <boxGeometry args={[5, 5, 5]} />    {/* Medium detail */}
  </mesh>
  <mesh>
    <boxGeometry args={[2, 2, 2]} />    {/* Low detail */}
  </mesh>
</Detailed>
```

### **C. Frustum Culling**

```javascript
// Three.js tự động làm, nhưng có thể tối ưu thêm
<primitive object={scene} frustumCulled />
```

---

## 📌 7. Event Handling

### **A. Click on Model**

```javascript
const Model3D = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  
  const handleClick = (event) => {
    event.stopPropagation();
    console.log('Clicked on model!');
  };
  
  return (
    <primitive 
      object={scene} 
      onClick={handleClick}
    />
  );
};
```

### **B. Hover Effect**

```javascript
const [hovered, setHovered] = useState(false);

<primitive 
  object={scene} 
  scale={hovered ? 1.1 : 1}
  onPointerOver={() => setHovered(true)}
  onPointerOut={() => setHovered(false)}
/>
```

---

## 📌 8. Full Example - Nhiều Di Tích

```javascript
import React, { useState } from 'react';
import { monuments } from './monumentsData';
import MonumentModal from './MonumentModal';

const MapWithMonuments = () => {
  const [selectedMonument, setSelectedMonument] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMarkerClick = (monument) => {
    setSelectedMonument(monument);
    setIsModalOpen(true);
  };

  return (
    <div>
      {/* Map Container */}
      <div ref={mapRef} style={{ height: '100vh' }} />
      
      {/* Sidebar danh sách */}
      <div className="sidebar">
        {monuments.map(monument => (
          <div 
            key={monument.id}
            onClick={() => handleMarkerClick(monument)}
          >
            {monument.name}
          </div>
        ))}
      </div>
      
      {/* Modal */}
      {selectedMonument && (
        <MonumentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          monumentData={selectedMonument}
        />
      )}
    </div>
  );
};
```

---

## 🎯 Kết Luận

Với các ví dụ trên, bạn có thể:
- ✅ Customize mọi thứ theo ý muốn
- ✅ Thêm animations
- ✅ Tối ưu performance
- ✅ Thêm interactions
- ✅ Mở rộng features

**Happy Coding! 🚀**

