import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { deleteLinkById } from '../api';
import { MyContext } from '../contexts/MyContext';

export default function DeleteLink({ id }) {
    const [show, setShow] = useState(false);
    const [text, setText] = useState('');
    const { dispatch } = useContext(MyContext);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    };

    const handleSubmit = (e) => {
        setText('Deleting...');
        e.preventDefault();

        deleteLinkById(id)
            .then((res) => {
                setShow(false);
                setText('');
                dispatch({
                    type: 'REMOVE_LINK',
                    payload: id,
                });
            })
            .catch((e) => console.log(e));
    };
    return (
        <>
            <span
                onClick={handleShow}
                role={'button'}
                className='ms-1 p-1'
            >
                <FontAwesomeIcon
                    icon={faTrash}
                    className='text-danger'
                    size='xs'
                />
            </span>
            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Body>Delete Link?</Modal.Body>
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
                        onClick={handleSubmit}
                        disabled={text === 'Deleting...'}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
