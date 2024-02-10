import React, { useState } from 'react';
import { useEffect } from 'react';
import { months } from './formats';
import LoginBtn from './LoginBtn';
import { version } from '../constants';

export default function Navbar() {
    const [dateTime, setDateTime] = useState(null);

    useEffect(() => {
        setDateTime(
            new Date().getDate().toString() +
                ' ' +
                months[new Date().getMonth()] +
                ', ' +
                new Date().getFullYear().toString()
        );
    }, []);

    return (
        <>
            <div className='row m-0 py-2 bg-dark'>
                <div className='col-10 px-2 d-flex justify-content-start  align-items-center my-1'>
                    <img
                        src='icon.png'
                        alt=''
                        style={{
                            filter: 'invert(1)',
                        }}
                        height={40}
                    />
                    <div className='h5 m-0 ms-1'>
                        Academics <span className='small fw-light'>{version}</span>
                    </div>
                    <div className='text-secondary ms-2'>({dateTime})</div>
                </div>
                <div className='col-2 px-4 d-flex justify-content-center justify-content-md-end align-items-center my-1'>
                    <LoginBtn />
                </div>
            </div>
        </>
    );
}
