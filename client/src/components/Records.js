import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Button, NavDropdown, Table } from "react-bootstrap";

function Records({ allCountries }) {
  const [records, setRecords] = useState([]);
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState(null);
  const [countryRecords, setCountryRecords] = useState("Israel");
  const [todayRecords, setTodayRecords] = useState(false);
  const [displayClassName, setDisplayClassName] = useState(null);

  // get all the records by country
  const getCountryRecord = useCallback(async () => {
    try {
      if(todayRecords){
        const allCountryRecords = await axios.get(
          `/api/records/${countryRecords}/today`
        );
        setRecords(allCountryRecords.data);
      }else{
        const allCountryRecords = await axios.get(
          `/api/records/${countryRecords}`
        );
        setRecords(allCountryRecords.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  },[countryRecords,todayRecords]);

  // get all the records by class
  const getClassRecord = useCallback(async () => {
    try {
      if(todayRecords){
        const allClassRecords = await axios.get(
          `/api/records/${classId}/${countryRecords}/today`
        );
        setRecords(allClassRecords.data);
      }else{
        const allClassRecords = await axios.get(
          `/api/records/${classId}/${countryRecords}`
        );
        setRecords(allClassRecords.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  },[classId,countryRecords,todayRecords]);

  // get all the classes 
  const getClasses = useCallback(async () => {
    try {
      const allClasses = await axios.get(`/api/classes/`);
      setClasses(allClasses.data);
    } catch (err) {
      console.error(err.message);
    }
  },[]);

  // on component loading get all the classes
  useEffect(() => {
    getClasses();
  }, []);

  // on change today records
  useEffect(() => {
    if(classId){
      getClassRecord()
    }else{
      getCountryRecord();
      setDisplayClassName("");
    }
  }, [todayRecords]);

  // on country change
  useEffect(() => {
    getCountryRecord();
    if (classId) {
      setClassId(null);
      setDisplayClassName(null);
    }
  }, [countryRecords]);

  // on class change
  useEffect(() => {
    if (classId){
      getClassRecord();
    }else if(classId === undefined) {
      getCountryRecord();
      setDisplayClassName(null);
    }
  }, [classId]);

  // change class
  function displayClassTable(val) {
    setClassId(val.id);
    setDisplayClassName(`${val.school} - ${val.class}`);
  }

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
              classes.map((val, i) => {
                return (
                  <NavDropdown.Item
                    key={i}
                    className="countryDropdown"
                    onClick={() => displayClassTable(val)}
                  >
                    {`${val.school} - ${val.class}`}
                  </NavDropdown.Item>
                );
              })}
            <NavDropdown.Item
              key="withoutClass"
              className="countryDropdown"
              onClick={() =>  setClassId(undefined)}
            >
              Country records
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav className="mr-auto">
          <Navbar.Brand>Game Records</Navbar.Brand>
        </Nav>
        <Nav>
            <Button id="recordButton" variant="outline-info"  onClick={()=>setTodayRecords(!todayRecords)}>
              {todayRecords? 'All Records' : 'Today Records'}
            </Button>
          <Link to="/">
            <Button id="recordButton" variant="outline-info">
              Game
            </Button>
          </Link>
        </Nav>
      </Navbar>
      {classId ? (
        <h2>{`${countryRecords} - ${displayClassName}`}</h2>
      ) : (
        <h2>{countryRecords}</h2>
      )}
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
            <th>Date </th>
          </tr>
        </thead>
        <tbody>
          {records &&
          records.slice(0, 20).map((record, i) => {
            return (
              <tr key={i}>
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
