import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Popup from './Popup';
import { sendFeedback } from '../api';

const Feedback = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [text, setText] = useState('');
    const [email, setEmail] = useState('');
    const [content, setContent] = useState('');

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setText('Sending...');
        sendFeedback({
            email,
            content,
        })
            .then((res) => {
                setText('');
                setIsModalOpen(false);
            })
            .catch((e) => {
                setText('An error occured!');
            });
    };

    return (
        <div>
            <button
                className='btn btn-dark text-secondary'
                onClick={handleOpenModal}
                style={{
                    fontSize: 10,
                    borderTopRightRadius: 0,
                    textDecoration: 'underline',
                }}
            >
                <FontAwesomeIcon
                    className='me-1'
                    icon={faEnvelope}
                />{' '}
                Give Feedback
            </button>
            <Popup
                handleClose={handleCloseModal}
                show={isModalOpen}
                type='form'
                data={[
                    {
                        label: 'Email',
                        type: 'email',
                        required: true,
                        placeholder: 'Enter your email',
                        span: 12,
                        setter: setEmail,
                    },
                    {
                        label: 'Feedback',
                        type: 'textarea',
                        required: true,
                        placeholder: 'Enter your feedback here',
                        span: 12,
                        setter: setContent,
                    },
                ]}
                errorText={text === 'An error occured!' ? text : ''}
                progressText={text === 'Sending...' ? text : ''}
                buttonText='Send'
                handleSubmit={handleSubmit}
            ></Popup>
        </div>
    );
};

export default Feedback;
