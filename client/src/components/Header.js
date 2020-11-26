import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
import CountryContext from "../contexts/Context";

function Header({
  allCountries,
  changeContry,
  start,
  startGame,
  endGame,
  changeHebrew,
  setOpenClassModal
}) {
  const { country, hebrew} = useContext(CountryContext);
  return (
    <Navbar id="navbar" bg="dark" variant="dark">
      <Navbar.Brand>Find The City</Navbar.Brand>
      <Nav className="mr-auto">
        <NavDropdown title="Countries" id="basic-nav-dropdown">
          {allCountries &&
            !start &&
            allCountries.map((val) => {
              return (
                <NavDropdown.Item
                  key={val.name}
                  className="countryDropdown"
                  onClick={() => changeContry(val)}
                >
                  {val.name}
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
            End Game
          </Button>
        )}
        {country !== null && country.name === "Israel" && (
          <Button
            id="hebrew"
            variant="outline-info"
            onClick={() => changeHebrew()}
          >
            {hebrew ? "English" : "עברית"}
          </Button>
        )}
      </Nav>
      <Nav className="mr-auto">
        {country && <Navbar.Brand>{country.name}</Navbar.Brand>}
      </Nav>
      <Nav>
        <Link to="/records">
          <Button id="recordButton" variant="outline-info">
            Records
          </Button>
        </Link>
        <Button id="rulesButton" variant="outline-info"  onClick={() => setOpenClassModal(true)}>
          New Class
        </Button>
      </Nav>
    </Navbar>
  );
}
export default Header;
