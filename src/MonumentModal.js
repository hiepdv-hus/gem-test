import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, PerspectiveCamera } from '@react-three/drei';
import './MonumentModal.css';

// Component hiển thị model 3D GLB
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
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Phần thông tin */}
          <div className="monument-info">
            <h3>Thông tin di tích</h3>
            <p><strong>Mô tả:</strong> {monumentData.description}</p>
            <p><strong>Tọa độ:</strong> {monumentData.coordinates}</p>
            <p><strong>Địa chỉ:</strong> {monumentData.address}</p>
            {monumentData.yearBuilt && (
              <p><strong>Năm xây dựng:</strong> {monumentData.yearBuilt}</p>
            )}
          </div>

          {/* Phần hiển thị mô hình 3D */}
          <div className="model-3d-container">
            <h3>Mô hình 3D</h3>
            <div className="canvas-wrapper">
              <Canvas
                shadows
                dpr={[1, 2]}
                camera={{ position: [0, 0, 5], fov: 50 }}
              >
                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <spotLight
                  position={[10, 10, 10]}
                  angle={0.15}
                  penumbra={1}
                  intensity={1}
                  castShadow
                />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                {/* Model 3D với Suspense để loading */}
                <Suspense fallback={null}>
                  <Stage environment="city" intensity={0.6}>
                    <Model3D modelPath={monumentData.modelPath} />
                  </Stage>
                </Suspense>

                {/* OrbitControls cho phép xoay model bằng chuột */}
                <OrbitControls
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                  minPolarAngle={0}
                  maxPolarAngle={Math.PI / 2}
                />
              </Canvas>
            </div>
            <p className="controls-hint">
              💡 Kéo chuột để xoay • Cuộn để zoom • Chuột phải để di chuyển
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonumentModal;

