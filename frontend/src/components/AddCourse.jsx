import React, { useContext, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { addCourse } from '../api';
import { MyContext } from '../contexts/MyContext';

export default function AddCourse() {

    const [show, setShow] = useState(false);
    const [code, setCourseCode] = useState("");
    const [name, setCourseName] = useState("");
    const [ltp, setLTP] = useState("");
    const [links, setLinks] = useState([]);
    const [text, setText] = useState('');
    const { dispatch } = useContext(MyContext)

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
    };

    const handleSubmit = (e) => {
        setText('Saving...')
        e.preventDefault()
        const doc = {
            code, name, links, ltp
        }
        addCourse(doc)
            .then(res => {
                setShow(false)
                setText("")
                dispatch({ type: "ADD_COURSE", payload: res.data })
            })
            .catch(e => setText('An error occured!'))
    }

    return (
        <>
            <Button size='sm' variant='outline-secondary' onClick={handleShow} >Add Course</Button>
            <Modal show={show} onHide={handleClose}>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label>Course Code</Form.Label>
                        <Form.Control required onChange={(e) => setCourseCode(e.target.value)} type="text" placeholder="e.g. EE 204" />
                        <br />
                        <Form.Label>Course Name</Form.Label>
                        <Form.Control onChange={(e) => setCourseName(e.target.value)} type="text" placeholder="e.g. Analog Circuits" />
                        <br />
                        <Form.Label>L-T-P</Form.Label>
                        <Form.Control onChange={(e) => setLTP(e.target.value)} type="text" placeholder="e.g. 3-1-0" />
                        <br />
                        <Form.Label>Material Links</Form.Label>
                        <Form.Control onChange={(e) => {
                            const str = e.target.value
                            let arr = [];
                            str.split(',').map(s => arr.push(s))
                            setLinks(arr)
                        }} type="text" placeholder="e.g. comma seperated links" />
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
