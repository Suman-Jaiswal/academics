import Navbar from './components/Navbar'
import { useState } from 'react'
import { useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import { fetchBranches } from './api';

const App = () => {

   const [branchId, setBranchId] = useState("");
   const [branches, setBranches] = useState([]);

   useEffect(() => {
      fetchBranches().then((res) => setBranches(res));
      const bId = localStorage.getItem("branchId");
      if (bId)
         setBranchId(bId);
   }, [])

   console.log(branchId);

   return (<>
      <Navbar branches={branches} setBranchId={setBranchId} branchId={branchId} />
      {
         branchId === "" ? <Home /> :
            <Dashboard branchId={branchId} />
      }
      <div className='px-4 d-flex justify-content-between py-2 w-100 bg-dark text-secondary' style={{ fontSize: 12, position: 'fixed', bottom: 0, zIndex: 1 }}>
         <span className='p' style={{ fontSize: 12 }} >Developed by: Suman Jaiswal</span>
         <span className='p' style={{ fontSize: 12 }}>Academics IITI &copy; 2022</span>
      </div>

   </>

   )
}

export default App

