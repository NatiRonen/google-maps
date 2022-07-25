import logo from "./logo.svg";
import "./App.css";
import { useLoadScript } from "@react-google-maps/api";
import Map from "./components/Map";

function App() {
  const { idLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDmf2ANbcDxVOkI-FcrPQyjVMF806-A-jk",
  });

  if (!idLoaded) return <div>Loading...</div>;
  return <Map />;
}

export default App;
