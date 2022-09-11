import { useJsApiLoader } from "@react-google-maps/api";
import Map from "./Map";
function Home() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCECygLsxYj2gL2V6h-mF5JpBkADhhyRPY",
    libraries: ["places"],
  });

  return isLoaded ? <Map /> : <>loading...</>;
}

export default Home;
