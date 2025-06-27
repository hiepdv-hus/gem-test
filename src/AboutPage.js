import React, { useEffect, useRef, useState } from 'react';
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import IcLocation from './location.svg';
import IcHome2 from './home2.png';
import IcHome3 from './home11.webp';
import IcHospital from './home14.png';

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
      zoom: 17.1
    });

    mapRef.current = map;

    // Utility: tạo marker có ảnh động theo zoom
    const createMarker = (lng, lat, iconUrl, popupText) => {
      const marker = new mapboxgl.Marker({ element: document.createElement('div') })
        .setLngLat([lng, lat])
        .setPopup(new mapboxgl.Popup().setText(popupText))
        .addTo(map);

      const el = marker.getElement();
      const zoom = map.getZoom();
      const size = Math.min(zoom * 6, 100); // khởi tạo to hơn và giới hạn

      el.style.backgroundImage = `url(${iconUrl})`;
      el.style.backgroundSize = 'contain';
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.transition = 'width 0.2s, height 0.2s'; // mượt hơn khi zoom
      el.style.backgroundRepeat = 'no-repeat';

      markerRefs.current.push(el); // lưu để resize
      return marker;
    };

    // Marker các điểm
    createMarker(userLocation.lng, userLocation.lat, IcLocation, 'Vị trí của tôi');
    // createMarker(105.8904, 21.046, IcHome2, 'Nhà tôi');
    // createMarker(105.8892, 21.0451, IcHome3, 'Bệnh viện');
    // createMarker(105.8895, 21.044, IcHospital, 'Bệnh viện');

    // Zoom listener → cập nhật size marker
    map.on('zoom', () => {
      const zoom = map.getZoom();
      console.log('🔍 Zoom hiện tại:', zoom.toFixed(2));

      const size = Math.min(zoom * 6, 100);

      markerRefs.current.forEach((el) => {
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
      });
    });

    // Route: từ vị trí đến Hồ Gươm
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
