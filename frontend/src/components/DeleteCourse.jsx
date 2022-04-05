import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { deleteCourseById, deleteSlotsByCourseId } from '../api';
import { MyContext } from '../contexts/MyContext';

export default function DeleteCourse({ id }) {

    const [show, setShow] = useState(false);
    const [text, setText] = useState('');
    const { dispatch } = useContext(MyContext)

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
    };

    const handleSubmit = (e) => {
        setText('Deleting...')
        e.preventDefault()

        deleteCourseById(id)
            .then(res => {
                deleteSlotsByCourseId(id)
                    .then(res => {
                        setShow(false)
                        setText("")
                        dispatch({ type: "DELETE_COURSE", payload: id })
                    })
                    .catch(e => setText('An error occured!'))
            })
            .catch(e => setText('An error occured!'))
    }
    return (
        <>
            <span onClick={handleShow} role={'button'} className="ms-1 p-1">
                <FontAwesomeIcon icon={faTrash} className='text-danger' size='xs' />
            </span>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    Delete Course?
                </Modal.Body>
                <Modal.Footer>
                    <div className={text === "An error occured!" ? "text-danger" : null} >{text}</div>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleSubmit}>
                        Delete
                    </Button>
                </Modal.Footer>


            </Modal>
        </>

    )
}
