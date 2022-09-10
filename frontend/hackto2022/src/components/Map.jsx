import { useState, useCallback } from "react";
import { GoogleMap } from "@react-google-maps/api";
import DataService from "../services/data.service.js";
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
  const [location, setLocation] = useState("");

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const showLocationData = () => {
    DataService.getData()
      .then((response) => {
        console.log("============Location is================");
        console.log(response);
        setLocation(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);
  console.log(map);
  showLocationData();
  return (
    <div>
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
