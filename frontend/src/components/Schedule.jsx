import React from 'react'
import Block from './Block'
import { days, renderDays, timings } from './formats'
import { colors } from './styles'

export default function Schedule({ courses, slots }) {
   return (
      <div className='schedule-wrapper'
         style={{
            // overflowX: "scroll",
            width: "inherit"
         }}
      >
         <div className='d-flex'>
            <div className='p-1'><div className='text-center h6' style={{ width: 80, height: 30 }}>Schedule</div></div>
            {
               timings.map((slot, i) => <div key={i} className='p-1'>
                  <div className='text-center'
                     style={{ width: 80, fontSize: 13, fontWeight: "bold" }}>{slot}
                  </div>
               </div>)
            }
         </div>

         {
            days.map((day, i) => <div key={i} >
               <div className='d-flex'>
                  <div className='p-1 d-flex align-items-center'>
                     <div className='text-center '
                        style={{ width: 80, fontSize: 13, fontWeight: "bold" }}>{renderDays[i]}
                     </div>
                  </div>
                  {
                     timings.map((time, i) => <div key={i} className='p-1'><Block
                        courses={courses}
                        slot={slots.filter(s => s.startTime.toString() === time.split(' ')[0] && s.day === day)}
                        day={day}
                        time={time}
                     />
                     </div>)
                  }
               </div>
            </div>
            )
         }
         <div className='d-flex align-items-center justify-content-center' style={{
            height: 40
         }}>
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
      </div>
   )
}
