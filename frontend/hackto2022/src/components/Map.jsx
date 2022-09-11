import { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  BicyclingLayerF,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

import Sidebar from "./Sidebar";
import DataService from "../services/data.service.js";
import MenuIcon from "@mui/icons-material/Menu";

import "./Map.scss";
const containerStyle = {
  width: "100vw",
  height: "80vh",
};

export default function Map() {
  const [map, setMap] = useState(null);
  const [coord, setCoord] = useState({ lat: 50, lng: -70 });
  const [currentMarker, setCurrentMarker] = useState(null);
  const [targetMarker, setTargetMarker] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [blackPoint, setBlackPoint] = useState([]);
  const [areaBlackPoint, setAreaBlackPoint] = useState([]);
  const [zoom, setZoom] = useState(20);
  const [directions, setDirections] = useState(undefined);

  const showAreaData = () => {
    DataService.getAreaData()
      .then((response) => {
        console.log("============Location is================");
        setBlackPoint([]);
        setAreaBlackPoint(response);
        setZoom(10);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const showPointData = () => {
    DataService.getPointData()
      .then((response) => {
        console.log("============Location is================");
        setAreaBlackPoint([]);
        setBlackPoint(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const directionsService = () => {
    console.log(currentMarker);
    DirectionsService.route(
      {
        origin: new GoogleMap.LatLng(currentMarker.lat, currentMarker.lng),
        destination: new GoogleMap.LatLng(targetMarker.lat, targetMarker.lng),
        travelMode: GoogleMap.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === GoogleMap.DirectionsStatus.OK) {
          setDirections(result);
          console.log(result, "result");
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

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
        setZoom(16);
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
      <MenuIcon onClick={() => setMenuOpen(!menuOpen)} />
      <button className="button-3 show" onClick={showAreaData}>
        Show the Black Point
      </button>

      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={zoom}
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
          showPointData={showPointData}
          setZoom={setZoom}
        />
        {currentMarker && <Marker position={currentMarker} />}
        {targetMarker && <Marker position={targetMarker} />}
        {areaBlackPoint &&
          areaBlackPoint.map((loca, index) => (
            <Marker
              key={index}
              icon={{
                path: "M0,0, 0,150 150,150 150,0",
                fillColor: "red",
                fillOpacity: 0.4,
                scale: 1,
                strokeColor: "red",
              }}
              position={{ lng: loca.longitude, lat: loca.latitude }}
            />
          ))}
        {blackPoint &&
          blackPoint.map((loca, index) => (
            <Marker
              key={index}
              icon={{
                path: "M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z",
                fillColor: "red",
                fillOpacity: 0.7,
                scale: 1,
                strokeColor: "red",
              }}
              position={{ lng: loca.longitude, lat: loca.latitude }}
            />
          ))}

        <BicyclingLayerF autocomplete />
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
}
