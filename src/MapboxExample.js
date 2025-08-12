import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Threebox } from 'threebox-plugin';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'threebox-plugin/dist/threebox.css'; // Nếu bạn có cài Threebox bằng npm

const MapboxWithGLBAndGLTF = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

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
      center: [105.854444, 21.028511],
      zoom: 17,
      pitch: 60,
      bearing: 0,
      antialias: true,
    });

    mapRef.current.on('style.load', () => {
      const map = mapRef.current;

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
            glbModel.setCoords([105.854444, 21.028511]);
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
            glbModel.setCoords([105.852444, 21.028811]);
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
            gltfModel.setCoords([105.855000, 21.031500]);
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
            houseModel.setCoords([105.851000, 21.031900]);
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

  return <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default MapboxWithGLBAndGLTF;
