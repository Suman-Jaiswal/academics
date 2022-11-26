import Navbar from './components/Navbar'
import { useContext, useState } from 'react'
import { useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import { fetchBranches } from './api';
import { MyContext } from './contexts/MyContext';

const App = () => {

   const { state } = useContext(MyContext)
   const { branch } = state

   const [branchId, setBranchId] = useState("");
   const [branches, setBranches] = useState([]);

   useEffect(() => {
      fetchBranches().then((res) => setBranches(res.data));
   }, [])

   useEffect(() => {
      setBranchId(branch.branchId);
   }, [branch])


   return (<>
      <Navbar branches={branches} />
      {
         branchId === "" ? <Home /> :
            <Dashboard branchId={branch.branchId} />
      }
      <div className='px-3 d-flex justify-content-between py-3 w-100' style={{ fontSize: 12, position: "fixed", bottom: 0, color: "#eee", zIndex: -1 }}>
         <span className=''>Developed by: Suman Jaiswal</span>
         <span className=''>Academics IITI &copy; 2022</span>
      </div>

   </>

   )
}

export default App

