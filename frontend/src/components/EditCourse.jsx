import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { editCourse } from '../api';
import { MyContext } from '../contexts/MyContext';
import Popup from './Popup';

export default function EditCourse({ course }) {

    console.log(course);

    const [show, setShow] = useState(false);
    const [code, setCourseCode] = useState(course.code);
    const [name, setCourseName] = useState(course.name);
    const [ltp, setLTP] = useState(course.ltp);
    const [details, setDetails] = useState(course.details);
    const [prof, setProf] = useState(course.prof);
    const [text, setText] = useState('');
    const { dispatch } = useContext(MyContext)

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
    };

    const handleSubmit = (e) => {
        setText('Saving...')
        e.preventDefault()
        if (code === "" || name === "") {
            setText('Course Code and Name are required!')
            return
        }
        const doc = {
            ...course, code, name, ltp, prof, details,
        }
        editCourse(course.id, doc)
            .then(res => {
                setShow(false)
                dispatch({ type: "EDIT_COURSE", payload: { id: course.id, data: { ...res } } })
                setText("")
            })
            .catch(e => setText('An error occured!' + e))

    }

    return (
        <>
            <span onClick={handleShow} role={'button'} className="ms-1 p-1"><FontAwesomeIcon size='xs' icon={faPen} /></span>
            <Popup type={'form'} show={show} handleClose={handleClose} handleSubmit={handleSubmit}
                data={[
                    { label: 'Course Code', defaultValue: code, setter: setCourseCode, type: 'text', placeholder: 'e.g. EE 204', span: 6, required: true },
                    { label: 'Course Name', defaultValue: name, setter: setCourseName, type: 'text', placeholder: 'e.g. Analog Circuits', span: 6, required: true },
                    { label: 'L-T-P-C', defaultValue: ltp, setter: setLTP, type: 'text', placeholder: 'e.g. 3-1-0-3', span: 6, required: false },
                    { label: 'Professor', defaultValue: prof, setter: setProf, type: 'text', placeholder: 'Enter professor name...', span: 6, required: false },
                    { label: 'Details', defaultValue: details, setter: setDetails, type: 'text', placeholder: 'Enter Details of Marking scheme etc.', span: 12, required: false }
                ]}
                errorText={text === "Saving..." || text === '' ? "" : text}
                progressText={text === "Saving..." ? text : ''}
                buttonText={'Save'} />
        </>
    )
}
