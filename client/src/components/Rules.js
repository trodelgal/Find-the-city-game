import React, {useContext} from "react";
import { ListGroup } from "react-bootstrap";
import CountryContext from "../contexts/Context";


function Rules() {
  const { hebrew } = useContext(CountryContext);
  return (
    <div
      id="gameBar"
      style={{ width: "23%", height: "100%", fontSize: "12px" }}
    >
      {!hebrew ? (
        <ListGroup variant="flush">
          <ListGroup.Item variant="success">Rules</ListGroup.Item>
          <ListGroup.Item /*variant="dark"*/>Each game 5 turn</ListGroup.Item>
          <ListGroup.Item /*variant="dark"*/>
            Each turn you get random city
          </ListGroup.Item>
          <ListGroup.Item /*variant="dark"*/>
            You need to click on the city place at the map
          </ListGroup.Item>
          <ListGroup.Item /*variant="dark"*/>
            After click green marker will show the corect place of the city and
            you will get one more city
          </ListGroup.Item>
          <ListGroup.Item /*variant="dark"*/>
            Here you will find your cities, time, score and distance mistake
          </ListGroup.Item>
          <ListGroup.Item /*variant="dark"*/>
            The score is determined by the distance from the city and the total
            time
          </ListGroup.Item>
          <ListGroup.Item /*variant="dark"*/>
            End game: you could save your record, look at the map with the
            places or start new one
          </ListGroup.Item>
          <ListGroup.Item /*variant="dark"*/>
            You can choose counry to play at the top of the page
          </ListGroup.Item>
        </ListGroup>
      ) : (
        <ListGroup variant="flush">
          <ListGroup.Item variant="success">חוקים</ListGroup.Item>
          <ListGroup.Item /*variant="dark"*/>בכל משחק 5 תורות</ListGroup.Item>
          <ListGroup.Item /*variant="dark"*/>
            כל תור תקבל/י עיר אחת 
          </ListGroup.Item>
          <ListGroup.Item /*variant="dark"*/>
           מטרתך ללחוץ על מיקום העיר במפה
          </ListGroup.Item>
          <ListGroup.Item /*variant="dark"*/>
           לאחר לחיצה יופיע סימון ירוק על המפה במיקום העיר, ותקבל/י עיר נוספת
          </ListGroup.Item>
          <ListGroup.Item /*variant="dark"*/>
            כאן תוכל/י למצוא את הערים, זמנך, תוצאתך וטעות המרחק בכל תור
          </ListGroup.Item>
          <ListGroup.Item /*variant="dark"*/>
           התוצאה מחושבת לפי המרחק בין תשובותיך למיקום המדוייק, בשכלול עם זמן המשחק הכולל
          </ListGroup.Item>
          <ListGroup.Item /*variant="dark"*/>
            בסוף המשחק: תוכל/י לשמור את תוצאתך להסתכל על המפה עם סימוני המקומות או להתחיל משחק חדש
          </ListGroup.Item>
          <ListGroup.Item /*variant="dark"*/>
            באפשרותך לבחור באיזו מדינה תרצה לשחק בחלק העליון של הדף
          </ListGroup.Item>
        </ListGroup>
      )}
    </div>
  );
}
export default Rules;
