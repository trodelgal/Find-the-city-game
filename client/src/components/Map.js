import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DROP,
} from "react-google-maps";
import CountryContext from "../contexts/Context";

const Map = React.memo(
  withScriptjs(
    withGoogleMap(({ playerClick, greenMarker }) => {
      const [markerPosition, setMarkerPosition] = useState();
      const { country } = useContext(CountryContext);

      const mapClick =(location) => {
        setMarkerPosition({ lat: location.lat(), lng: location.lng() });
        playerClick(location);
      };

      useEffect(() => {
        if (country) {
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
              zIndex={5}
            >
              <Marker
                draggable={
                  greenMarker.length === 0 || greenMarker.length === 5
                    ? true
                    : false
                }
                position={markerPosition}
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
                    size={0}
                    zIndex={1}
                  />
                );
              })}
            </GoogleMap>
          )}
        </>
      );
    })
  )
);

export default Map;
