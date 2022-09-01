import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { addBranch } from '../api';

export default function AddBranch() {

    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [program, setProgram] = useState("");
    const [text, setText] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
    };

    const handleSubmit = (e) => {
        setText('Saving...')
        e.preventDefault()
        let branchId = program.toLowerCase();
        branchId += '-';
        let nam = name.toLowerCase().split(' ').join('-');
        branchId += nam
        const doc = {
            branchId, name, program
        }
        addBranch(doc)
            .then(res => {
                setShow(false)
                setText("")
            })
            .catch(e => setText('An error occured!'))
    }

    return (
        <>
            <Button size='sm' style={{ width: 100 }} variant='primary' onClick={handleShow}  >Add Branch</Button>
            <Modal show={show} onHide={handleClose}>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Branch</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form.Label>Branch Name</Form.Label>
                        <Form.Control onChange={(e) => setName(e.target.value)} type="text" placeholder="e.g. Electrical Engineering" />
                        <br />

                        <Form.Label>Program</Form.Label>
                        <Form.Control onChange={(e) => setProgram(e.target.value)} type="text" placeholder="e.g. B-Tech" />
                        <br />

                    </Modal.Body>
                    <Modal.Footer>
                        <div className={text === "An error occured!" ? "text-danger" : null} >{text}</div>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type='submit' onClick={handleSubmit}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Form>

            </Modal>
        </>
    )
}
