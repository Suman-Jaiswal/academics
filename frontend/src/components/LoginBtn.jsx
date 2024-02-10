import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { auth } from '../firebase';
import { MyContext } from '../contexts/MyContext';
import Profile from './Profile';

export default function LoginBtn() {
    const { state } = useContext(MyContext);
    if (state.user) return <Profile />;
    else
        return (
            <Button
                size='sm'
                onClick={() => {
                    // add firebase login code modular
                    signInWithPopup(auth, new GoogleAuthProvider())
                        .then((result) => {
                            const user = result.user;
                            console.log('Logged in successfully', user.displayName);
                        })
                        .catch((error) => {
                            // Handle Errors here.
                            alert(error.message);
                        });
                }}
            >
                Login with insitute id
            </Button>
        );
}
