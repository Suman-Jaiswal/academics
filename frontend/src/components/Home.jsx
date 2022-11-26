import React from 'react'

export default function Home() {
   return (
      <>  <div className='text-center home'> </div>
         <div style={{
            position: "absolute",
            top: "40%",
            opacity: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
         }}>
            <h1>Welcome to Academics IITI </h1>
            <p><i>(please Select or Add a branch to get started!)</i></p>
         </div>
      </>

   )
}
