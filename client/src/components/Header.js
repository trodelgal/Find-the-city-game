import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Navbar,
    Nav,
    Button,
    NavDropdown,
  } from "react-bootstrap";

function Header ({allCountries, changeContry, start, country, hebrew, startGame, endGame ,changeHebrew }){
    
    return (
    <Navbar id="navbar" bg="dark" variant="dark">
    <Navbar.Brand>Find The City</Navbar.Brand>
    <Nav className="mr-auto">
    <NavDropdown title="Countries" id="basic-nav-dropdown">
        {(allCountries !== null && !start )&&
        allCountries.map((val) => {
            return (
            <NavDropdown.Item
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
        New Game
        </Button>
    )}
    {country !== null &&
    country.name === "Israel" &&
        <Button
        id="hebrew"
        variant="outline-info"
        onClick={() => changeHebrew()}
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
    )
}
export default Header;