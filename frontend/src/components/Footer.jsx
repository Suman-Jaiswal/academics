import React from 'react'

export default function Footer() {
    return (
        <div className='px-4 d-flex justify-content-between py-3 w-100 bg-dark' style={{ fontSize: 12, position: 'fixed', bottom: 0, zIndex: 1 }}>
            <span className='p' style={{ fontSize: 10 }} >Developed by: Suman Jaiswal</span>
            <span className='p' style={{ fontSize: 10 }}>Academics IITI &copy; 2022</span>
        </div>
    )
}
