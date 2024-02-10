import { signOut } from 'firebase/auth';
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { auth } from '../firebase';

export default function Profile() {
    return (
        <Dropdown>
            {/* remove caret icon  */}

            <Dropdown.Toggle
                split={false}
                variant='transparent'
                id='dropdown-basic'
                style={{
                    border: 'none',
                    padding: 0,
                }}
            >
                <img
                    style={{
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        border: '1px solid white',
                    }}
                    src={auth.currentUser.photoURL}
                    alt='img'
                />
            </Dropdown.Toggle>

            <Dropdown.Menu variant='dark'>
                <Dropdown.Header>
                    <div className='text-light'>{auth.currentUser.displayName}</div>
                    <div>{auth.currentUser.email}</div>
                </Dropdown.Header>
                <Dropdown.Divider />
                <Dropdown.Item
                    className='text-danger fw-bold'
                    onClick={() => {
                        signOut(auth)
                            .then(() => {
                                // Sign-out successful.
                                alert('Logged out successfully');
                            })
                            .catch((error) => {
                                alert(error.message);
                            });
                    }}
                >
                    Logout
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
