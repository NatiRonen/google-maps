import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import React, { useRef, useState } from "react";
import { Button, Col, Modal, Row, Form, FloatingLabel } from "react-bootstrap";
import Map from "./components/map";
import "./App.css";

const center = { lat: 48.8584, lng: 2 / 2945 };

function App() {
  const [map, setMap] = useState(/**@type google.maps.map*/ (null));
  const [directionResponse, setDirectionResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const originRef = useRef();
  const destinationRef = useRef();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyC8zU9_yw3KHYx1p4ZEqsVPQWF8jKEoK00",
    libraries: ["places"],
  });

  const calculateRoute = async () => {
    if (originRef.current.value == "" || destinationRef.current.value == "") {
      return;
    }

    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  };

  const clearRoute = (route) => {
    setDirectionResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  };

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <div className=" col-6">
        <FloatingLabel controlId="floatingTextarea" label="Comments" className="mb-3">
          <Autocomplete>
            <Form.Control type="origin" ref={originRef} placeholder="Leave a comment here" />
          </Autocomplete>
        </FloatingLabel>
        {/* <input type="origin" ref={originRef} /> */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Autocomplete>
            {/* <Form.Control type="destination" ref={destinationRef} placeholder="name@example.com" /> */}
            <input type="destination" ref={destinationRef} />
          </Autocomplete>
        </Form.Group>

        <p>duration: {duration}</p>
        <p>distance: {distance}</p>
        <Button onClick={calculateRoute}>Go</Button>
      </div>
      <div className="container map-container">
        <GoogleMap
          center={center}
          zoom={16}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionResponse && <DirectionsRenderer directions={directionResponse} />}
        </GoogleMap>
      </div>
    </>
  );
}

export default App;
