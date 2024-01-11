import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { addLinks } from '../api';
import { MyContext } from '../contexts/MyContext';
import { useParams } from 'react-router-dom';

export default function AddLinks({ parentId }) {

    const [links, setLinks] = useState([]);
    const [show, setShow] = useState(false);
    const [text, setText] = useState('');
    const [input, setInput] = useState('')
    const { dispatch } = useContext(MyContext)
    const { branchId } = useParams()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const validateLink = (url) => {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&amp;a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

        return !!pattern.test(url);
    }

    const checkLinks = () => {
        for (let i = 0; i < links.length; i++) {
            const element = links[i];
            if (!validateLink(element.url)) {
                setText('Invalid URL!')
                return false
            }
        }
        return true
    }

    useEffect(() => {

        const raw = input.split('\n')
        const array = [...raw]
        const rawLinks = []

        for (let i = 0; i < array.length; i++) {
            const obj = { parentId, branchId, title: array[i].split(',')[0], url: array[i].split(',')[1] }
            rawLinks.push(obj)
        }
        setLinks(rawLinks)

    }, [input, parentId, branchId])

    const handleSubmit = (e) => {
        setText('Saving...')
        e.preventDefault()
        if (parentId === '') {
            setText('Please select course!')
            return
        }
        checkLinks() &&
            addLinks(links)
                .then(res => {
                    setShow(false)
                    setText("")
                    dispatch({ type: "ADD_LINKS", payload: res })
                })
                .catch(e => setText('An error occured!'))
    }

    return (
        <>
            <span onClick={handleShow} className='bg-primary px-1 rounded ms-1'>
                <FontAwesomeIcon role={'button'} size='xs' className='text-light fw-bold ' icon={faPlus} />
            </span>
            <Modal centered show={show} onHide={handleClose}>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title style={{ fontSize: 16 }}>Add Links</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form.Control style={{ fontSize: 14 }} as='textarea' rows={8} onChange={(e) => setInput(e.target.value)}
                            placeholder={'Add links in each line \n ********example*******\n <Title>,<URL>\n <Title>,<URL>\n <Title>,<URL>\n  ...\n '} />

                    </Modal.Body>
                    <Modal.Footer>
                        <div className={text === "An error occured!" ? "text-danger" : null} >{text}</div>
                        <Button size='sm' variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button size='sm' variant="primary" type='submit' onClick={handleSubmit} disabled={text === "Saving..."}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Form>

            </Modal>
        </>
    )
}
