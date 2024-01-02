import React from 'react'
import AddBranch from './AddBranch'

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
            <div className='display-3'>Welcome to Academics IITI </div>
            <p className='lead'><i>Please Select or Add a branch to get started!</i></p>
            <div>
               <AddBranch />
            </div>
         </div>
      </div>

      </>

   )
}
