import Navbar from './components/Navbar'
import { useState } from 'react'
import { useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import { fetchBranches } from './api';
import Feedback from './components/Feedback';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Forum from './components/Forum';

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
      <Feedback />
      <Routes>
         <Route path="/" element={branchId === "" ? <Home /> :
            <Dashboard branchId={branchId} />} />
         <Route path="/feedback" element={<Forum />} />
      </Routes>
      <Footer />
   </>

   )
}

export default App

