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
            setCourse(courses.filter(x => x._id === slot[0].courseId)[0])

    }, [slot, courses])

    return (<>
        {
            slot.length > 0 ? <div className='block px-1 bg-light rounded'
                onMouseOver={() => setShow(true)}
                onMouseOut={() => setShow(false)}
                style={{
                    width: 80,
                    height: 60,
                    border: `2px solid #${slot[0].slotType === 'L' ? colors.lecColor :
                        slot[0].slotType === 'T' ? colors.tutColor :
                            colors.pracColor}`
                }}
            >
                <div className='top text-end'>
                    <div role={'button'} id="edit" className={show ? "opacity-100 p-1" : "opacity-0 p-1"} style={{
                        transition: 'all 0.3s',
                        fontSize: 11
                    }}>
                        <DeleteSlot id={slot[0]._id ? slot[0]._id : null} />
                    </div>
                </div>
                <div className="mid">
                    <div className="h6 text-center" style={{ fontSize: 13 }}>{slot[0].slotType}: {course?.code}</div>
                </div>
            </div> :
                <AddSlot courses={courses} day={day} time={time} />
        }
    </>

    )
}
