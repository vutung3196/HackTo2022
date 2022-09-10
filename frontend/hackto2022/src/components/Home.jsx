import { useJsApiLoader } from "@react-google-maps/api";
import Map from "./Map";
function Home() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCOU9Cvky92D4ZcJgBi2lFJyQd4NGJ6iQw",
  });

  return isLoaded ? <Map /> : <>loading...</>;
}

export default Home;
