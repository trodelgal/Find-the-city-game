import React, { useEffect, useState } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DROP,
} from "react-google-maps";

const Map = withScriptjs(
  withGoogleMap(({ country, gameTurn, greenMarker }) => {
    const [markerPosition, setMarkerPosition] = useState();

    function mapClick(location) {
      setMarkerPosition({ lat: location.lat(), lng: location.lng() });
      gameTurn(location);
    }

    useEffect(() => {
      if(country){
        setMarkerPosition({
          lat: country.latitude,
          lng: country.longitude,
        });
      }
    }, [country]);

    return (
      <>
        {country && (
          <GoogleMap
            zoom={country.zoom}
            center={{ lat: country.latitude, lng: country.longitude }}
            onClick={(event) => mapClick(event.latLng)}
          >
            <Marker
              draggable={
                greenMarker.length === 0 || greenMarker.length === 5
                  ? true
                  : false
              }
              position={markerPosition}
              // animation={google.maps.Animation.DROP}
              clickable={false}
              icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
            />
            {greenMarker.map((city) => {
              return (
                <Marker
                  key={city.name}
                  draggable={false}
                  position={{ lat: city.latitude, lng: city.longitude }}
                  animation={DROP}
                  clickable={greenMarker.length === 5 ? true : false}
                  title={city.name}
                  icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                />
              );
            })}
          </GoogleMap>
        )}
      </>
    );
  })
);

export default Map;
