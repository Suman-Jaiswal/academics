import React from 'react'
import Block from './Block'
import { days, renderDays, timings } from './formats'

export default function Schedule({ courses, slots }) {
   return (
      <div className='schedule-wrapper px-2 py-3'
         style={{
            border: "1px solid #333",
            borderRadius: 10,
            overflowX: "auto",
         }}
      >
         <div className='d-flex'>
            <div className='p-1'><div className='text-center h6' style={{ width: 80, height: 30 }}>Schedule</div></div>
            {
               timings.map((slot, i) => <div key={i} className='p-1'>
                  <div className='text-center'
                     style={{ width: 80, fontSize: 12 }}>{slot}
                  </div>
               </div>)
            }
         </div>

         {
            days.map((day, i) => <div key={i} >
               <div className='d-flex'>
                  <div className='p-1 d-flex align-items-center'>
                     <div className='text-center '
                        style={{ width: 80, fontSize: 12 }}>{renderDays[i]}
                     </div>
                  </div>
                  {
                     timings.map((time, i) => <div key={i} className='p-1'><Block
                        courses={courses}
                        slot={slots.filter(s => s.startTime.toString() === time && s.day === day)}
                        day={day}
                        time={time}
                     />
                     </div>)
                  }
               </div>
            </div>
            )
         }

      </div>
   )
}
