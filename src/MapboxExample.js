import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Threebox } from 'threebox-plugin';

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
      center: [105.854444, 21.028511], // Tọa độ Hồ Gươm
      zoom: 17,
      pitch: 60,
      bearing: 0,
      antialias: true
    });

    mapRef.current.on('style.load', () => {
      if (!mapRef.current.getLayer('custom-threebox-model')) {
        mapRef.current.addLayer({
          id: 'custom-threebox-model',
          type: 'custom',
          renderingMode: '3d',
          onAdd: function () {
            window.tb = new Threebox(
              mapRef.current,
              mapRef.current.getCanvas().getContext('webgl'),
              { defaultLights: true }
            );

            const scale = 3.2;
            const options = {
              obj: 'https://docs.mapbox.com/mapbox-gl-js/assets/metlife-building.gltf',
              type: 'gltf',
              scale: { x: scale, y: scale, z: 2.7 },
              units: 'meters',
              rotation: { x: 90, y: -90, z: 0 }
            };

            // Đặt mô hình 3D gần Hồ Gươm
            window.tb.loadObj(options, (model) => {
              model.setCoords([105.854444, 21.028511]);
              model.setRotation({ x: 0, y: 0, z: 0 });
              window.tb.add(model);
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
