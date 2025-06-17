import React, { useState, useEffect } from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet'; // Import thư viện Leaflet
import { Android } from "iconsax-react"; // Import biểu tượng Android từ iconsax-react

// Đảm bảo bạn có style cho bản đồ
import 'leaflet/dist/leaflet.css';

const center = [21.0285, 105.8542]; // Vị trí trung tâm Hồ Gươm
const startPosition = [21.0334, 105.7988]; // Vị trí Cầu Giấy

// Tạo một icon người bằng cách sử dụng React component và chuyển nó thành HTML element
const personIcon = new L.DivIcon({
  className: 'custom-icon',
  html: `<div style="font-size: 30px; color: green;">${<Android />}</div>`, // Thêm biểu tượng vào trong div
  iconSize: [32, 32], // Kích thước icon
  iconAnchor: [16, 32], // Điểm neo icondsgds
  popupAnchor: [0, -32], // Đảm bảo popup hiển thị đúng
});

const App = () => {
  const [markerPosition, setMarkerPosition] = useState(startPosition);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarkerPosition(prevPosition => {
        // Tính toán dần dần di chuyển từ Cầu Giấy đến Hồ Gươm
        const latDiff = center[0] - prevPosition[0];
        const lngDiff = center[1] - prevPosition[1];

        // Nếu đã di chuyển đến Hồ Gươm, quay lại Cầu Giấy
        if (Math.abs(latDiff) < 0.0001 && Math.abs(lngDiff) < 0.0001) {
          // Reset lại vị trí nếu đã đến Hồ Gươm
          setMarkerPosition(startPosition);
          return startPosition;
        }

        // Di chuyển từ Cầu Giấy đến Hồ Gươm
        return [
          prevPosition[0] + latDiff * 0.05, // Di chuyển dần dần theo vĩ độ
          prevPosition[1] + lngDiff * 0.05, // Di chuyển dần dần theo kinh độ
        ];
      });
    }, 100); // Mỗi 100ms thay đổi vị trí

    return () => clearInterval(interval); // Dọn dẹp khi component unmount
  }, []);

  const route = [startPosition, center]; // Đường đi từ Cầu Giấy đến Hồ Gươm

  return (
    <div className="App">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Đoạn đường màu đỏ */}
        <Polyline positions={route} color="red" />
        
        {/* Marker với icon người */}
        <Marker position={markerPosition} icon={personIcon}>
          <Popup>
            Trung tâm Hồ Gươm.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default App;
