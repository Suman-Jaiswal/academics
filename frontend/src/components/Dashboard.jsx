import React, { useContext, useEffect } from 'react'
import { fetchCourses, fetchLinks, fetchSlots } from '../api'
import { MyContext } from '../contexts/MyContext'
import "../App.css"
import Schedule from './Schedule'
import Courses from './Courses'
import OtherLinks from './OtherLinks'

export default function Dashboard({ branchId }) {

   const { state, dispatch } = useContext(MyContext)
   const { courses, slots, links, branch } = state


   useEffect(() => {
      fetchCourses(branchId).then(res => dispatch({ type: "FETCH_COURSES", payload: res.data }))
      fetchSlots(branchId).then(res => dispatch({ type: "FETCH_SLOTS", payload: res.data }))
      fetchLinks(branchId).then(res => dispatch({ type: "FETCH_LINKS", payload: res.data }))
   }, [dispatch, branch, branchId])


   return (
      <>
         <div className='d-flex w-100 dashboard justify-content-between gap-3 px-3 my-4'>

            <div className="left-panel ps-1 p-3 pb-0" style={{
               border: "2px solid #6c757d",
               borderRadius: 5,
               overflowX: "auto",
               minWidth: 450,
            }}>
               <Schedule courses={courses} slots={slots} />
            </div>

            <div className="right-panel p-3"
               style={{
                  minWidth: 430,
                  border: "2px solid #6c757d",
                  borderRadius: 5,
                  overflowY: "scroll",
                  height: 450,

               }}>
               <Courses courses={courses} links={links} />
            </div>

         </div>
         <OtherLinks links={links} />
         <br />
      </>
   )
}
