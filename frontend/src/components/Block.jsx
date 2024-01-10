import React, { useContext, useEffect, useState } from 'react'
import AddSlot from './AddSlot'
import DeleteSlot from './DeleteSlot'
import { colors } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDotCircle } from '@fortawesome/free-solid-svg-icons'
import { renderDays } from './formats'
import { MyContext } from '../contexts/MyContext'

export default function Block({ slot, time, day, type, text }) {

   const [show, setShow] = useState(false)
   const [currentDay, setDay] = useState(null)

   const { state } = useContext(MyContext)
   const { courses } = state

   const [course, setCourse] = useState({
      code: "",
      id: ""
   })

   useEffect(() => {
      if (slot && slot[0])
         setCourse(courses.filter(x => x.id === slot[0].courseId)[0])

      const date = new Date()
      setDay(date.getDay())
   }, [slot, courses])

   if (type === 'text') return <div className='d-flex justify-content-center align-items-center' style={{
      width: 80,
      height: 60,
      fontSize: 12,
   }}>
      {renderDays[currentDay - 1] === text && currentDay < 7 &&
         <FontAwesomeIcon className='me-2 text-primary' icon={faDotCircle} />}
      {text}
   </div>

   return (
      <>
         <div className='block rounded'
            style={{
               width: slot[0]?.slotType === 'P' ? parseInt(course?.ltp?.substring(4, 5)) * 80 || 80 : 80,
               height: 60,
               paddingTop: 5,
               paddingLeft: 5,
            }}
         >{
               slot.length > 0 ?

                  <div className='position-relative rounded h-100 d-flex align-items-center justify-content-center'
                     style={{
                        backgroundColor: `${slot[0].slotType === 'L' ? colors.lecColor :
                           slot[0].slotType === 'T' ? colors.tutColor :
                              colors.pracColor}`,
                     }}
                     onMouseOver={() => setShow(true)}
                     onMouseOut={() => setShow(false)}
                  >
                     <div role={'button'} className={show ? "opacity-100 p-1" : "opacity-0 p-1"}
                        style={{
                           transition: 'all 0.3s',
                           fontSize: 11,
                           position: 'absolute',
                           right: 2,
                           top: 0,

                        }}>
                        <DeleteSlot id={slot[0].id ? slot[0].id : null} />
                     </div>
                     <div className="p text-center" style={{ fontSize: 12 }}> <b>{course?.code}</b></div>
                  </div>
                  :
                  <AddSlot courses={courses} day={day} time={time} />
            }  </div>
      </>

   )
}
