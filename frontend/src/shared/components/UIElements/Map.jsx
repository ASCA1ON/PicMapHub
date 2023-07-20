
import React, { useRef, useEffect } from 'react';
import './Map.css';

const Map = props => {
  const mapRef = useRef();
  const markerRef = useRef(null);

  const { center, zoom } = props;

  useEffect(() => {
    const map = new window.ol.Map({
      target: mapRef.current.id,
      layers: [
        new window.ol.layer.Tile({
          source: new window.ol.source.OSM(),
        }),
      ],
      view: new window.ol.View({
        center: window.ol.proj.fromLonLat([parseFloat(center.lng), parseFloat(center.lat)]),
        zoom: zoom,
      }),
    });

    const marker = new window.ol.Feature({
      geometry: new window.ol.geom.Point(window.ol.proj.fromLonLat([parseFloat(center.lng), parseFloat(center.lat)])),
    });

    const markerStyle = new window.ol.style.Style({
      image: new window.ol.style.Icon({
        src: 'https://cdn-icons-png.flaticon.com/512/2776/2776067.png', 
        scale: 0.07
      }),
    });

    marker.setStyle(markerStyle);

    const markerLayer = new window.ol.layer.Vector({
      source: new window.ol.source.Vector({
        features: [marker],
      }),
    });

    map.addLayer(markerLayer);

    markerRef.current = marker;

    return () => {
      map.setTarget(null);
    };
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
      id="map"
    ></div>
  );
};

export default Map;







//   useEffect(() => {
//     new window.ol.Map({
//       target: mapRef.current.id,
//       layers: [
//         new window.ol.layer.Tile({
//           source: new window.ol.source.OSM()
//         })
//       ],
//       view: new window.ol.View({
//         center: window.ol.proj.fromLonLat([center.lng, center.lat]),
//         zoom: zoom
//       })
//     });
//   }, [center, zoom]);
 

