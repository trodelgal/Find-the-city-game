import React, {useEffect, useState, useCallback, useRef} from 'react';
import {Modal, Button} from 'react-bootstrap';
import axios from "axios";

function EndGameModal({handleClose, gameFinished, score, saveRecord,  endGame, startTime, endTime}){
    const [name, setName] = useState('')
    const [classes, setClasses] = useState([])
    const [className, setClassName] = useState('')

    let totalScore = score-Math.floor((endTime-startTime)/1000)*3;
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

    return (
        <Modal show={gameFinished} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title> Game Finished</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Your Score:</h4>
                Distance Score: {score}, Time:  {Math.floor((endTime-startTime)/1000)} sec, Total Score: <b>{score-Math.floor((endTime-startTime)/1000)*3}</b>
            </Modal.Body>
            <Modal.Body>
                <h4>Save Your Record</h4>
                Name: <input type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)}/><br/>
                class: <select onChange={(e)=>setClassName(e.target.value)}>
                    <option>privet</option>
                    {classes.map((value,i) =>{
                        return(
                            <option key={i}>{`${value.id}. ${value.school} - ${value.class}`}</option>
                        )
                    })}
                </select>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>endGame()}>
                New Game
            </Button>
            <Button variant="primary" onClick={()=>saveRecord(name, totalScore, className.split('.')[0])}>
                Save In Records
            </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default EndGameModal;