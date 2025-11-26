import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix icon issue với Leaflet trong React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapboxExample = () => {
  // Tọa độ chính xác của Tháp Rùa: 21°01′40″N 105°51′08″E
  // Chuyển đổi: 21°01′40″ = 21.0278°, 105°51′08″ = 105.8522°
  const thapRuaPosition = [21.02785, 105.85229];

  // Ranh giới hành chính - hình tròn bao quanh Tháp Rùa
  // Bán kính tính bằng mét, dễ điều chỉnh
  const administrativeRadius = 15; // 30 mét - có thể thay đổi dễ dàng

  return (
    <MapContainer
      center={thapRuaPosition}
      zoom={17}
      style={{ height: '100vh', width: '100%' }}
      scrollWheelZoom={true}
      doubleClickZoom={true}
      zoomControl={true}
      attributionControl={true}
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={19}
        minZoom={0}
      />

      {/* Ranh giới hành chính - Circle */}
      <Circle
        center={thapRuaPosition}
        radius={administrativeRadius}
        pathOptions={{
          color: '#3388ff', // Màu viền xanh dương
          fillColor: '#3388ff', // Màu nền xanh dương
          fillOpacity: 0.2,
          weight: 2
        }}
      />

      {/* Marker cho Tháp Rùa */}
      <Marker position={thapRuaPosition}>
        <Popup>
          <div>
            <h3>Tháp Rùa</h3>
            <p>Tháp Rùa là một ngôi tháp nhỏ nằm ở trung tâm Hồ Gươm, quận Hoàn Kiếm, thành phố Hà Nội.</p>
            <p><strong>Tọa độ:</strong> 21°01′40″N 105°51′08″E</p>
            <p><strong>Địa chỉ:</strong> Hồ Hoàn Kiếm, quận Hoàn Kiếm, thành phố Hà Nội</p>
            <p><strong>Ranh giới:</strong> Đảo Ngọc Sơn</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapboxExample;
