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

const marker = (
  <Marker
    position={{ lat:32, lng: 35 }}
    draggable={true}
    // animation={google.maps.Animation.DROP}
    clickable={true}
    icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
  />
);
const Map = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
    defaultZoom={props.zoom}
    defaultCenter={props.position}
    onClick={(event) => moveMarker(event.latLng, marker)}
    >
      {props.isMarkerShown && marker}
    </GoogleMap>
  ))
);
const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;
