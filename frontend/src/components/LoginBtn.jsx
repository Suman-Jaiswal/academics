import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { auth } from '../firebase'
import { MyContext } from '../contexts/MyContext'
import { signOut } from 'firebase/auth'

export default function LoginBtn() {
    const { state, } = useContext(MyContext)
    if (state.user)
        return (
            <Button
                size='sm'
                variant='danger'
                onClick={() => {
                    signOut(auth).then(() => {
                        // Sign-out successful.
                        alert("Logged out successfully")
                    }).catch((error) => {
                        alert(error.message)
                    });
                }}
            >Logout</Button>
        )
    else
        return (
            <Button
                size='sm'
                onClick={() => {
                    // add firebase login code modular
                    signInWithPopup(auth, new GoogleAuthProvider()).then((result) => {
                        const user = result.user;
                        console.log("Logged in successfully", user.displayName)
                    }
                    ).catch((error) => {
                        // Handle Errors here.
                        alert(error.message)
                    });
                }}
            >Login with insitute id</Button>
        )
}
