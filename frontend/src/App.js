import { faCaretDown, faCaretUp, faExternalLink, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { deleteLinkById, fetchCourses, fetchLinks, fetchSlots } from './api'
import AddCourse from './components/AddCourse'
import AddLinks from './components/AddLinks'
import Block from './components/Block'
import DeleteCourse from './components/DeleteCourse'
import EditCourse from './components/EditCourse'
import { days, timings } from './components/formats'
import { MyContext } from './contexts/MyContext'

const App = () => {

    const [show, setShow] = useState([])
    const { state, dispatch } = useContext(MyContext)
    const { courses, slots, links } = state

    useEffect(() => {
        fetchCourses().then(res => dispatch({ type: "FETCH_COURSES", payload: res.data }))
        fetchSlots().then(res => dispatch({ type: "FETCH_SLOTS", payload: res.data }))
        fetchLinks().then(res => dispatch({ type: "FETCH_LINKS", payload: res.data }))
    }, [dispatch])

    const handleClick = (code) => {
        if (show.includes(code)) {
            const filtered = show.filter(x => x !== code);
            setShow(filtered)
        }
        else {
            const arr = [...show, code];
            setShow(arr)
        }

    }

    return (<>
        <div className='d-flex mt-3'>

            <div className="" style={{

            }}>
                <div className='d-flex'>
                    <div className='p-1'><div className='text-center h5' style={{ width: 100 }}>Schedule</div></div>
                    {
                        timings.map((slot, i) => <div key={i} className='p-1'><div className='text-center' style={{ width: 100 }}>{slot}</div></div>)
                    }
                </div>

                {
                    days.map((day, i) => <div key={i} >
                        <div className='d-flex'>
                            <div className='p-1'><div className='text-center' style={{ width: 100 }}>{day}</div></div>
                            {
                                timings.map((time, i) => <div key={i} className='p-1'><Block
                                    courses={courses}
                                    slot={slots.filter(s => s.startTime === time && s.day === day)}
                                    day={day}
                                    time={time}
                                />
                                </div>)
                            }
                        </div>
                    </div>
                    )
                }
                <div className='mt-5 w-100 bg-light'>
                    <div className="h5 p-2">Other Links <Button size='sm' variant='light'> <AddLinks parentId="universal" /></Button></div>

                    <ul className='row'>
                        {
                            links.filter(l => l.parentId === "universal").length > 0 ? links.filter(l => l.parentId === "universal").map(link =>
                                <li style={{
                                    fontSize: 13
                                }} key={link._id} className='col-6 my-1 d-flex justify-content-between links-li'>
                                    <a href={link.url} rel="noreferrer" target="_blank">{link.title}<FontAwesomeIcon icon={faExternalLink} className='ms-2' /></a>
                                    <span className='p-1'>
                                        <FontAwesomeIcon size='xs' role={'button'} onClick={() => {
                                            deleteLinkById(link._id)
                                                .then(res => dispatch({ type: "REMOVE_LINK", payload: link._id }))
                                        }} className='p-0 me-3 text-danger' icon={faTrash} />
                                    </span>
                                </li>
                            ) : <div className="text-secondary text-center mb-3">No Links!</div>
                        }
                    </ul>
                </div>
            </div>
            <div className='' style={{
                width: 530
            }}>
                <div className="header d-flex justify-content-between">
                    <div className="h5 text-center">Courses </div>
                    <AddCourse />
                </div>

                <ul style={{
                    width: 520
                }}>
                    {
                        courses.length > 1 ? courses.map((c, i) => c.code !== "" && <div key={i}><li role={'button'} className='text-dark bg-light mt-2 py-1 px-3' onClick={() => handleClick(c.code)}>
                            <div className="d-inline">{c.code} ({c.name})</div>
                            <FontAwesomeIcon className='float-end' role={'button'} icon={show.includes(c.code) ? faCaretUp : faCaretDown} />
                        </li>

                            <div className={`${show.includes(c.code) ? "d-block" : "d-none"} bg-light border-top`}>
                                <ul className='py-2'>
                                    <li style={{
                                        fontSize: 13
                                    }}>
                                        <span className="p"> {c.name}</span>
                                        <span><EditCourse course={c} /></span>
                                        <span><DeleteCourse id={c._id} /></span>


                                        <div className="p text-secondary">L-T-P: {c.ltp}</div>
                                        <div className="p text-secondary">Useful Links <AddLinks parentId={c._id} /></div>
                                        {
                                            links.filter(link => link.parentId === c._id).length > 0 ? links.filter(link => link.parentId === c._id).map(l =>
                                                <li key={l._id} className='my-1 d-flex justify-content-between links-li '>
                                                    <a href={l.url} rel="noreferrer" target="_blank">{l.title}<FontAwesomeIcon icon={faExternalLink} className='ms-2' /></a>
                                                    <span className='p-1'>
                                                        <FontAwesomeIcon role={'button'} onClick={() => {
                                                            deleteLinkById(l._id)
                                                                .then(res => dispatch({ type: "REMOVE_LINK", payload: l._id }))
                                                        }} className='p-0 me-3 text-danger' icon={faTrash} />
                                                    </span>
                                                </li>
                                            ) : <div className="text-secondary text-center mb-3">No Links!</div>
                                        }

                                    </li>
                                </ul>
                            </div>
                        </div>
                        ) : <div className='text-secondary text-center'>No Courses!</div>
                    }
                </ul>
            </div>

        </div>
        <br />
        <div className="container text-center">
            Developed by Suman Jaiswal &copy; 2022

        </div>
        <br />
    </>

    )
}

export default App

