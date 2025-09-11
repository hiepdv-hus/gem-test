import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Threebox } from 'threebox-plugin';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'threebox-plugin/dist/threebox.css'; // Nếu bạn có cài Threebox bằng npm

const MapboxWithGLBAndGLTF = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  // Dữ liệu các xã của Bắc Ninh
  const bacNinhWards = [
    { name: 'Xã Đại Xuân', district: 'Quế Võ', coordinates: [106.15, 21.15] },
    { name: 'Xã Việt Thống', district: 'Quế Võ', coordinates: [106.12, 21.18] },
    { name: 'Xã Phượng Mao', district: 'Quế Võ', coordinates: [106.10, 21.20] },
    { name: 'Xã Ngọc Xá', district: 'Quế Võ', coordinates: [106.08, 21.22] },
    { name: 'Xã Bằng An', district: 'Quế Võ', coordinates: [106.05, 21.25] },
    { name: 'Xã Phương Liễu', district: 'Quế Võ', coordinates: [106.02, 21.28] },
    { name: 'Xã Phù Lương', district: 'Quế Võ', coordinates: [105.98, 21.30] },
    { name: 'Xã Phù Chẩn', district: 'Từ Sơn', coordinates: [105.95, 21.12] },
    { name: 'Xã Đồng Kỵ', district: 'Từ Sơn', coordinates: [105.92, 21.15] },
    { name: 'Xã Trang Hạ', district: 'Từ Sơn', coordinates: [105.90, 21.18] },
    { name: 'Xã Đồng Nguyên', district: 'Từ Sơn', coordinates: [105.88, 21.20] },
    { name: 'Xã Châu Khê', district: 'Từ Sơn', coordinates: [105.85, 21.22] },
    { name: 'Xã Hương Mạc', district: 'Từ Sơn', coordinates: [105.82, 21.25] },
    { name: 'Xã Tân Hồng', district: 'Từ Sơn', coordinates: [105.80, 21.28] },
    { name: 'Xã Đình Tổ', district: 'Thuận Thành', coordinates: [106.20, 21.05] },
    { name: 'Xã Hoài Thượng', district: 'Thuận Thành', coordinates: [106.18, 21.08] },
    { name: 'Xã Mão Điền', district: 'Thuận Thành', coordinates: [106.15, 21.10] },
    { name: 'Xã Nguyệt Đức', district: 'Thuận Thành', coordinates: [106.12, 21.12] },
    { name: 'Xã Ninh Xá', district: 'Thuận Thành', coordinates: [106.10, 21.15] },
    { name: 'Xã Nghĩa Đạo', district: 'Thuận Thành', coordinates: [106.08, 21.18] },
    { name: 'Xã Song Liễu', district: 'Thuận Thành', coordinates: [106.05, 21.20] },
    { name: 'Xã Gia Đông', district: 'Thuận Thành', coordinates: [106.02, 21.22] },
    { name: 'Xã Thanh Khương', district: 'Thuận Thành', coordinates: [105.98, 21.25] },
    { name: 'Xã Trạm Lộ', district: 'Thuận Thành', coordinates: [105.95, 21.28] },
    { name: 'Xã Xuân Lâm', district: 'Thuận Thành', coordinates: [105.92, 21.30] },
    { name: 'Xã Hà Mãn', district: 'Thuận Thành', coordinates: [105.90, 21.32] },
    { name: 'Xã Ngũ Thái', district: 'Thuận Thành', coordinates: [105.88, 21.35] },
    { name: 'Xã Nguyễn Trãi', district: 'Gia Bình', coordinates: [106.25, 21.05] },
    { name: 'Xã Lãng Ngâm', district: 'Gia Bình', coordinates: [106.22, 21.08] },
    { name: 'Xã Quỳnh Phú', district: 'Gia Bình', coordinates: [106.20, 21.10] },
    { name: 'Xã Cao Đức', district: 'Gia Bình', coordinates: [106.18, 21.12] },
    { name: 'Xã Đại Bái', district: 'Gia Bình', coordinates: [106.15, 21.15] },
    { name: 'Xã Vạn Ninh', district: 'Gia Bình', coordinates: [106.12, 21.18] },
    { name: 'Xã Thái Bảo', district: 'Gia Bình', coordinates: [106.10, 21.20] },
    { name: 'Xã Giang Sơn', district: 'Gia Bình', coordinates: [106.08, 21.22] },
    { name: 'Xã Song Giang', district: 'Gia Bình', coordinates: [106.05, 21.25] },
    { name: 'Xã Bình Dương', district: 'Gia Bình', coordinates: [106.02, 21.28] },
    { name: 'Xã Lê Văn Thịnh', district: 'Gia Bình', coordinates: [105.98, 21.30] },
    { name: 'Xã Xuân Lai', district: 'Gia Bình', coordinates: [105.95, 21.32] },
    { name: 'Xã Đông Cứu', district: 'Gia Bình', coordinates: [105.92, 21.35] },
    { name: 'Xã Đại Lai', district: 'Gia Bình', coordinates: [105.90, 21.38] },
    { name: 'Xã Văn Xá', district: 'Lương Tài', coordinates: [106.30, 21.05] },
    { name: 'Xã Phú Hòa', district: 'Lương Tài', coordinates: [106.28, 21.08] },
    { name: 'Xã Mỹ Hương', district: 'Lương Tài', coordinates: [106.25, 21.10] },
    { name: 'Xã Tân Lãng', district: 'Lương Tài', coordinates: [106.22, 21.12] },
    { name: 'Xã Quảng Phú', district: 'Lương Tài', coordinates: [106.20, 21.15] },
    { name: 'Xã Trừng Xá', district: 'Lương Tài', coordinates: [106.18, 21.18] },
    { name: 'Xã Lai Hạ', district: 'Lương Tài', coordinates: [106.15, 21.20] },
    { name: 'Xã Trung Chính', district: 'Lương Tài', coordinates: [106.12, 21.22] },
    { name: 'Xã Minh Tân', district: 'Lương Tài', coordinates: [106.10, 21.25] },
    { name: 'Xã Bình Định', district: 'Lương Tài', coordinates: [106.08, 21.28] },
    { name: 'Xã Phú Lương', district: 'Lương Tài', coordinates: [106.05, 21.30] },
    { name: 'Xã Lâm Thao', district: 'Lương Tài', coordinates: [106.02, 21.32] },
    { name: 'Xã Nguyễn Trãi', district: 'Lương Tài', coordinates: [105.98, 21.35] },
    { name: 'Xã Định Tổ', district: 'Lương Tài', coordinates: [105.95, 21.38] },
    { name: 'Xã Phú Lâm', district: 'Lương Tài', coordinates: [105.92, 21.40] },
    { name: 'Xã Đại Đồng', district: 'Lương Tài', coordinates: [105.90, 21.42] }
  ];

  const [searchResults, setSearchResults] = useState(bacNinhWards);

  useEffect(() => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiZGFuZ2FuaDI4NTk3IiwiYSI6ImNtYzBvazI5dzA0cWEybXB5bGw2OTR5aGIifQ.QmoEj4F4iS4nWPLtF8d_0w';

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      // style: 'mapbox://styles/mapbox/standard',
      // config: {
      //   basemap: {
      //     theme: 'monochrome',
      //     show3dObjects: false
      //   }
      // },
      center: [106.0763, 21.1861], // Tọa độ trung tâm Bắc Ninh
      zoom: 10,
      pitch: 45,
      bearing: 0,
      antialias: true,
      // Giới hạn vùng hiển thị chỉ tỉnh Bắc Ninh
      maxBounds: [
        [105.8, 21.0], // Southwest coordinates - Bắc Ninh
        [106.3, 21.4]  // Northeast coordinates - Bắc Ninh
      ],
      // Ngăn người dùng zoom ra ngoài vùng giới hạn
      maxZoom: 16,
      minZoom: 8,
    });

    mapRef.current.on('style.load', () => {
      const map = mapRef.current;

      // Thêm layer để làm xám các tỉnh khác (trừ Bắc Ninh)
      map.addLayer({
        id: 'other-provinces-mask',
        type: 'fill',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Polygon',
                  coordinates: [[
                    // Tạo một polygon lớn bao quanh toàn bộ thế giới
                    [-180, -90],
                    [180, -90],
                    [180, 90],
                    [-180, 90],
                    [-180, -90],
                    // Tạo "lỗ" trong suốt cho tỉnh Bắc Ninh (ranh giới thực tế)
                    [105.85, 21.05],
                    [106.05, 21.02],
                    [106.15, 21.03],
                    [106.25, 21.05],
                    [106.28, 21.08],
                    [106.25, 21.15],
                    [106.25, 21.25],
                    [106.22, 21.30],
                    [106.20, 21.35],
                    [106.15, 21.35],
                    [106.10, 21.32],
                    [106.05, 21.30],
                    [105.95, 21.28],
                    [105.90, 21.25],
                    [105.85, 21.20],
                    [105.82, 21.15],
                    [105.80, 21.10],
                    [105.85, 21.05]
                  ]]
                },
                properties: {}
              }
            ]
          }
        },
        paint: {
          'fill-color': 'rgba(128, 128, 128, 0.7)', // Màu xám cho các tỉnh khác
          'fill-opacity': 1
        }
      }, 'threebox-layer'); // Đặt layer này dưới threebox-layer

      // Thêm layer highlight cho tỉnh Bắc Ninh
      map.addLayer({
        id: 'bac-ninh-highlight',
        type: 'fill',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Polygon',
                  coordinates: [[
                    // Ranh giới tỉnh Bắc Ninh
                    [105.85, 21.05],
                    [106.05, 21.02],
                    [106.15, 21.03],
                    [106.25, 21.05],
                    [106.28, 21.08],
                    [106.25, 21.15],
                    [106.25, 21.25],
                    [106.22, 21.30],
                    [106.20, 21.35],
                    [106.15, 21.35],
                    [106.10, 21.32],
                    [106.05, 21.30],
                    [105.95, 21.28],
                    [105.90, 21.25],
                    [105.85, 21.20],
                    [105.82, 21.15],
                    [105.80, 21.10],
                    [105.85, 21.05]
                  ]]
                },
                properties: {}
              }
            ]
          }
        },
        paint: {
          'fill-color': 'rgba(255, 107, 53, 0.1)', // Màu cam nhạt cho Bắc Ninh
          'fill-opacity': 0.3
        }
      }, 'other-provinces-mask'); // Đặt layer này dưới mask

      // Thêm border ranh giới tỉnh Bắc Ninh (sử dụng dữ liệu thực tế)
      map.addLayer({
        id: 'bac-ninh-province-border',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Polygon',
                  coordinates: [[
                    // Ranh giới thực tế của tỉnh Bắc Ninh (điều chỉnh theo hình dạng thực tế)
                    [105.85, 21.05],
                    [106.05, 21.02],
                    [106.15, 21.03],
                    [106.25, 21.05],
                    [106.28, 21.08],
                    [106.25, 21.15],
                    [106.25, 21.25],
                    [106.22, 21.30],
                    [106.20, 21.35],
                    [106.15, 21.35],
                    [106.10, 21.32],
                    [106.05, 21.30],
                    [105.95, 21.28],
                    [105.90, 21.25],
                    [105.85, 21.20],
                    [105.82, 21.15],
                    [105.80, 21.10],
                    [105.85, 21.05]
                  ]]
                },
                properties: {}
              }
            ]
          }
        },
        paint: {
          'line-color': '#ff6b35', // Màu cam cho border
          'line-width': 3,
          'line-opacity': 1
        }
      }, 'threebox-layer');

      // Thêm label "BẮC NINH" trên bản đồ
      map.addLayer({
        id: 'bac-ninh-label',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [106.0763, 21.1861] // Trung tâm Bắc Ninh
                },
                properties: {
                  name: 'BẮC NINH'
                }
              }
            ]
          }
        },
        layout: {
          'text-field': '{name}',
          'text-size': 18,
          'text-font': ['Open Sans Bold'],
          'text-offset': [0, 0],
          'text-anchor': 'center'
        },
        paint: {
          'text-color': '#ff6b35',
          'text-halo-color': '#ffffff',
          'text-halo-width': 3
        }
      }, 'threebox-layer');

      map.addLayer({
        id: 'threebox-layer',
        type: 'custom',
        renderingMode: '3d',
        onAdd: function () {
          window.tb = new Threebox(map, map.getCanvas().getContext('webgl'), {
            defaultLights: true,
          });

          // Mô hình GLB từ public/models/house.glb
          const glbModelOptions = {
            obj: '/models/house.glb',
            type: 'gltf',
            scale: { x: 30, y: 30, z: 30 },
            units: 'meters',
            rotation: { x: 90, y: 0, z: 0 },
          };

          window.tb.loadObj(glbModelOptions, (glbModel) => {
            glbModel.setCoords([106.0763, 21.1861]); // Trung tâm Bắc Ninh
            window.tb.add(glbModel);
          });

          // Mô hình GLB từ public/models/house.glb
          const glbFish = {
            obj: '/models/fish.glb',
            type: 'gltf',
            scale: { x: 80, y: 80, z: 80 },
            units: 'meters',
            rotation: { x: 90, y: 0, z: 0 },
          };

          window.tb.loadObj(glbFish, (glbModel) => {
            glbModel.setCoords([106.1, 21.2]); // Khu vực phía Bắc Bắc Ninh
            window.tb.add(glbModel);
          });

          // Mô hình GLTF từ URL
          const gltfModelOptions = {
            obj: 'https://docs.mapbox.com/mapbox-gl-js/assets/metlife-building.gltf',
            type: 'gltf',
            scale: { x: 2.5, y: 2.5, z: 2.5 },
            units: 'meters',
            rotation: { x: 90, y: -90, z: 0 },
          };

          window.tb.loadObj(gltfModelOptions, (gltfModel) => {
            gltfModel.setCoords([106.05, 21.15]); // Khu vực phía Nam Bắc Ninh
            window.tb.add(gltfModel);
          });

          const houseOptions = {
            obj: 'https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf',
            type: 'gltf',
            scale: { x: 2, y: 2, z: 2 },
            units: 'meters',
            rotation: { x: 90, y: 0, z: 0 }
          };

          window.tb.loadObj(houseOptions, (houseModel) => {
            houseModel.setCoords([106.0, 21.25]); // Khu vực phía Tây Bắc Ninh
            houseModel.setRotation({ x: 0, y: 0, z: 0 });
            window.tb.add(houseModel);
          });
        },
        render: function () {
          window.tb.update();
        },
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />

      {/* Search Panel */}
      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        width: 300,
        backgroundColor: 'white',
        borderRadius: 8,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        zIndex: 1000,
        padding: 15
      }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#333', fontSize: 16 }}>Tìm kiếm xã Bắc Ninh</h3>

        <input
          type="text"
          placeholder="Nhập tên xã..."
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: 4,
            fontSize: 14,
            marginBottom: 10
          }}
          onChange={(e) => {
            const searchTerm = e.target.value.toLowerCase();
            const searchResults = bacNinhWards.filter(ward =>
              ward.name.toLowerCase().includes(searchTerm) ||
              ward.district.toLowerCase().includes(searchTerm)
            );
            setSearchResults(searchResults);
          }}
        />

        <div style={{
          maxHeight: 300,
          overflowY: 'auto',
          border: '1px solid #eee',
          borderRadius: 4
        }}>
          {searchResults.map((ward, index) => (
            <div
              key={index}
              style={{
                padding: '8px 12px',
                borderBottom: '1px solid #eee',
                cursor: 'pointer',
                fontSize: 13
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              onClick={() => {
                if (mapRef.current) {
                  mapRef.current.flyTo({
                    center: ward.coordinates,
                    zoom: 14,
                    duration: 2000
                  });
                }
              }}
            >
              <div style={{ fontWeight: 'bold', color: '#333' }}>{ward.name}</div>
              <div style={{ fontSize: 11, color: '#666' }}>{ward.district}</div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 10,
          fontSize: 12,
          color: '#666',
          textAlign: 'center'
        }}>
          Tổng: {searchResults.length} xã
        </div>
      </div>
    </div>
  );
};

export default MapboxWithGLBAndGLTF;
