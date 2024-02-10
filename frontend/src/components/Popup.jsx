import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export default function Popup({ handleClose, show, type, data, errorText, progressText, buttonText, handleSubmit }) {
    return (
        <Modal
            centered
            show={show}
            onHide={handleClose}
        >
            <form>
                <Modal.Header
                    style={{
                        borderBottom: '2px solid #444',
                    }}
                    closeButton
                >
                    <Modal.Title
                        style={{
                            fontSize: 16,
                        }}
                    >
                        Add Course
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body
                    style={{
                        fontSize: 14,
                    }}
                >
                    {type === 'form' ? (
                        <div className='row'>
                            {data?.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={`col-md-${item.span}`}
                                    >
                                        <Form.Label>
                                            {item.label} {item.required && '*'}
                                        </Form.Label>

                                        {item.type === 'textarea' ? (
                                            <textarea
                                                style={styles.input}
                                                required={item.required}
                                                onChange={(e) => item.setter(e.target.value)}
                                                as={item.type}
                                                rows={6}
                                                placeholder={item.placeholder}
                                            />
                                        ) : (
                                            <>
                                                <div>
                                                    <input
                                                        style={styles.input}
                                                        defaultValue={item.defaultValue}
                                                        required={item.required}
                                                        onChange={(e) => item.setter(e.target.value)}
                                                        type={item.type}
                                                        placeholder={item.placeholder}
                                                    />
                                                </div>
                                                <br />
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : type === 'text' ? (
                        <div
                            style={{
                                fontSize: 14,
                            }}
                        >
                            {data}
                        </div>
                    ) : null}
                </Modal.Body>
                <Modal.Footer
                    style={{
                        borderTop: '2px solid #444',
                    }}
                >
                    <div className={'text-danger'}>{errorText}</div>
                    <Button
                        size='sm'
                        variant='secondary'
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                    <button
                        className='btn btn-sm btn-primary'
                        type='submit'
                        onClick={handleSubmit}
                        disabled={progressText !== ''}
                    >
                        {progressText !== '' ? progressText : buttonText}
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
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
