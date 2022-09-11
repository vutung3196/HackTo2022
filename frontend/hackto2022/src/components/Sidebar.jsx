import "./Sidebar.scss";
import { useState } from "react";
import Places from "./Places";
export default function Menu({ getUserLocation, setCoord }) {
  const [menuOpen, setMenuOpen] = useState(true);
  return (
    <div className={"menu " + (menuOpen && "active")}>
      <Places getUserLocation={getUserLocation} setCoord={setCoord} />
    </div>
  );
}
