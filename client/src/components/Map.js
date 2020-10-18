import React, { useEffect, useState } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DROP,
} from "react-google-maps";

const Map = withScriptjs(
  withGoogleMap(({ markerPosition, country, moveMarker, greenMarker }) => {
    return (
      <GoogleMap
        zoom={country.zoom}
        center={{ lat: country.latitude, lng: country.longitude }}
        onClick={(event) => moveMarker(event.latLng)}
      >
        <Marker
          draggable={true}
          position={markerPosition}
          // animation={google.maps.Animation.DROP}
          clickable={true}
          icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        />
        {greenMarker.map((city) => {
          return (
            <Marker
              draggable={false}
              position={{ lat: city.latitude, lng: city.longitude }}
              animation={DROP}
              clickable={true}
              title={city.name}
              icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
            />
          );
        })}
      </GoogleMap>
    );
  })
);

export default Map;
