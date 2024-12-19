import React, { useEffect, useState, useContext } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import CountryContext from "../contexts/Context";
const mapStyles = {
  height: "85%",
  width: "77%",
};

const Map = React.memo(({ playerClick, greenMarker }) => {
  // const [selected, setSelected] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const { country } = useContext(CountryContext);

  // Callback for map click
  const mapClick = (location) => {
    setMarkerPosition({ lat: location.lat(), lng: location.lng() });
    playerClick(location);
  };

  // Update marker position when country changes
  useEffect(() => {
    console.log(country);
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
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY}>
          <GoogleMap
            mapContainerStyle={mapStyles}
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
                  clickable={greenMarker.length === 5 ? true : false}
                  title={city.name}
                  icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                  size={0}
                  zIndex={1}
                />
              );
            })}
          </GoogleMap>
        </LoadScript>
      )}
    </>
  );
});

export default Map;
