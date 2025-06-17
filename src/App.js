import React, { useState, useEffect } from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Import thư viện Leaflet
import IcLocation from "./location.svg"

// Đảm bảo bạn có style cho bản đồ
import 'leaflet/dist/leaflet.css';

const center = [21.0285, 105.8542]; // Vị trí trung tâm Hồ Gươm

// Tạo một icon người bằng cách sử dụng React component và chuyển nó thành HTML element
const personIcon = new L.DivIcon({
  className: 'custom-icon',
  html: `<img src=${IcLocation}/>`, // Thêm biểu tượng vào trong div
  iconSize: [32, 32], // Kích thước icon
  iconAnchor: [16, 32], // Điểm neo icon
  popupAnchor: [0, -32], // Đảm bảo popup hiển thị đúng
});

const App = () => {
  const [currentPosition, setCurrentPosition] = useState(null); // Lưu trữ vị trí hiện tại

  // Lấy vị trí người dùng khi ứng dụng được render
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition([latitude, longitude]); // Cập nhật vị trí hiện tại
        },
        (error) => {
          console.log("Error getting location: ", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

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
        
        {/* Hiển thị Marker chỉ khi vị trí người dùng có sẵn */}
        {currentPosition && (
          <Marker position={currentPosition} icon={personIcon}>
            <Popup>
              Vị trí hiện tại của bạn.
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default App;
