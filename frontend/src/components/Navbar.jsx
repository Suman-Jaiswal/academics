import React, { useState } from 'react'
import { useEffect } from 'react';
import { Form } from 'react-bootstrap'
import AddBranch from './AddBranch';
import { months } from './formats';
import DeleteBranch from './DeleteBranch';
import { useNavigate, useParams } from 'react-router-dom';

export default function Navbar({ branches, setBranches }) {
   const [dateTime, setDateTime] = useState(null)

   const { branchId } = useParams()

   const navigate = useNavigate()

   useEffect(() => {
      setDateTime(new Date().getDate().toString() + " " + (months[new Date().getMonth()]) + ", " + new Date().getFullYear().toString())
   }, [])

   const selectBranch = (e) => {
      navigate('/' + e.target.value)
   }

   return (
      <>
         <div className="row py-2 bg-dark" >
            <div className='col-md-6 px-4 d-flex justify-content-center justify-content-md-start align-items-center my-1' >
               <img src="icon.png" alt="" style={{ filter: "invert(1)" }} width={40} height={40} />
               <div className="h5 m-0 ms-1">Academics</div>
               <div className='text-secondary ms-2'>({dateTime})</div>
            </div>
            <div className='col-md-6 px-4 mx-auto d-flex justify-content-center justify-content-md-end align-items-center my-2' >
               <div className='me-2 '><AddBranch setBranches={setBranches} /></div>
               {branchId !== '' && <div className='me-2 '><DeleteBranch setBranches={setBranches} /></div>}
               <Form.Select size='sm' style={{ width: 200 }} className='bg-dark' value={branchId} onChange={(e) => selectBranch(e)} aria-label="Default select example">
                  <option value="" >Select Branch</option>
                  {
                     branches.map((b, i) =>
                        <option key={i} value={b.branchId}>{
                           b.name + " - (" +
                           (b.semester === '1' ? "1st)" :
                              b.semester === '2' ? "2nd)" :
                                 b.semester === '3' ? "3rd)" :
                                    b.semester + "th)")

                        } </option>
                     )
                  }
               </Form.Select>
            </div>

         </div>
      </>
   )
}
