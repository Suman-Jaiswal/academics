import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { editCourse } from '../api';

export default function EditCourse({ course }) {

    const [show, setShow] = useState(false);
    const [code, setCourseCode] = useState(course.code);
    const [name, setCourseName] = useState(course.name);
    const [ltp, setLTP] = useState(course.ltp);
    const [links, setLinks] = useState(course.links);
    const [text, setText] = useState('');

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
        editCourse(course._id, doc)
            .then(res => {
                setShow(false)
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
                        <Form.Label>Material Links</Form.Label>
                        <Form.Control defaultValue={course.links.join(',')} onChange={(e) => {
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
