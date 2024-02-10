import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { deleteBranch, fetchBranches } from '../api';
import { useNavigate, useParams } from 'react-router-dom';

export default function DeleteBranch({ setBranches }) {
    const [show, setShow] = useState(false);
    const [text, setText] = useState('');
    const [input, setInput] = useState('');
    const { branchId } = useParams();

    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    };

    const handleSubmit = async (e) => {
        if (input !== 'Skj@admin') {
            setText('Wrong Passkey!');
            return;
        }
        setText('Deleting...');
        e.preventDefault();

        deleteBranch(branchId)
            .then((res) => {
                console.log('branch deleted');
                setShow(false);
                setText('');
                fetchBranches()
                    .then((res) => {
                        setBranches(res);
                        navigate('/');
                    })
                    .catch((e) => setText('An error occured!'));
            })
            .catch((e) => setText('An error occured!'));
    };
    return (
        <>
            <Button
                size='sm'
                variant='danger'
                onClick={handleShow}
                role={'button'}
                className='px-2'
            >
                <FontAwesomeIcon icon={faTrash} />
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Body className='text-danger'>
                    Delete Branch ({branchId}
                    )? This action cannot be undone.
                    <div className='mt-3'>
                        <input
                            style={styles.input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={'Enter Admin Passkey!'}
                        />
                    </div>
                </Modal.Body>
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

const styles = {
    input: {
        fontSize: 14,
        width: '100%',
        backgroundColor: 'transparent',
        border: '1px solid #444',
        borderRadius: 5,
        padding: '5px 10px',
        outline: 'none',
        caretColor: '#fff',
        color: '#fff',
    },
};
