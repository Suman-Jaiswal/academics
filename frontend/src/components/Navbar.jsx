import React, { useContext } from 'react'
import { useEffect } from 'react';
import { Form } from 'react-bootstrap'
import { MyContext } from '../contexts/MyContext'
import AddBranch from './AddBranch';

export default function Navbar({ branches, setBranchId, branchId }) {

   const { dispatch } = useContext(MyContext)

   useEffect(() => {
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
         <div className="bar d-flex justify-content-between align-items-center py-2 px-3" >
            <div className='d-flex justify-content-start align-items-center' style={{ minWidth: 300 }}>
               <img src="icon.png" alt="" style={{ filter: "invert(1)" }} width={40} height={40} />
               <div className="h5 m-0 ms-1">Academics</div>
            </div>
            <div className='d-flex justify-content-center align-items-center' style={{ minWidth: 400 }}>
               <div className='me-2 '>  <AddBranch /></div>

               <Form.Select defaultValue={branchId} onChange={(e) => selectBranch(e)} aria-label="Default select example">
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
         <hr className='m-0 mb-1' />
      </>
   )
}
