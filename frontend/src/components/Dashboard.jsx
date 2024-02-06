import React, { useContext, useEffect } from 'react'
import { fetchCourses, fetchSlots } from '../api'
import { MyContext } from '../contexts/MyContext'
import "../App.css"
import Schedule from './Schedule'
import Courses from './Courses'
import OtherLinks from './OtherLinks'
import { colors } from './styles'

export default function Dashboard() {

   const { state, dispatch } = useContext(MyContext)
   const { links, user } = state

   useEffect(() => {
      fetchCourses().then(res => {
         dispatch({ type: "SET_COURSES", payload: res })
      }).catch(e => console.log(e))

      fetchSlots(user?.registeredCourses)
         .then(res => {
            console.log(res)
            dispatch({ type: "SET_SLOTS", payload: res })
         }).catch(e => console.log(e))
   }, [dispatch, user.registeredCourses])


   return (
      <>
         <div className='row m-0'>
            <div className="col-12 col-md-9 p-0" >
               <Schedule />
               <div className='d-flex align-items-center justify-content-start ps-1 my-3' >
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
            </div>

            <div className="col-12 col-md-3 p-0">
               <Courses links={links} />
            </div>
         </div>

      </>
   )
}
