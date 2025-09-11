import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Threebox } from 'threebox-plugin';
import hospitalIcon from './hospital.png'; // Đảm bảo ảnh có trong src hoặc public nếu dùng URL
// Xóa dòng import homeIcon vì nó gây lỗi webpack

import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxExample = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiZGFuZ2FuaDI4NTk3IiwiYSI6ImNtYzBvazI5dzA0cWEybXB5bGw2OTR5aGIifQ.QmoEj4F4iS4nWPLtF8d_0w';

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/standard',
      config: {
        basemap: {
          theme: 'monochrome',
          show3dObjects: false
        }
      },
      center: [105.854444, 21.028511],
      zoom: 17,
      pitch: 60,
      bearing: 0,
      antialias: true
    });

    mapRef.current.on('style.load', () => {
      const map = mapRef.current;

      // Load and add image as a marker icon
      map.loadImage(hospitalIcon, (error, image) => {
        if (error) {
          console.error('Error loading hospital icon:', error);
          return;
        }

        if (!map.hasImage('hospital-icon')) {
          map.addImage('hospital-icon', image);
        }
      });

      // Thêm lớp Threebox như cũ
      if (!map.getLayer('custom-threebox-model')) {
        map.addLayer({
          id: 'custom-threebox-model',
          type: 'custom',
          renderingMode: '3d',
          onAdd: function () {
            window.tb = new Threebox(map, map.getCanvas().getContext('webgl'), {
              defaultLights: true
            });

            const metlifeOptions = {
              obj: 'https://docs.mapbox.com/mapbox-gl-js/assets/metlife-building.gltf',
              type: 'gltf',
              scale: { x: 3.2, y: 3.2, z: 2.7 },
              units: 'meters',
              rotation: { x: 90, y: -90, z: 0 }
            };

            window.tb.loadObj(metlifeOptions, (model) => {
              model.setCoords([105.854444, 21.028511]);
              model.setRotation({ x: 0, y: 0, z: 0 });
              window.tb.add(model);
            });

            const houseOptions = {
              obj: 'https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf',
              type: 'gltf',
              scale: { x: 2, y: 2, z: 2 },
              units: 'meters',
              rotation: { x: 90, y: 0, z: 0 }
            };

            window.tb.loadObj(houseOptions, (houseModel) => {
              houseModel.setCoords([105.855000, 21.031500]);
              houseModel.setRotation({ x: 0, y: 0, z: 0 });
              window.tb.add(houseModel);
            });

            const houseOptions2 = {
              obj: '/models/house.glb', // Sử dụng đường dẫn public URL thay vì import
              type: 'glb',
              scale: { x: 80, y: 80, z: 80 },
              units: 'meters',
              rotation: { x: 90, y: 0, z: 0 }
            };

            window.tb.loadObj(houseOptions2, (houseModel) => {
              houseModel.setCoords([105.852100, 21.032500]);
              houseModel.setRotation({ x: 0, y: 0, z: 0 });
              window.tb.add(houseModel);
            });
          },
          render: function () {
            window.tb.update();
          }
        });
      }
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
