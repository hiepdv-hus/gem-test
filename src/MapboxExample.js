import React, { useEffect, useRef, useState } from 'react';
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

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
      center: [userLocation.lng, userLocation.lat], // Vị trí hiện tại của người dùng
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
