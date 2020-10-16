import React from "react";
import Map from "./components/Map";
import "./App.css";


function App() {

  return (
    <div className="App" style={{ width: "100%", height: "100%" }}>
      <Map
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&callback=initMap&libraries=&v=weekly`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          isMarkerShown={true}
          
      />
    </div>
  );
}

export default App;
