import React from "react";
import { ListGroup } from "react-bootstrap";
import TimerComponent from "./Timer";

function GameBar({ challengeCities, score, distance, hebrew }) {
     
  return (
    <div id="gameBar" style={{ width: "20%", height: "100%" }}>
      <ListGroup>
        {challengeCities.map((city, i) => {
            let name
            hebrew ? name = city.hebrewName : name = city.name; 
          return (
            i < 5 &&
            (i === challengeCities.length - 1 ? (
              <ListGroup.Item variant="primary">{`${i + 1}. ${
                name
              }`}</ListGroup.Item>
            ) : (
              <ListGroup.Item variant="light">{`${i + 1}. ${
                name
              }`}</ListGroup.Item>
            ))
          );
        })}
        <ListGroup.Item variant="warning">distance: {distance} </ListGroup.Item>
        <ListGroup.Item variant="success">Your Score: {score} </ListGroup.Item>
        <ListGroup.Item variant="danger">
          <TimerComponent />
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
export default GameBar;
