import React from 'react'
import Feedback from './Feedback'

export default function Footer() {
    return (
        <div className='px-3 d-flex justify-content-between align-items-center py-1 w-100 bg-dark text-secondary'
            style={{ fontSize: 12, position: 'fixed', bottom: 0, zIndex: 1 }}>
            <span className='p' style={{ fontSize: 10 }} >Developed by: Suman Jaiswal</span>
            <span className='p' style={{ fontSize: 10 }}>Academics IITI &copy; 2022</span>
            <Feedback />
        </div>
    )
}
