import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { addCourse, addLinks } from '../api';
import { MyContext } from '../contexts/MyContext';

export default function AddCourse() {

    const [show, setShow] = useState(false);
    const [code, setCourseCode] = useState("");
    const [name, setCourseName] = useState("");
    const [ltp, setLTP] = useState("");
    const [text, setText] = useState('');
    const { dispatch } = useContext(MyContext)
    const [links, setLinks] = useState([]);
    const [input, setInput] = useState('')

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
    };

    useEffect(() => {

        const raw = input.split('\n')
        const array = [...raw]
        const rawLinks = []

        for (let i = 0; i < array.length; i++) {
            const obj = { title: array[i].split(',')[0], url: array[i].split(',')[1] }
            rawLinks.push(obj)
        }
        setLinks(rawLinks)

    }, [input])

    const handleSubmit = (e) => {
        setText('Saving...')
        e.preventDefault()
        const doc = {
            code, name, ltp
        }
        addCourse(doc)
            .then(res => {
                setShow(false)
                setText("")
                var raw = [...links];
                for (let i = 0; i < raw.length; i++) {
                    const element = raw[i];
                    element.parentId = res.data._id
                }
                console.log(raw)
                dispatch({ type: "ADD_COURSE", payload: res.data })
                if (input === "") {
                    return
                }
                addLinks(raw)
                    .then(res => {
                        dispatch({ type: "ADD_LINKS", payload: res.data })
                    })
                    .catch(e => console.log(e))
            })
            .catch(e => setText('An error occured!'))
    }

    return (
        <>
            <Button size='sm' variant='outline-primary' onClick={handleShow} >Add Course</Button>
            <Modal show={show} onHide={handleClose}>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label>Course Code</Form.Label>
                        <Form.Control required onChange={(e) => setCourseCode(e.target.value)} type="text" placeholder="e.g. EE 204" />
                        <br />
                        <Form.Label>Course Name</Form.Label>
                        <Form.Control onChange={(e) => setCourseName(e.target.value)} type="text" placeholder="e.g. Analog Circuits" />
                        <br />
                        <Form.Label>L-T-P</Form.Label>
                        <Form.Control onChange={(e) => setLTP(e.target.value)} type="text" placeholder="e.g. 3-1-0" />
                        <br />
                        <Form.Label>Material Links</Form.Label>
                        <Form.Control className='mb-4' as='textarea' rows={8} onChange={(e) => setInput(e.target.value)}
                            placeholder={'Add links in each line \n ********example*******\n <Title>,<URL>\n <Title>,<URL>\n <Title>,<URL>\n  ...\n '} />
                        <br />
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
