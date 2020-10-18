import React, {useEffect, useState} from 'react';
import {Modal, Button} from 'react-bootstrap';

function EndGameModal({handleClose, gameFinished, score, saveRecord,  endGame, startTime, endTime}){
    const[name, setName] = useState('')
    let totalScore = score-Math.floor((endTime-startTime)/1000)*3;
    console.log(totalScore);
  
    return (
        <Modal show={gameFinished} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title> Game Finished</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Your Score:</h4>
                Distance Score: {score}, Time:  {Math.floor((endTime-startTime)/1000)} sec, Total Score: {score-Math.floor((endTime-startTime)/1000)*3} 
            </Modal.Body>
            <Modal.Body>
                <h4>Save Your Record</h4>
                Name: <input type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)}/>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>endGame()}>
                New Game
            </Button>
            <Button variant="primary" onClick={()=>saveRecord(name, totalScore)}>
                Save In Records
            </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default EndGameModal;