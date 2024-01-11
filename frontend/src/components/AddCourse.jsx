import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { addCourse, addLinks } from '../api';
import { MyContext } from '../contexts/MyContext';
import Popup from './Popup';
import { useParams } from 'react-router-dom';

export default function AddCourse() {

   const [show, setShow] = useState(false);
   const [code, setCourseCode] = useState("");
   const [name, setCourseName] = useState("");
   const [ltp, setLTP] = useState("");
   const [prof, setProf] = useState("");
   const [details, setDetails] = useState("");
   const [text, setText] = useState('');
   const { dispatch } = useContext(MyContext)
   const [links, setLinks] = useState([]);
   const [input, setInput] = useState('')

   const { branchId } = useParams()

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
         code, name, ltp, prof, details, branchId
      }
      addCourse(doc)
         .then(res => {
            setShow(false)
            setText("")
            var raw = [...links];
            for (let i = 0; i < raw.length; i++) {
               const element = raw[i];
               element.parentId = res.id
            }
            dispatch({ type: "ADD_COURSE", payload: res })
            if (input === "") {
               return
            }
            addLinks(raw)
               .then(res => {
                  dispatch({ type: "ADD_LINKS", payload: res })
               })
               .catch(e => console.log(e))
         })
         .catch(e => setText('An error occured!'))
   }

   return (
      <>
         <Button size='sm' style={{ fontSize: 12 }} variant='primary' onClick={handleShow} >Add Course</Button>
         <Popup type={'form'} show={show} handleClose={handleClose} handleSubmit={handleSubmit} data={[
            { label: 'Course Code', setter: setCourseCode, type: 'text', placeholder: 'e.g. EE 204', span: 6, required: true },
            { label: 'Course Name', setter: setCourseName, type: 'text', placeholder: 'e.g. Analog Circuits', span: 6, required: true },
            { label: 'L-T-P-C', setter: setLTP, type: 'text', placeholder: 'e.g. 3-1-0-3', span: 6, required: false },
            { label: 'Professor', setter: setProf, type: 'text', placeholder: 'Enter professor name...', span: 6, required: false },
            { label: 'Details', setter: setDetails, type: 'text', placeholder: 'Enter Details of Marking scheme etc.', span: 12, required: false },
            { label: 'Material Links', setter: setInput, type: 'textarea', placeholder: 'Add links in each line as follows: \n <Title>,<URL>\n <Title>,<URL>\n <Title>,<URL>\n  ...\n ', span: 12, required: false },
         ]} errorText={text === "Saving..." || text === '' ? "" : text} progressText={text === "Saving..." ? text : ''} buttonText={'Save'} />
      </>
   )
}
