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
        <div className='px-3 d-flex justify-content-between text-secondary' style={{ fontSize: 12 }}>
            <span className='float-right'>Developed by: Suman Jaiswal</span>
            <span className='float-right'>Academics IITI &copy; 2022</span>
        </div>

    </>

    )
}

export default App

