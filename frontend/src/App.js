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
   }, [])

   return (<>

      <Feedback />
      <Routes>
         <Route path="/"
            element={<>
               <Navbar branches={branches} setBranchId={setBranchId} branchId={branchId} setBranches={setBranches} /><Home />
            </>} />
         <Route path="/:branchId"
            element={
               <>
                  <Navbar branches={branches} setBranchId={setBranchId} branchId={branchId} setBranches={setBranches} /><Dashboard />
               </>} />
         <Route path="/feedback" element={<Forum />} />
      </Routes>
      <Footer />
   </>

   )
}

export default App

