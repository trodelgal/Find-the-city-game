import React, { useEffect, useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

function ClassModal({openClassModal, setOpenClassModal}) {
    const schoolNameRef = useRef();
    const classNameRef = useRef();
    const passwordRef = useRef();
    function handleClose(){
        setOpenClassModal(false);
    }
    async function onSubmit(){
        try{
            const postObj = {
                school: schoolNameRef.current.value,
                class: classNameRef.current.value,
            }
            const res = await axios.post("/api/classes/", postObj);
            console.log(res);
            setOpenClassModal(false);
        }catch(err){
            console.error(err);
        }
    }

  return (
    <Modal show={openClassModal} onHide={handleClose}>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>School Name</Form.Label>
          <Form.Control type="text" placeholder="Enter school name" ref={schoolNameRef} />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Class Name</Form.Label>
          <Form.Control type="text" placeholder="Enter class name" ref={classNameRef}/>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Teacher Password</Form.Label>
          <Form.Control type="password" placeholder="Password" ref={passwordRef}/>
        </Form.Group>
        <Button variant="primary" onClick={()=>onSubmit()}>
          Submit
        </Button>
      </Form>
    </Modal>
  );
}
export default ClassModal;
