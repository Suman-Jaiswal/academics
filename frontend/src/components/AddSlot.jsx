import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { addSlot } from '../api';
import { MyContext } from '../contexts/MyContext';
import { Slot } from '../interfaces';

export default function AddSlot({ day, time }) {
    const {
        state: { user },
        dispatch,
    } = useContext(MyContext);
    const [show, setShow] = useState(false);
    const [text, setText] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [slotType, setType] = useState('L');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        setText('Saving...');
        e.preventDefault();
        if (courseCode === '') {
            setText('Please select course!');
            return;
        }

        const doc = new Slot(null, courseCode, day, time, null, slotType, null, null, null).toDoc();

        console.log(doc);

        addSlot(doc)
            .then((res) => {
                setShow(false);
                setText('');
                dispatch({
                    type: 'ADD_SLOT',
                    payload: res,
                });
            })
            .catch((e) => setText('An error occured!'));
    };

    return (
        <>
            <div
                onClick={handleShow}
                className='text-secondary rounded bg-dark w-100 h-100 d-flex align-items-center justify-content-center'
            >
                <FontAwesomeIcon
                    role={'button'}
                    size='lg'
                    icon={faPlus}
                />
            </div>
            <Modal
                centered
                show={show}
                onHide={handleClose}
            >
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title
                            style={{
                                fontSize: 16,
                            }}
                        >
                            Add Slot
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body
                        style={{
                            fontSize: 14,
                        }}
                    >
                        <Form.Label>Slot Type</Form.Label>
                        <Form.Select
                            style={{
                                fontSize: 14,
                            }}
                            onChange={(e) => setType(e.target.value)}
                            aria-label='Default select example'
                        >
                            {[
                                {
                                    value: 'L',
                                    label: 'Lecture',
                                },
                                {
                                    value: 'T',
                                    label: 'Tutorial',
                                },
                                {
                                    value: 'P',
                                    label: 'Practical',
                                },
                            ].map((t, i) => (
                                <option
                                    key={i}
                                    value={t.value}
                                >
                                    {t.label}
                                </option>
                            ))}
                        </Form.Select>
                        <br />
                        <Form.Label>Select Course</Form.Label>
                        <Form.Select
                            style={{
                                fontSize: 14,
                            }}
                            onChange={(e) => setCourseCode(e.target.value)}
                            aria-label='Default select example'
                        >
                            <option value={''}>...</option>
                            {user.registeredCourses.length > 0
                                ? user.registeredCourses.map((code, i) =>
                                      code !== '' ? (
                                          <option
                                              key={i}
                                              value={code}
                                          >
                                              {code}
                                          </option>
                                      ) : null
                                  )
                                : null}
                        </Form.Select>
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
                            variant='primary'
                            type='submit'
                            onClick={handleSubmit}
                            disabled={text === 'Saving...'}
                        >
                            Save
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}
