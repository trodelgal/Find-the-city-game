import React, { useEffect, useState, useCallback } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import GameBar from "./components/GameBar";
import Header from "./components/Header";
import Records from "./components/Records";
import Rules from "./components/Rules";
import EndGameModal from "./components/Modal";
import ClassModal from "./components/ClassModal";
import Map from "./components/Map";
import "bootstrap/dist/css/bootstrap.min.css";
import CountryContext from "./contexts/Context";

function App() {
  const [allCountries, setAllCountries] = useState(null);
  const [country, setCountry] = useState(null);
  const [cities, setCities] = useState(null);
  const [start, setStart] = useState(false);

  const [challengeCities, setChallengeCities] = useState([]);
  const [greenMarker, setGreenMarker] = useState([]);
  const [distance, setDistance] = useState("");
  const [score, setScore] = useState(0);
  const [hebrew, setHebrew] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [openClassModal, setOpenClassModal] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // reset the states on the end of the game
  const clearState = useCallback(() => {
    setChallengeCities([]);
    setGreenMarker([]);
    setDistance("");
    setScore(0);
    setStartTime("");
    setEndTime("");
    setGameFinished(false);
    setStart(false);
  },[]);

  // fetch all the initial data from db
  const fetchInitialData = useCallback(async () => {
    try {
      const allCountries = await axios.get("/api/countries/");
      console.log(allCountries.data);
      setAllCountries(allCountries.data);
      // set initial country to israel
      setCountry(allCountries.data[0]); 
      const countryCities = await axios.get(`/api/cities/Israel`);
      // ret the initial cities to israel cities
      setCities(countryCities.data);
    } catch (err) {
      console.log(err);
    }
  },[]);

  const getCountryCity = useCallback(async () => {
    try {
      const countryCities = await axios.get(`/api/cities/${country.name}`);
      setCities(countryCities.data);
    } catch (err) {
      console.log(err);
    }
  },[country]);

  // on loading start the initial function
  useEffect(() => {
    fetchInitialData();
  }, []);

  // change the cities to current country stste cities
  useEffect(() => {
    if (country !== null) {
      getCountryCity();
    }
  }, [country]);

  function changeHebrew() {
    setHebrew(!hebrew);
  }

  //player turn function
  function gameTurn(location) {
    const distance = calcDistance(location, {
      lat: challengeCities[challengeCities.length - 1].latitude,
      lng: challengeCities[challengeCities.length - 1].longitude,
    }).toFixed(2);
    let turnScore = Number((1000 / distance).toFixed());
    setScore(score + turnScore);
    setDistance(distance);
    setGreenMarker(challengeCities);
    // get random city
    let i;
    i = Math.floor(Math.random() * cities.length);
    let newCity = cities[i];
    setChallengeCities((val) => [...val, newCity]);
  }
 
  // map click function
  function playerClick(location) {
    if (start) {
      if (challengeCities.length < 5) {
        gameTurn(location);
      } else if (challengeCities.length === 5) {
        gameTurn(location);
        setEndTime(new Date().getTime());
        setGameFinished(true);
      }
    }
  }

  // start the game function
  const startGame = useCallback(()=> {
    // get random city
    let i;
    i = Math.floor(Math.random() * cities.length);
    let newCity = cities[i];
    setChallengeCities((val) => [...val, newCity]);
    setStart(true);
    setStartTime(new Date().getTime());
  },[cities])

  // reset app function 
  const endGame= useCallback(()=>{
    window.location = "/";
  },[])

  const changeContry = useCallback((countryValue)=>{
    clearState();
    setCountry(countryValue);
  },[])

  // calculate the distance between the click location to the turn city location
  const calcDistance= useCallback((mk1, mk2)=> {
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
  },[])

  // close modal
  const handleClose = () => setGameFinished(false);

  // save the record to db
  const saveRecord = useCallback((name, totalScore, classId)=> {
    if (name === "") return alert("You Must Enter Your Name!");
    let recordObj = {
      name: name,
      score: totalScore,
      country: country.name,
      classId: parseInt(classId),
    };
    axios.post("/api/records/", recordObj);
    setGameFinished(false);
  },[country])

  return (
    <CountryContext.Provider
      value={{
        country: country,
        hebrew: hebrew,
      }}
    >
      <Router>
        <Route exact path="/">
          <div className="App" style={{ width: "100vw", height: "100vh" }}>
            <Header
              allCountries={allCountries}
              changeContry={changeContry}
              start={start}
              startGame={startGame}
              endGame={endGame}
              changeHebrew={changeHebrew}
              setOpenClassModal={setOpenClassModal}
            />
            <section
              id="gameContainer"
              style={{ width: "100%", height: "100%" }}
            >
              <Map
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&callback=initMap&libraries=&v=weekly`}
                loadingElement={<div style={{ height: `90%` }} />}
                containerElement={
                  <div style={{ height: `85%`, width: "77%" }} />
                }
                mapElement={<div style={{ height: `100%` }} />}
                start={start}
                playerClick={playerClick}
                greenMarker={greenMarker}
              />
              {start ? (
                <GameBar
                  challengeCities={challengeCities}
                  score={score}
                  distance={distance}
                  gameFinished={gameFinished}
                  endTime={endTime}
                />
              ) : (
                <Rules/>
              )}
            </section>
            <EndGameModal
              saveRecord={saveRecord}
              gameFinished={gameFinished}
              handleClose={handleClose}
              score={score}
              startGame={startGame}
              endGame={endGame}
              startTime={startTime}
              endTime={endTime}
            />
            <ClassModal
              openClassModal={openClassModal}
              setOpenClassModal={setOpenClassModal}
            />
          </div>
        </Route>
        <Route exact path="/records">
          <Records allCountries={allCountries} />
        </Route>
      </Router>
    </CountryContext.Provider>
  );
}

export default App;
