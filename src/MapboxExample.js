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

      // Điều chỉnh để hiển thị nhiều chi tiết hơn (POI, labels, tên đường)
      // Tăng kích thước text và hiển thị nhiều labels hơn
      try {
        // Điều chỉnh các layer label để hiển thị nhiều hơn
        const labelLayers = [
          'poi-label',
          'poi-scalerank2',
          'poi-scalerank1',
          'road-label',
          'road-number-shield',
          'place-label',
          'place-city-lg-n',
          'place-city-md-n',
          'place-city-sm',
          'place-town',
          'place-village'
        ];

        labelLayers.forEach((layerId) => {
          if (map.getLayer(layerId)) {
            // Tăng kích thước text nếu có
            const textSize = map.getLayoutProperty(layerId, 'text-size');
            if (textSize) {
              // Giữ nguyên hoặc tăng nhẹ
            }
            // Đảm bảo visibility
            map.setLayoutProperty(layerId, 'visibility', 'visible');
          }
        });
      } catch (e) {
        console.log('Một số layer không tồn tại:', e);
      }

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

      // Ẩn ranh giới ngay từ đầu
      map.setLayoutProperty('boundary-circle-fill', 'visibility', 'none');
      map.setLayoutProperty('boundary-circle-stroke', 'visibility', 'none');

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

      // Tạo invisible marker để click vào vị trí mở popup
      const invisibleEl = document.createElement('div');
      invisibleEl.style.width = '30px';
      invisibleEl.style.height = '30px';
      invisibleEl.style.cursor = 'pointer';
      invisibleEl.style.opacity = '0';

      markerRef.current = new mapboxgl.Marker({
        element: invisibleEl
      })
        .setLngLat(thapRuaPosition)
        .setPopup(popupRef.current)
        .addTo(map);
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
