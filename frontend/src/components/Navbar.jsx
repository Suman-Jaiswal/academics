import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { Form } from 'react-bootstrap'
import { MyContext } from '../contexts/MyContext'
import AddBranch from './AddBranch';
import { months } from './formats';

export default function Navbar({ branches, setBranchId, branchId }) {

   const { dispatch } = useContext(MyContext)
   const [dateTime, setDateTime] = useState(null)

   useEffect(() => {

      setDateTime(new Date().getDate().toString() + " " + (months[new Date().getMonth()]) + ", " + new Date().getFullYear().toString())

      const id = localStorage.getItem('branchId');
      if (!id) return
      if (id.length > 0) {
         setBranchId(id);
         const b = branches.filter(b => b.branchId === branchId)[0]
         if (!b) dispatch({
            type: "SET_BRANCH", payload: {
               branchId: "",
               name: "",
               program: ""
            }
         })
         else
            dispatch({ type: "SET_BRANCH", payload: b })
      }
      else {
         dispatch({
            type: "SET_BRANCH", payload: {
               branchId: "",
               name: "",
               program: ""
            }
         })
      }
   }, [branches, dispatch, branchId, setBranchId])

   const selectBranch = (e) => {
      setBranchId(e.target.value)
      localStorage.setItem('branchId', e.target.value)
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
               <div className='me-2 '>  <AddBranch /></div>
               <Form.Select size='sm' style={{ width: 200 }} className='bg-dark' defaultValue={branchId} onChange={(e) => selectBranch(e)} aria-label="Default select example">
                  <option value="" >Select Branch</option>
                  {
                     branches.map((b, i) =>
                        <option selected={b.branchId === branchId} key={i} value={b.branchId}>{
                           b.name + " - (" +
                           (b.semester === 1 ? "1st)" :
                              b.semester === 2 ? "2nd)" :
                                 b.semester === 3 ? "3rd)" :
                                    b.semester + "th)")

                        }</option>
                     )
                  }
               </Form.Select>
            </div>

         </div>
      </>
   )
}
