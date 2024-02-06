import React, { useContext } from 'react'
import Block from './Block'
import { days, renderDays, timings } from './formats'
import { MyContext } from '../contexts/MyContext'

export default function Schedule() {

   const { state: { slots } } = useContext(MyContext)

   return (
      <div className='schedule-wrapper'
         style={{
            border: "1px solid #444",
            borderRight: 'none'
         }}
      >
         <div className="d-flex">
            <div className='bg-dark' style={{
               width: 81, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid #444',

            }}>
               <Block type='text' text={'Schedule'} />
               {
                  days.map((day, i) => <Block key={day} type='text' text={renderDays[i]} />)
               }
            </div>
            <div style={{ width: 'auto', overflowX: 'auto', display: 'flex' }} >
               {
                  timings.map((time, i) =>
                     <div key={i} style={{ width: 80, display: 'flex', flexDirection: 'column', paddingBottom: 5 }}>
                        <div className="bg-dark">  <Block type={'text'} text={time} /></div>
                        {
                           days.map((day, i) =>
                              <div key={i} ><Block
                                 slot={slots.filter(s => s.start.toString() === time && s.day === day)}
                                 day={day}
                                 time={time}
                              /> </div>
                           )
                        }
                     </div>
                  )
               }
            </div>
         </div>
      </div>
   )
}
