import React, { useEffect, useState } from 'react'
import AddSlot from './AddSlot'
import DeleteSlot from './DeleteSlot'
import { colors } from './styles'

export default function Block({ slot, courses, time, day }) {

   const [show, setShow] = useState(false)
   const [course, setCourse] = useState({
      code: "",
      _id: ""
   })

   useEffect(() => {
      if (slot[0])
         setCourse(courses.filter(x => x.id === slot[0].courseId)[0])

   }, [slot, courses])

   return (<>
      {
         slot.length > 0 ? <div className='block px-1 rounded'
            onMouseOver={() => setShow(true)}
            onMouseOut={() => setShow(false)}
            style={{
               width: 80,
               height: 60,
               backgroundColor: `${slot[0].slotType === 'L' ? colors.lecColor :
                  slot[0].slotType === 'T' ? colors.tutColor :
                     colors.pracColor}`
            }}
         >
            <div className='position-relative h-100 d-flex align-items-center justify-content-center'>
               <div role={'button'} id="edit" className={show ? "opacity-100 p-1" : "opacity-0 p-1"} style={{
                  transition: 'all 0.3s',
                  fontSize: 11,
                  position: 'absolute',
                  right: 0,
                  top: 0,

               }}>
                  <DeleteSlot id={slot[0].id ? slot[0].id : null} />
               </div>
               <div className="p text-center" style={{ fontSize: 14 }}> <b>{course?.code}</b></div>
            </div>

         </div> :
            <AddSlot courses={courses} day={day} time={time} />
      }
   </>

   )
}
