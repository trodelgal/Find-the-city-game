import React, { useEffect, useState } from "react";
// import Map from "./components/Map";
import "./App.css";
import {
  Navbar,
  Nav,
  Button,
  Form,
  FormControl,
  NavDropdown,
} from "react-bootstrap";
import axios from "axios";
import GameBar from "./components/GameBar";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

function App() {
  const [allCountries, setAllCountries] = useState(null);
  const [country, setCountry] = useState(null);
  const [cities, setCities] = useState(null);
  const [start, setStart] = useState(false);

  let position =
    country !== null
      ? { lat: country.latitude, lng: country.longitude }
      : { lat: 32, lng: 35 };

  const [markerPosition, setMarkerPosition] = useState(position);
  const [challengeCities, setChallengeCities] = useState([]);
  const [greenMarker, setGreenMarker] = useState([]);
  const [counter, setCounter] = useState(0);
  const [distance, setDistance] = useState("");
  const [score, setScore] = useState(0);
  const [hebrew, setHebrew] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [showRules, setShowRules] = useState(false);

  const getCountries = async () => {
    try {
      const allCountries = await axios.get("/api/countries/");
      setAllCountries(allCountries.data);
      setCountry(allCountries.data[0]);
      const countryCities = await axios.get(`/api/cities/Israel`);
      setCities(countryCities.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getCountryCity = async () => {
    try {
      const countryCities = await axios.get(`/api/cities/${country.name}`);
      setCities(countryCities.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (country !== null) {
      getCountryCity();
    }
  }, [country]);

  function moveMarker(location) {
    setMarkerPosition({ lat: location.lat(), lng: location.lng() });
    if (start) {
      if (counter < 4) {
        let i;
        i = Math.floor(Math.random() * cities.length);
        let newCity = cities[i];
        const distance = calcDistance(location, {
          lat: newCity.latitude,
          lng: newCity.longitude,
        }).toFixed(2);
        let turnScore = Number((1000 / distance).toFixed());
        setScore(score + turnScore);
        setDistance(distance);
        setGreenMarker(challengeCities);
        setChallengeCities((val) => [...val, newCity]);
        setCounter(counter + 1);
      } else {
        setDistance("");
        setGreenMarker(challengeCities);
        setGameFinished(true);
      }
    }
  }

  function startGame() {
    let i;
    i = Math.floor(Math.random() * cities.length);
    let newCity = cities[i];
    setChallengeCities((val) => [...val, newCity]);
    setStart(true);
  }

  function endGame() {
    setStart(false);
    setChallengeCities([]);
    setGreenMarker([]);
    setCounter(0);
    setScore(0);
  }

  function changeContry(country) {
    setCountry(country);
    setStart(false);
    setHebrew(false);
    setMarkerPosition({ lat: country.latitude, lng: country.longitude });
  }

  function calcDistance(mk1, mk2) {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = mk1.lat() * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (mk2.lng - mk1.lng()) * (Math.PI / 180); // Radian difference (longitudes)
    var d =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) +
            Math.cos(rlat1) *
              Math.cos(rlat2) *
              Math.sin(difflon / 2) *
              Math.sin(difflon / 2)
        )
      );
    return d;
  }

  const Map = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={country !== null ? country.zoom : 8}
        defaultCenter={
          country !== null
            ? { lat: country.latitude, lng: country.longitude }
            : { lat: 32, lng: 35 }
        }
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
              draggable={true}
              position={{ lat: city.latitude, lng: city.longitude }}
              // animation={DROP}
              clickable={true}
              title={city.name}
              icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
            />
          );
        })}
      </GoogleMap>
    ))
  );

  return (
    <div className="App" style={{ width: "100vw", height: "100vh" }}>
      <Navbar id="navbar" bg="dark" variant="dark">
        <Navbar.Brand>Find The City</Navbar.Brand>
        <Nav className="mr-auto">
          <NavDropdown title="Countries" id="basic-nav-dropdown">
            {allCountries !== null &&
              allCountries.map((country) => {
                return (
                  <NavDropdown.Item
                    className="countryDropdown"
                    onClick={() => changeContry(country)}
                  >
                    {country.name}
                  </NavDropdown.Item>
                );
              })}
          </NavDropdown>
          {!start ? (
            <Button
              onClick={() => startGame()}
              id="StartButton"
              variant="outline-info"
            >
              START
            </Button>
          ) : (
            <Button
              onClick={() => endGame()}
              id="StartButton"
              variant="outline-info"
            >
              STOP
            </Button>
          )}
          {country !== null &&
          country.name === "Israel" &&
            <Button
              id="hebrew"
              variant="outline-info"
              onClick={() => setHebrew(!hebrew)}
            >
              {
                hebrew? "English": "עברית"
              }
            </Button>
        }
        </Nav>
        <Nav className="mr-auto">
          {country !== null && <Navbar.Brand>{country.name}</Navbar.Brand>}
        </Nav>
        <Nav>
          <Button id="recordButton" variant="outline-info">
            Records
          </Button>
          <Button id="rulesButton" variant="outline-info">
            Rules
          </Button>
        </Nav>
      </Navbar>
      <section id="gameContainer" style={{ width: "100%", height: "100%" }}>
        <Map
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&callback=initMap&libraries=&v=weekly`}
          loadingElement={<div style={{ height: `90%` }} />}
          containerElement={<div style={{ height: `80%`, width: "80%" }} />}
          mapElement={<div style={{ height: `100%` }} />}
          // isMarkerShown={true}
        />
        {start ? (
          <GameBar
            challengeCities={challengeCities}
            score={score}
            distance={distance}
            hebrew={hebrew}
          />
        ) : (
          <div style={{ width: "20%", height: "100%" }}>game bar</div>
        )}
      </section>
    </div>
  );
}

export default App;
