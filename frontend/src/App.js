import Navbar from './components/Navbar'
import { useContext, useState } from 'react'
import { useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Forum from './components/Forum';
import { onAuthStateChanged } from 'firebase/auth'
import { MyContext } from './contexts/MyContext';
import { auth } from './firebase';
import { fetchUserData } from './api';

const App = () => {

   const { dispatch, state } = useContext(MyContext)
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      onAuthStateChanged(auth, (user) => {
         if (user) {
            fetchUserData(user.uid).then(res => {
               setLoading(false)
               dispatch({ type: 'LOGIN', payload: { ...user, ...res[0] } })
            }).catch(e => {
               setLoading(false)
               console.log(e)
            })
         } else {
            setLoading(false)
            dispatch({ type: 'LOGOUT' })
         }
      });

   }, [dispatch])

   if (loading)
      return <div>Loading...</div>
   else
      return (<>
         <Routes>
            <Route path="/"
               element={<>
                  <Navbar /> {
                     state.user ? <Dashboard /> : <Home />
                  }
               </>} />
            <Route path="/feedback" element={<Forum />} />
         </Routes>
         <Footer />
      </>

      )
}

export default App

