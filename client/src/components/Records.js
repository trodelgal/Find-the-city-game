import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Button, NavDropdown, Table } from "react-bootstrap";

function Records({ allCountries }) {
  const [records, setRecords] = useState([]);
  const [classes, setClasses] = useState([]);
  const [className, setClassName] = useState(null);
  const [countryRecords, setCountryRecords] = useState("Israel");

  const getCountryRecord = useCallback(async () => {
    try{
      const allCountryRecords = await axios.get(`/api/records/${countryRecords}`);
      setRecords(allCountryRecords.data);
    }catch(err) {
      console.error(err.message)
    }
  });
  const getClassRecord = useCallback(async () => {
    try{
      const allClassRecords = await axios.get(`/api/records/${className}/${countryRecords}`);
      console.log(allClassRecords);
      setRecords(allClassRecords.data);
    }catch (err) {
      console.error(err.message)
    }
  });
  const getClasses = useCallback(async () => {
    try{
      const allClasses = await axios.get(`/api/classes/`);
      setClasses(allClasses.data);
    }catch (err) {
      console.error(err.message)
    }
  });

  useEffect(() => {
    getClasses();
  }, []);

  useEffect(() => {
    getCountryRecord();
    if(className){
      setClassName(null);
    }
  }, [countryRecords]);

  useEffect(() => {
    if(className){
      getClassRecord();
    }
  }, [className]);

  return (
    <>
      <Navbar id="navbar" bg="dark" variant="dark">
        <Navbar.Brand>Find The City</Navbar.Brand>
        <Nav className="mr-auto">
          <NavDropdown title={countryRecords} id="basic-nav-dropdown">
            {allCountries &&
              allCountries.map((val) => {
                return (
                  <NavDropdown.Item
                    key={val.name}
                    className="countryDropdown"
                    onClick={() => setCountryRecords(val.name)}
                  >
                    {val.name}
                  </NavDropdown.Item>
                );
              })}
          </NavDropdown>
          <NavDropdown title="Class" id="basic-nav-dropdown">
            {classes &&
              classes.map((val,i) => {
                return (
                  <NavDropdown.Item
                    key={i}
                    className="countryDropdown"
                    onClick={() => setClassName(`${val.school} - ${val.class}`)}
                  >
                    {`${val.school} - ${val.class}`}
                  </NavDropdown.Item>
                );
              })}
          </NavDropdown>
        </Nav>
        <Nav className="mr-auto">
          <Navbar.Brand>Game Records</Navbar.Brand>
        </Nav>
        <Nav>
          <Link to="/">
            <Button id="recordButton" variant="outline-info">
              Game
            </Button>
          </Link>
        </Nav>
      </Navbar>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {records.slice(0, 10).map((record, i) => {
            return (
              <tr>
                <td>{i + 1}</td>
                <td>{record.name}</td>
                <td>{record.score}</td>
                <td>{record.createdAt.slice(0, 10)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
export default Records;
