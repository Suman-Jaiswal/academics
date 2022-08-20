import React from 'react'

export default function Navbar() {
    return (
        <>
            <div className="bar d-flex justify-content-between align-items-center py-2 px-4">
                <div className='d-flex justify-content-center align-items-center'>
                    <img src="icon.png" alt="" width={40} height={40} />
                    <div className="h5 m-0 ms-1">Academics</div>
                </div>
                <div className='d-flex justify-content-center align-items-center'>
                    <div className="h6 m-0 ms-1">Electrical Engineering</div>
                </div>

            </div>
            <hr className='m-0 mb-1' />
        </>
    )
}
