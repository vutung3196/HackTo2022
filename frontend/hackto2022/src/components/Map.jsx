import { useState, useCallback } from "react";
import { GoogleMap, Marker, BicyclingLayerF } from "@react-google-maps/api";
import axios from "axios";
import Places from "./Places";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { InfoWindow } from "@react-google-maps/api";
const containerStyle = {
  width: "100vw",
  height: "100vh",
};
export default function Map() {
  const [map, setMap] = useState(null);
  const [coord, setCoord] = useState({ lat: 30, lng: -70 });
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://annaostapenko.github.io/HackTo2022-BackEnd/data/fatal_geo.json"
      )
      .then((response) => {
        console.log(response);
      });
  }, []);
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
      <Sidebar getUserLocation={getUserLocation} setCoord={setCoord} />
      {/* <Places getUserLocation={getUserLocation} setCoord={setCoord} /> */}
      {/* <Sidebar /> */}
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
        <Marker position={coord} />
        <BicyclingLayerF autoUpdate />
      </GoogleMap>
    </div>
  );
}
