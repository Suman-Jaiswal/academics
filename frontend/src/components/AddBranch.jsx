import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { addBranch, fetchBranches } from '../api';
import { useNavigate } from 'react-router-dom';

export default function AddBranch({ setBranches }) {

   const navigate = useNavigate()

   const programs = [
      "BTech",
      "MTech",
      "PhD",
      "MSc",
      "MS",
   ]

   const [show, setShow] = useState(false);
   const [name, setName] = useState("");
   const [program, setProgram] = useState("BTech");
   const [semester, setSemester] = useState(null);
   const [text, setText] = useState("");

   const handleClose = () => setShow(false);
   const handleShow = () => {
      setShow(true)
   };

   const handleSubmit = (e) => {
      setText('Saving...')
      e.preventDefault()
      let branchId = program.toLowerCase();
      branchId += '-';
      let nam = name.toLowerCase().split(' ').join('-');
      branchId += nam + "-"
      branchId += semester;
      const doc = {
         branchId, name, program, semester
      }
      addBranch(doc)
         .then(res => {
            setShow(false)
            setText("")
            fetchBranches().then((res) => {
               setBranches(res);
               navigate('/' + branchId)
               localStorage.setItem('branchId', branchId)
            }).catch(e => setText('An error occured!'))
         })
         .catch(e => setText('An error occured!'))
   }

   return (
      <>
         <Button size='sm' style={{ width: 100 }} variant='primary' onClick={handleShow}  >Add Branch</Button>
         <Modal centered show={show} onHide={handleClose}>
            <Form>
               <Modal.Header closeButton>
                  <Modal.Title style={{ fontSize: 16 }}>Add Branch</Modal.Title>
               </Modal.Header>
               <Modal.Body style={{ fontSize: 14 }}>

                  <Form.Label>Branch</Form.Label>
                  <Form.Control style={{ fontSize: 14 }} required onChange={(e) => setName(e.target.value)} type="text" placeholder="e.g. Electrical Engineering" />
                  <br />

                  <Form.Label>Semester</Form.Label>
                  <Form.Control style={{ fontSize: 14 }} required onChange={(e) => setSemester(e.target.value)} type="number" placeholder="Enter Semester number" />
                  <br />

                  <Form.Label>Program</Form.Label>
                  <Form.Select style={{ fontSize: 14 }} onChange={(e) => setProgram(e.target.value)} aria-label="Default select example">
                     {
                        programs.map((p, i) =>
                           <option style={{ fontSize: 14 }} key={i} value={p}>{p}</option>
                        )
                     }
                  </Form.Select>
                  <br />

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
