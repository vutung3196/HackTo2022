import { useState, useCallback } from "react";
import { GoogleMap } from "@react-google-maps/api";
import Places from "./Places";
const center = {
  lat: -3.745,
  lng: -38.523,
};
const containerStyle = {
  width: "100vw",
  height: "100vh",
};

export default function Map() {
  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  console.log(map);
  return (
    <div>
      <Places />
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* {markers &&
          markers.map((location) => (
            <Marker key={location.id} position={location.latLng} />
          ))} */}
      </GoogleMap>
    </div>
  );
}
