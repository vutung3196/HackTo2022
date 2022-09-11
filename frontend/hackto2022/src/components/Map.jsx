import { useState, useEffect, useCallback } from "react";
import { GoogleMap, Marker, BicyclingLayerF } from "@react-google-maps/api";

import Sidebar from "./Sidebar";
import DataService from "../services/data.service.js";
import MenuIcon from "@mui/icons-material/Menu";
import { CgDanger } from "react-icons/cg";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

export default function Map() {
  const [map, setMap] = useState(null);
  const [coord, setCoord] = useState({ lat: 50, lng: -70 });
  const [currentMarker, setCurrentMarker] = useState(null);
  const [targetMarker, setTargetMarker] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [blackPoint, setBlackPoint] = useState([]);

  const showLocationData = () => {
    DataService.getData()
      .then((response) => {
        console.log("============Location is================");
        setBlackPoint(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    showLocationData();
  }, []);

  const getUserLocation = async () => {
    if (navigator.geolocation) {
      setFetching(true);
      navigator.geolocation.getCurrentPosition((position) => {
        setCoord({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setCurrentMarker({
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

  console.log(blackPoint);
  return (
    <div>
      <MenuIcon onClick={() => setMenuOpen(!menuOpen)} />

      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={10}
        onLoad={onLoad}
        center={coord}
        onUnmount={onUnmount}
      >
        <Sidebar
          getUserLocation={getUserLocation}
          setCoord={setCoord}
          setCurrentMarker={setCurrentMarker}
          setTargetMarker={setTargetMarker}
          menuOpen={menuOpen}
        />
        {currentMarker && <Marker position={currentMarker} />}
        {targetMarker && <Marker position={targetMarker} />}
        {blackPoint &&
          blackPoint.map((loca, index) => (
            <>
              <div>{loca.latitude}</div>
              <Marker
                key={index}
                icon={{
                  path: "M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z",
                  fillColor: "red",
                  fillOpacity: 0.7,
                  salce: 0.5,
                  strokeColor: "red",
                }}
                position={{ lng: loca.latitude, lat: loca.longitude }}
              />
            </>
          ))}
        <BicyclingLayerF autocomplete />
      </GoogleMap>
    </div>
  );
}
