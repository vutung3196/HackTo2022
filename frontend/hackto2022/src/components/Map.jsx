import { useState, useCallback } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import Places from "./Places";
import axios from "axios";
import { useEffect } from "react";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

export default function Map() {
  const [map, setMap] = useState(null);
  const [coord, setCoord] = useState({ lat: 43.6500455, lng: -79.3911321 });
  const handleCoord = () => {
    axios
      .post(
        "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCECygLsxYj2gL2V6h-mF5JpBkADhhyRPY"
      )
      .then(function (response) {
        setCoord(response.data.location);
        console.log(response.data.location);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const center = { lat: coord.lat, lng: coord.lng };

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
      <button onClick={handleCoord}>get location</button>

      <Places />

      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
        center={coord}
      >
        {/* {markers &&
          markers.map((location) => (
            <Marker key={location.id} position={location.latLng} />
          ))} */}
        <Marker position={{ lat: 43.6500455, lng: -79.3911321 }} />
      </GoogleMap>
    </div>
  );
}
