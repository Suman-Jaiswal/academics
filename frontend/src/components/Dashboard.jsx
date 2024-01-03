import React, { useContext, useEffect } from 'react'
import { fetchCourses, fetchLinks, fetchSlots } from '../api'
import { MyContext } from '../contexts/MyContext'
import "../App.css"
import Schedule from './Schedule'
import Courses from './Courses'
import OtherLinks from './OtherLinks'
import { colors } from './styles'

export default function Dashboard({ branchId }) {

   const { state, dispatch } = useContext(MyContext)
   const { courses, slots, links, branch } = state


   useEffect(() => {
      fetchCourses(branchId).then(res => dispatch({ type: "FETCH_COURSES", payload: res }))
      fetchSlots(branchId).then(res => dispatch({ type: "FETCH_SLOTS", payload: res }))
      fetchLinks(branchId).then(res => dispatch({ type: "FETCH_LINKS", payload: res }))
   }, [dispatch, branch, branchId])


   return (
      <>
         <div className='row'>
            <div className="col-12 col-md-8 p-3 ps-4" >
               <Schedule courses={courses} slots={slots} />
            </div>

            <div className="col-12 col-md-4 p-3 ps-4 ps-md-0">
               <Courses courses={courses} links={links} />
            </div>
         </div>
         <div className='d-flex align-items-center justify-content-start ps-2 mb-3' >
            <div className="mx-3 d-flex align-items-center">
               <div style={{
                  width: 10, height: 10, backgroundColor: colors.lecColor,
               }} ></div>
               <div className="ms-1" style={{ fontSize: 12 }}>Lectures</div>
            </div>
            <div className="mx-3 d-flex align-items-center">
               <div style={{
                  width: 10, height: 10, backgroundColor: colors.tutColor,
               }} ></div>
               <div className="ms-1" style={{ fontSize: 12 }}>Tutorials</div>
            </div>
            <div className="mx-3 d-flex align-items-center">
               <div style={{
                  width: 10, height: 10, backgroundColor: colors.pracColor,
               }} ></div>
               <div className="ms-1" style={{ fontSize: 12 }}>Practicals</div>
            </div>
         </div>
         <OtherLinks links={links} />
      </>
   )
}
