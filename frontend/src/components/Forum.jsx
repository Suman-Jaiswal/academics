import React, { useEffect, useState } from 'react'
import { deleteFeedbackById, fetchFeedback } from '../api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default function Forum() {

    const [feedback, setFeedback] = useState([])

    useEffect(() => {
        fetchFeedback().then(res => setFeedback(res))
    }, [])

    const deleteFeedback = (id) => {
        deleteFeedbackById(id).then(res =>
            setFeedback(feedback.filter(feedback => feedback.id !== id)))
    }

    return (
        <div className='container'>
            <div className="display-6 mt-3">Feedback</div>
            <div className="row mt-4">
                {
                    feedback.map(feedback => (
                        <div className="col-12 my-2 col-md-6">
                            <div className=" bg-dark p-3 pb-2 rounded">
                                <div className="fw-light">{feedback.content}</div>
                                <hr />
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between'

                                }}>
                                    <p className='text-secondary' style={{ fontSize: 12 }}>{feedback?.email}</p>
                                    <FontAwesomeIcon cursor={'pointer'} size='sm' icon={faTrash} className='text-danger' onClick={() => deleteFeedback(feedback.id)} />
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>

        </div>
    )
}
