import React,{useState,useEffect} from "react";
import { ListGroup } from "react-bootstrap";
import Timer from "react-compound-timer";

function GameBar({ challengeCities, score, distance, hebrew, gameFinished, endTime }) {

  return (
    <div id="gameBar" style={{ width: "20%", height: "100%" }}>
      <ListGroup>
        {challengeCities.map((city, i) => {
          let name;
          hebrew ? (name = city.hebrewName) : (name = city.name);
          return (
            i < 5 &&
            (i === challengeCities.length - 1 ? (
              <ListGroup.Item key={i} variant="primary">{`${
                i + 1
              }. ${name}`}</ListGroup.Item>
            ) : (
              <ListGroup.Item key={i} variant="light">{`${
                i + 1
              }. ${name}`}</ListGroup.Item>
            ))
          );
        })}
        <ListGroup.Item variant="warning">distance: {distance} </ListGroup.Item>
        <ListGroup.Item variant="success">Your Score: {score} </ListGroup.Item>
      {
      (!gameFinished && endTime === '') &&
        <ListGroup.Item variant="danger">
          <Timer>
            <Timer.Seconds />
          </Timer>
        </ListGroup.Item>
      }
      </ListGroup>
    </div>
  );
}
export default GameBar;
