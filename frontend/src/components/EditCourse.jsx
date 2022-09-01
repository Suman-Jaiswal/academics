import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { editCourse } from '../api';
import { MyContext } from '../contexts/MyContext';

export default function EditCourse({ course }) {

    const [show, setShow] = useState(false);
    const [code, setCourseCode] = useState(course.code);
    const [name, setCourseName] = useState(course.name);
    const [ltp, setLTP] = useState(course.ltp);
    const [details, setDetails] = useState(course.details);
    const [prof, setProf] = useState(course.prof);
    const [credit, setCredit] = useState(course.credit);
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
            code, name, ltp, prof, credit, details
        }
        editCourse(course._id, doc)
            .then(res => {
                setShow(false)
                dispatch({ type: "EDIT_COURSE", payload: { id: course._id, data: { ...res.data } } })
                setText("")
            })
            .catch(e => setText('An error occured!'))
    }

    return (
        <>
            <span onClick={handleShow} role={'button'} className="ms-1 p-1"><FontAwesomeIcon size='xs' icon={faPen} /></span>
            <Modal show={show} onHide={handleClose}>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label>Course Code</Form.Label>
                        <Form.Control onChange={(e) => setCourseCode(e.target.value)} defaultValue={course.code} type="text" placeholder="e.g. EE 204" />
                        <br />
                        <Form.Label>Course Name</Form.Label>
                        <Form.Control onChange={(e) => setCourseName(e.target.value)} defaultValue={course.name} type="text" placeholder="e.g. Analog Circuits" />
                        <br />
                        <Form.Label>L-T-P</Form.Label>
                        <Form.Control onChange={(e) => setLTP(e.target.value)} defaultValue={course.ltp} type="text" placeholder="e.g. 3-1-0" />
                        <br />
                        <Form.Label>Professor</Form.Label>
                        <Form.Control onChange={(e) => setProf(e.target.value)} defaultValue={course.prof} type="text" placeholder="Enter professor name..." />
                        <br />
                        <Form.Label>Credit</Form.Label>
                        <Form.Control onChange={(e) => setCredit(e.target.value)} defaultValue={course.credit} type="number" placeholder="Enter credit" />
                        <br />
                        <Form.Label>Details</Form.Label>
                        <Form.Control onChange={(e) => setDetails(e.target.value)} defaultValue={course.details} type="text" placeholder="Enter Details of Marking scheme etc." />
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
