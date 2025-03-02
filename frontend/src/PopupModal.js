import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import Network from "./Network";

function PopUp(props) {
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState(null);
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dateStarted: '',
        salary: '',
        manager: '',
        role: '',
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
        console.log(data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const create = async () => {
        try {
            const user = {
                dateStarted: new Date(data.dateStarted).toISOString(),
                email: String(data.email),
                firstName: data.firstName,
                lastName: data.lastName,
                manager: data.manager,
                role: data.role,
                salary: data.salary
            };
            console.log(user);
            const messege = await Network.post('/create', user);
            handleClose();
            setAlert(messege);
            props.setRender(props.render - 1);
        } catch (error) {
            window.alert("You are missing some stuff. try again...");
        }
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>Add +</Button>
            <Alert variant="success " show={!alert ? false : true}>{alert}</Alert>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Enter a new employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-1" >
                            <Form.Group className="mb-1" >
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="name" onChange={handleInputChange} value={data.firstName} name="firstName" />
                            </Form.Group>
                            <Form.Group className="mb-1" >
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="name" onChange={handleInputChange} value={data.lastName} name="lastName" />
                            </Form.Group>
                            <Form.Group className="mb-1" >
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="email" onChange={handleInputChange} value={data.email} name="email" />
                            </Form.Group>
                            <Form.Label>Date Started</Form.Label>
                            <Form.Control type="date" placeholder="date" onChange={handleInputChange} value={data.dateStarted} name="dateStarted" />
                        </Form.Group>
                        <Form.Group className="mb-1" >
                            <Form.Label>Salary</Form.Label>
                            <Form.Control type="number" placeholder="$" onChange={handleInputChange} value={data.salary} name="salary" />
                        </Form.Group>
                        <Form.Group className="mb-1" >
                            <Form.Label>Manager name (first and last)</Form.Label>
                            <Form.Control type="text" placeholder="name" onChange={handleInputChange} value={data.manager} name="manager" />
                        </Form.Group>
                        <Form.Group className="mb-1" >
                            <Form.Label>Role</Form.Label>
                            <Form.Select onChange={handleInputChange} value={data.role} name="role">
                                <option hidden> Choose a role</option>
                                <option value="Manager">Manager</option>
                                <option value="Worker">Worker</option>
                                <option value="Driver">Driver</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" type="submit" onClick={create}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopUp;