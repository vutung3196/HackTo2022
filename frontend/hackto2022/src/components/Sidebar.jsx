import "./Sidebar.scss";
import { useState } from "react";
import Places from "./Places";
export default function Menu({
  getUserLocation,
  setCoord,
  setCurrentMarker,
  setTargetMarker,
}) {
  const [menuOpen, setMenuOpen] = useState(true);
  return (
    <div className={"menu " + (menuOpen && "active")}>
      <Places
        getUserLocation={getUserLocation}
        setCoord={setCoord}
        placeholder={"Your Location"}
        setMarker={setCurrentMarker}
      />
      <Places
        getUserLocation={getUserLocation}
        setCoord={setCoord}
        placeholder={"Choose destination"}
        setMarker={setTargetMarker}
      />
      <button onClick={getUserLocation}>current location</button>
    </div>
  );
}
