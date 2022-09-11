import "./Sidebar.scss";
import { useState } from "react";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import Places from "./Places";
export default function Menu({
  getUserLocation,
  setCoord,
  setCurrentMarker,
  setTargetMarker,
  menuOpen,
  setMenuOpen,
  showPointData,
  setZoom,
}) {
  return (
    <div className={"menu " + (menuOpen && "active")}>
      <button className="button-3 go " onClick={showPointData}>
        GO
      </button>
      <div className="location">
        <Places
          getUserLocation={getUserLocation}
          setCoord={setCoord}
          placeholder={"Your Location"}
          setMarker={setCurrentMarker}
          setZoom={setZoom}
        />
        <LocationSearchingIcon onClick={getUserLocation} />
      </div>
      <Places
        getUserLocation={getUserLocation}
        setCoord={setCoord}
        placeholder={"Choose destination"}
        setMarker={setTargetMarker}
        setZoom={setZoom}
      />
    </div>
  );
}
