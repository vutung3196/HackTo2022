import { useState, useCallback } from "react";
import { GoogleMap } from "@react-google-maps/api";

import Places from "./Places";
const containerStyle = {
  width: "100vw",
  height: "100vh",
};

export default function Map() {
  const [map, setMap] = useState(null);
  const [coord, setCoord] = useState({ lat: 30, lng: -70 });
  const [fetching, setFetching] = useState(false);

  const getUserLocation = async () => {
    if (navigator.geolocation) {
      setFetching(true);
      navigator.geolocation.getCurrentPosition((position) => {
        setCoord({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
      setTimeout(() => {
        setFetching(false);
      }, 2000);
    } else {
      console.log("Geolocation is not supported by your browser");
    }
  };

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(coord);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <div>
      <Places getUserLocatio={getUserLocation} />
      <button onClick={getUserLocation}>get location</button>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={12}
        onLoad={onLoad}
        center={coord}
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
