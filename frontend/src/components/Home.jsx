import React from 'react'
import LoginBtn from './LoginBtn'

export default function Home() {
   return (
      <>  <div className='text-center home' >
         <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
         }}>
            <div className='display-5'>Welcome to Academics IITI </div>
            <div className='mt-4'>
               <LoginBtn />
            </div>
         </div>
      </div>

      </>

   )
}
