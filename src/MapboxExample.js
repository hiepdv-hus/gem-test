import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxExample = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const popupRef = useRef(null);
  const [showIcon, setShowIcon] = useState(true);

  // Tọa độ chính xác của Tháp Rùa: 21°01′40″N 105°51′08″E
  // Chuyển đổi: 21°01′40″ = 21.0278°, 105°51′08″ = 105.8522°
  const thapRuaPosition = [105.85229, 21.02785]; // [lng, lat] cho Mapbox

  // Ranh giới hành chính - hình tròn bao quanh Tháp Rùa
  // Bán kính tính bằng mét, dễ điều chỉnh
  const administrativeRadius = 15; // 15 mét

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken =
      'pk.eyJ1IjoiZGFuZ2FuaDI4NTk3IiwiYSI6ImNtYzBvazI5dzA0cWEybXB5bGw2OTR5aGIifQ.QmoEj4F4iS4nWPLtF8d_0w';

    // Khởi tạo map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: thapRuaPosition,
      zoom: 17,
      pitch: 0,
      bearing: 0
    });

    mapRef.current.on('load', () => {
      const map = mapRef.current;

      // Hàm tạo circle GeoJSON
      const createCircle = (center, radiusInMeters) => {
        const points = 64;
        const coordinates = [];
        for (let i = 0; i <= points; i++) {
          const angle = (i * 360) / points;
          const dx = radiusInMeters * Math.cos((angle * Math.PI) / 180);
          const dy = radiusInMeters * Math.sin((angle * Math.PI) / 180);

          // Chuyển đổi mét sang độ (xấp xỉ)
          const latOffset = dy / 111320; // 1 độ lat ≈ 111320 mét
          const lngOffset = dx / (111320 * Math.cos((center[1] * Math.PI) / 180));

          coordinates.push([center[0] + lngOffset, center[1] + latOffset]);
        }
        return {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [coordinates]
          }
        };
      };

      // Tạo circle boundary
      const circle = createCircle(thapRuaPosition, administrativeRadius);

      // Thêm source và layer cho circle
      map.addSource('boundary-circle', {
        type: 'geojson',
        data: circle
      });

      map.addLayer({
        id: 'boundary-circle-fill',
        type: 'fill',
        source: 'boundary-circle',
        paint: {
          'fill-color': '#3388ff',
          'fill-opacity': 0.2
        }
      });

      map.addLayer({
        id: 'boundary-circle-stroke',
        type: 'line',
        source: 'boundary-circle',
        paint: {
          'line-color': '#3388ff',
          'line-width': 2
        }
      });

      // Tạo marker với icon tháp
      const el = document.createElement('div');
      el.className = 'custom-tower-marker';
      el.innerHTML = '<div style="font-size: 25px;">🗼</div>';
      el.style.cursor = 'pointer';

      markerRef.current = new mapboxgl.Marker({
        element: el
      })
        .setLngLat(thapRuaPosition)
        .addTo(map);

      // Tạo popup
      const popupContent = `
        <div>
          <h3>Tháp Rùa</h3>
          <p>Tháp Rùa là một ngôi tháp nhỏ nằm ở trung tâm Hồ Gươm, quận Hoàn Kiếm, thành phố Hà Nội.</p>
          <p><strong>Tọa độ:</strong> 21°01′40″N 105°51′08″E</p>
          <p><strong>Địa chỉ:</strong> Hồ Hoàn Kiếm, quận Hoàn Kiếm, thành phố Hà Nội</p>
          <p><strong>Ranh giới:</strong> Đảo Ngọc Sơn</p>
        </div>
      `;

      popupRef.current = new mapboxgl.Popup({ offset: 25 })
        .setHTML(popupContent);

      markerRef.current.setPopup(popupRef.current);

      // Xử lý ẩn/hiện icon khi popup mở/đóng
      popupRef.current.on('open', () => {
        setShowIcon(false);
        el.style.display = 'none';
      });

      popupRef.current.on('close', () => {
        setShowIcon(true);
        el.style.display = 'block';
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div ref={mapContainerRef} style={{ height: '100vh', width: '100%' }} />;
};

export default MapboxExample;
