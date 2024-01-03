import React, { useEffect, useState } from 'react'
import AddSlot from './AddSlot'
import DeleteSlot from './DeleteSlot'
import { colors } from './styles'

export default function Block({ slot, courses, time, day, type, text }) {

   const [show, setShow] = useState(false)
   const [course, setCourse] = useState({
      code: "",
      id: ""
   })

   useEffect(() => {
      if (slot && slot[0])
         setCourse(courses.filter(x => x.id === slot[0].courseId)[0])

   }, [slot, courses])

   if (type === 'text') return <div className='d-flex justify-content-center align-items-center' style={{
      width: 80,
      height: 60,
      fontSize: 12,
   }}>{text}
   </div>

   return (
      <>
         <div className='block rounded'
            style={{
               width: 80,
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
                     <div className="p text-center" style={{ fontSize: 14 }}> <b>{course?.code}</b></div>
                  </div>
                  :
                  <AddSlot courses={courses} day={day} time={time} />
            }  </div>
      </>

   )
}
