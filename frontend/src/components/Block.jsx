import React, { useEffect, useState } from 'react'
import AddSlot from './AddSlot'
import DeleteSlot from './DeleteSlot'

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
            slot.length > 0 ? <div className='block px-2 bg-light'
                onMouseOver={() => setShow(true)}
                onMouseOut={() => setShow(false)}
                style={{
                    width: 100,
                    height: 70
                }}
            >
                <div className='top text-end'>
                    <div role={'button'} id="edit" className={show ? "opacity-100 p-1" : "opacity-0 p-1"} style={{
                        transition: 'all 0.3s',
                        fontSize: 13
                    }}>
                        <DeleteSlot id={slot[0]._id ? slot[0]._id : null} />
                    </div>
                </div>
                <div className="mid">
                    <div className="h6 text-center">{slot[0].slotType}: {course?.code}</div>
                </div>
            </div> :
                <AddSlot courses={courses} day={day} time={time} />
        }
    </>

    )
}
