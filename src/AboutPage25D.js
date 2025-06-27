import React, { useEffect, useRef, useState } from 'react';
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import IcLocation from './location.svg';
import IcHome3 from './home3.png';
import IcHome4 from './home4.png';
import IcHospital from './hospital.png';

const AboutPage = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();
  const [userLocation, setUserLocation] = useState(null);
  const markerRefs = useRef([]);

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
          console.error('Error getting location: ', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (!userLocation) return;

    mapboxgl.accessToken =
      'pk.eyJ1IjoiZGFuZ2FuaDI4NTk3IiwiYSI6ImNtYzBvazI5dzA0cWEybXB5bGw2OTR5aGIifQ.QmoEj4F4iS4nWPLtF8d_0w';

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [105.8901, 21.0447],
      zoom: 17.1,
      pitch: 60,        // Nghiêng bản đồ tạo chiều sâu
      bearing: -20,     // Xoay nhẹ để thấy tòa nhà 3D
      antialias: true
    });

    mapRef.current = map;

    // Utility: tạo marker với ảnh động theo zoom
    const createMarker = (lng, lat, iconUrl, popupText) => {
      const marker = new mapboxgl.Marker({ element: document.createElement('div') })
        .setLngLat([lng, lat])
        .setPopup(new mapboxgl.Popup().setText(popupText))
        .addTo(map);

      const el = marker.getElement();
      const zoom = map.getZoom();
      const size = Math.min(zoom * 6, 100);

      el.style.backgroundImage = `url(${iconUrl})`;
      el.style.backgroundSize = 'contain';
      el.style.backgroundRepeat = 'no-repeat';
      el.style.backgroundPosition = 'center';
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.transition = 'width 0.2s, height 0.2s';

      markerRefs.current.push(el);
      return marker;
    };

    // Thêm các marker
    createMarker(userLocation.lng, userLocation.lat, IcLocation, 'Vị trí của tôi');
    createMarker(105.888, 21.043, IcHospital, 'Bệnh viện');
    createMarker(105.8891, 21.0432, IcHome3, 'Nhà bệnh nhân');
    createMarker(105.8892, 21.0452, IcHome4, 'Nhà bệnh nhân');

    // Scale icon theo zoom
    map.on('zoom', () => {
      const zoom = map.getZoom();
      const size = Math.min(zoom * 6, 100);
      console.log('🔍 Zoom hiện tại:', zoom.toFixed(2));

      markerRefs.current.forEach((el) => {
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
      });
    });

    // Đường từ vị trí đến Hồ Gươm
    const start = [userLocation.lng, userLocation.lat];
    const end = [105.854444, 21.028511];

    fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?alternatives=false&geometries=geojson&access_token=${mapboxgl.accessToken}`
    )
      .then((res) => res.json())
      .then((data) => {
        const route = data.routes[0].geometry;

        map.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: route
          }
        });

        map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          paint: {
            'line-color': '#3b9ddd',
            'line-width': 5,
            'line-opacity': 0.75
          }
        });
      })
      .catch((err) => console.error('❌ Error fetching directions:', err));

    return () => {
      map.remove();
    };
  }, [userLocation]);

  return (
    <div>
      <div
        ref={mapContainerRef}
        style={{ height: '100vh', width: '100%' }}
        className="map-container"
      />
    </div>
  );
};

export default AboutPage;
