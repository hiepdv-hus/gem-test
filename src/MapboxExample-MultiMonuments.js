// File ví dụ: Hiển thị nhiều di tích trên bản đồ
// Bạn có thể sử dụng file này thay cho MapboxExample.js

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MonumentModal from './MonumentModal';
import { monuments } from './monumentsData';

const MapboxExampleMulti = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMonument, setSelectedMonument] = useState(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken =
      'pk.eyJ1IjoiZGFuZ2FuaDI4NTk3IiwiYSI6ImNtYzBvazI5dzA0cWEybXB5bGw2OTR5aGIifQ.QmoEj4F4iS4nWPLtF8d_0w';

    // Tính toán center và bounds để hiển thị tất cả di tích
    const bounds = new mapboxgl.LngLatBounds();
    monuments.forEach(monument => {
      bounds.extend(monument.position);
    });

    // Khởi tạo map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: bounds.getCenter(),
      zoom: 12
    });

    mapRef.current.on('load', () => {
      const map = mapRef.current;

      // Fit map để hiển thị tất cả markers
      if (monuments.length > 1) {
        map.fitBounds(bounds, {
          padding: 50,
          maxZoom: 15
        });
      }

      // Tạo markers cho tất cả di tích
      monuments.forEach((monument, index) => {
        // Tạo marker element
        const markerEl = document.createElement('div');
        markerEl.className = 'monument-marker';
        markerEl.style.width = '40px';
        markerEl.style.height = '40px';
        markerEl.style.cursor = 'pointer';
        markerEl.style.borderRadius = '50%';
        markerEl.style.border = '3px solid white';
        markerEl.style.boxShadow = '0 3px 10px rgba(0,0,0,0.4)';
        
        // Custom color cho mỗi marker
        markerEl.style.backgroundColor = monument.markerColor || '#667eea';
        
        // Thêm số thứ tự vào marker
        markerEl.innerHTML = `<div style="
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          color: white;
          font-weight: bold;
          font-size: 16px;
          text-shadow: 0 1px 3px rgba(0,0,0,0.5);
        ">${index + 1}</div>`;

        // Thêm event listener để mở modal khi click
        markerEl.addEventListener('click', () => {
          setSelectedMonument(monument);
          setIsModalOpen(true);
        });

        // Thêm popup hint khi hover
        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: false,
          closeOnClick: false
        }).setHTML(`
          <div style="text-align: center;">
            <strong>${monument.name}</strong><br/>
            <small>Click để xem chi tiết</small>
          </div>
        `);

        // Tạo và thêm marker vào map
        const marker = new mapboxgl.Marker({
          element: markerEl
        })
          .setLngLat(monument.position)
          .setPopup(popup)
          .addTo(map);

        // Lưu reference
        markersRef.current.push(marker);

        // Hiển thị popup khi hover
        markerEl.addEventListener('mouseenter', () => {
          marker.togglePopup();
        });
        markerEl.addEventListener('mouseleave', () => {
          marker.togglePopup();
        });
      });
    });

    return () => {
      // Cleanup markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <div ref={mapContainerRef} style={{ height: '100vh', width: '100%' }} />
      
      {/* Sidebar hiển thị danh sách di tích */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        background: 'white',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        maxWidth: '250px',
        maxHeight: '80vh',
        overflowY: 'auto',
        zIndex: 1
      }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>
          📍 Danh sách di tích
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {monuments.map((monument, index) => (
            <li
              key={monument.id}
              onClick={() => {
                setSelectedMonument(monument);
                setIsModalOpen(true);
                // Fly to monument
                if (mapRef.current) {
                  mapRef.current.flyTo({
                    center: monument.position,
                    zoom: 16,
                    duration: 1500
                  });
                }
              }}
              style={{
                padding: '10px',
                marginBottom: '8px',
                background: '#f8f9fa',
                borderRadius: '6px',
                cursor: 'pointer',
                borderLeft: `4px solid ${monument.markerColor || '#667eea'}`,
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e9ecef';
                e.currentTarget.style.transform = 'translateX(5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f8f9fa';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: monument.markerColor || '#667eea',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  marginRight: '10px'
                }}>
                  {index + 1}
                </span>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                    {monument.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#666' }}>
                    {monument.yearBuilt}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      {selectedMonument && (
        <MonumentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          monumentData={selectedMonument}
        />
      )}
    </>
  );
};

export default MapboxExampleMulti;

