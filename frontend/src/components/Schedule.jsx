import React from 'react'
import Block from './Block'
import { days, renderDays, timings } from './formats'

export default function Schedule({ courses, slots }) {
    return (
        <div className='schedule-wrapper'
            style={{
                // overflowX: "scroll",
                width: "inherit"
            }}
        >
            <div className='d-flex'>
                <div className='p-1'><div className='text-center h6' style={{ width: 80 }}>Schedule</div></div>
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

        </div>
    )
}
