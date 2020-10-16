import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

function moveMarker(location, marker) {
  console.log(location);
  console.log("here");
  console.log(marker.props.position);
//   marker.props.position=location
}

// let marker = new google.maps.Marker({
//   position: { lat: -34.397, lng: 150.644 },
//   draggable: false,
//   animation: google.maps.Animation.DROP,
//   clickable: false,
//   icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
// });
const marker = (
  <Marker
    position={{ lat: -34.397, lng: 150.644 }}
    draggable={true}
    // animation={google.maps.Animation.DROP}
    clickable={true}
    icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
  />
);
const Map = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
      onClick={(event) => moveMarker(event.latLng, marker)}
    >
      {props.isMarkerShown && marker}
    </GoogleMap>
  ))
);
// const WrappedMap = withScriptjs(withGoogleMap(Map));

export default Map;
