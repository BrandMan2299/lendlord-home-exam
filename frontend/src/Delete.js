import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import Network from "./Network";

export default function Delete(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const erase = async () => {
        try {
            await Network.delete(`/delete?_id=${props._id}`);
            window.alert("deleted");
            handleClose();
            props.setRender(props.render + 1);
        } catch (error) {
            window.alert("could not delete");
        }
    }

    return (
        <>
            <Button variant="danger" onClick={handleShow}>Delete</Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body></Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" type="submit" onClick={erase}>
                        Delete
                    </Button>
                    <Button variant="secondary" type="submit" onClick={handleClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}