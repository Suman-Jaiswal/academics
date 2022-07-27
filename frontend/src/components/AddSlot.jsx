import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { addSlot } from '../api';
import { MyContext } from '../contexts/MyContext';

export default function AddSlot({ day, time, courses }) {

    const { dispatch } = useContext(MyContext)
    const [show, setShow] = useState(false);
    const [text, setText] = useState('');
    const [courseId, setCourseId] = useState('');
    const [slotType, setType] = useState('L');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        setText('Saving...')
        e.preventDefault()
        if (courseId === '') {
            setText('Please select course!')
            return
        }

        const doc = {
            courseId, day, startTime: time, slotType
        }
        addSlot(doc)
            .then(res => {
                setShow(false)
                setText("")
                dispatch({ type: "ADD_SLOT", payload: res.data })
            })
            .catch(e => setText('An error occured!'))
    }

    return (<>
        <div className='bg-light d-flex justify-content-center align-items-center' style={{
            width: 80,
            height: 60
        }}><FontAwesomeIcon onClick={handleShow} role={'button'} size='2x' className='text-secondary' icon={faPlus} />

        </div>
        <Modal show={show} onHide={handleClose}>
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title>Add Slot</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>Slot Type</Form.Label>
                    <Form.Select onChange={(e) => setType(e.target.value)} aria-label="Default select example">
                        {
                            ['L', 'T', 'P'].map((t, i) => <option key={i} value={t}>{t}</option>)
                        }
                    </Form.Select>
                    <br />
                    <Form.Label>Select Course</Form.Label>
                    <Form.Select onChange={(e) => setCourseId(e.target.value)} aria-label="Default select example">
                        <option value={''}>...</option>
                        {
                            courses.length > 0 ? courses.map((c, i) => c.code !== "" ? <option key={i} value={c._id}>{c.code}</option> : null) : null
                        }
                    </Form.Select>
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
