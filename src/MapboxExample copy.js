import React, { useEffect, useRef, useState } from 'react';
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import IcLocation from "./location.svg"; // Đảm bảo rằng đường dẫn tới file hình là chính xác

const MapboxExample = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();
  const [userLocation, setUserLocation] = useState(null);

  // Lấy vị trí hiện tại của người dùng
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lng: position.coords.longitude,
            lat: position.coords.latitude,
          });
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Khởi tạo bản đồ
  useEffect(() => {
    if (!userLocation) return; // Chỉ tạo bản đồ khi có vị trí người dùng

    mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuZ2FuaDI4NTk3IiwiYSI6ImNtYzBvazI5dzA0cWEybXB5bGw2OTR5aGIifQ.QmoEj4F4iS4nWPLtF8d_0w';

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11', // Kiểu bản đồ
      center: [105.8901, 21.0447], // Tọa độ Long Biên, Việt Nam
      zoom: 14, // Mức zoom
      pitch: 45, // Góc nghiêng để có hiệu ứng 3D
      bearing: 0, // Hướng tầm nhìn
    });

    // Thêm dữ liệu DEM để tạo hiệu ứng 3D
    mapRef.current.on('style.load', () => {
      mapRef.current.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.terrain-rgb', // Nguồn DEM từ Mapbox
        tileSize: 512,
        maxzoom: 14,
      });

      // Thêm hiệu ứng 3D cho bản đồ
      mapRef.current.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
      mapRef.current.setPitch(45); // Cài đặt góc nghiêng của bản đồ
    });

    // Thêm Marker cho vị trí hiện tại của người dùng
    const marker = new mapboxgl.Marker({
      element: document.createElement('div'),
    })
      .setLngLat([userLocation.lng, userLocation.lat])
      .setPopup(new mapboxgl.Popup().setHTML("<h3>Vị trí của tôi</h3>"))
      .addTo(mapRef.current);

    // Cài đặt biểu tượng cho Marker
    const markerElement = marker.getElement();
    markerElement.style.backgroundImage = `url(${IcLocation})`;
    markerElement.style.backgroundSize = 'contain';
    markerElement.style.width = '30px';
    markerElement.style.height = '30px';

    // Thêm chức năng hướng dẫn đường từ vị trí hiện tại đến Hồ Gươm
    const start = [userLocation.lng, userLocation.lat]; // Tọa độ vị trí hiện tại của người dùng
    const end = [105.854444, 21.028511]; // Tọa độ Hồ Gươm

    // Gọi API Mapbox Directions để tính toán lộ trình
    fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?alternatives=false&geometries=geojson&access_token=${mapboxgl.accessToken}`)
      .then(response => response.json())
      .then(data => {
        const route = data.routes[0].geometry;

        // Vẽ lộ trình lên bản đồ
        mapRef.current.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: route,
          },
        });

        mapRef.current.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          paint: {
            'line-color': '#3b9ddd',
            'line-width': 5,
            'line-opacity': 0.75,
          },
        });
      })
      .catch(err => console.error('Error fetching directions: ', err));

    // Mở chế độ 3D cho các tòa nhà
    mapRef.current.on('style.load', () => {
      mapRef.current.addLayer({
        'id': '3d-buildings',
        'type': 'fill-extrusion',
        'source': 'composite',
        'source-layer': 'building',
        'paint': {
          'fill-extrusion-color': '#aaa',
          'fill-extrusion-height': ['get', 'height'],
          'fill-extrusion-base': ['get', 'min_height'],
          'fill-extrusion-opacity': 0.6
        }
      });
    });

  }, [userLocation]);

  return (
    <div>
      <div
        style={{ height: '100vh' }}
        ref={mapContainerRef}
        className="map-container"
      />
    </div>
  );
};

export default MapboxExample;
