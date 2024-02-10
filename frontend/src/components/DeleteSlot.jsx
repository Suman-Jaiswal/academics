import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { deleteSlotById } from '../api';
import { MyContext } from '../contexts/MyContext';

export default function DeleteSlot({ id }) {
    const [show, setShow] = useState(false);
    const [text, setText] = useState('');
    const { dispatch } = useContext(MyContext);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    };

    const handleSubmit = (id) => {
        setText('Deleting...');
        if (!id) {
            setText("Couldn't be deleted");
            return;
        } else {
            deleteSlotById(id)
                .then((res) => {
                    setShow(false);
                    setText('');
                    dispatch({
                        type: 'DELETE_SLOT',
                        payload: id,
                    });
                })
                .catch((e) => setText('An error occured!'));
        }
    };
    return (
        <>
            <FontAwesomeIcon
                onClick={handleShow}
                size='xs'
                icon={faTrash}
            />
            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Body>Delete Slot?</Modal.Body>
                <Modal.Footer>
                    <div className={text === 'An error occured!' ? 'text-danger' : null}>{text}</div>
                    <Button
                        size='sm'
                        variant='secondary'
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                    <Button
                        size='sm'
                        variant='danger'
                        onClick={() => handleSubmit(id)}
                        disabled={text === 'Deleting...'}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
