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
}) {
  return (
    <div className={"menu " + (menuOpen && "active")}>
      <div className="location">
        <Places
          getUserLocation={getUserLocation}
          setCoord={setCoord}
          placeholder={"Your Location"}
          setMarker={setCurrentMarker}
        />
        <LocationSearchingIcon onClick={getUserLocation} />
      </div>
      <Places
        getUserLocation={getUserLocation}
        setCoord={setCoord}
        placeholder={"Choose destination"}
        setMarker={setTargetMarker}
      />
    </div>
  );
}
