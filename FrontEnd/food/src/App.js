import React, {useState,useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Inbox from "./pages/inbox";
import Profile from "./pages/profile";
import Index from "./pages/index";
import AddFood from "./pages/add";
import EditFood from "./pages/edit";
import EditPage from "./pages/edit";
import Register from "./pages/register";
import NotFound from "./pages/notfound";
import FileUploadPage from "./pages/fileupload";
import {userContext} from './userContext';
import AdminDashboard from './pages/adminDashboard';
import AdminInbox from './pages/adminInbox';

export default function App () {
    const [token, setToken] = useState("");
    const value = { token, setToken };
    // localStorage.setItem('itemName', value)
    // localStorage.getItem('itemName')
    // localStorage.removeItem('myData');
    return (
            <div className="App">
                
                <Router>
                    <Routes>
                        <Route exact path='/' element={<Login/>} />
                        <Route path='/dashboard' element={<Dashboard/>} />
                        <Route path='/profile' element={<Profile/>} />
                        <Route path='/inbox' element={<Inbox/>} />
                        <Route path='/adminInbox' element={<AdminInbox/>} />
                        {/* <Route path='/index' element={<Index/>}/> */}
                        <Route path='/register' element={<Register/>} />
                        <Route path='/add' element={<AddFood/>} />
                        <Route path='/edit/:id' element={<EditFood/>} />
                        <Route path='/adminDashboard' element={<AdminDashboard/>} />
                        {/* <Route path='/edit/' element={<EditPage/>} /> */}
                        {/* <Route path='/fileupload/' element={<FileUploadPage/>} /> */}
                        {/* <Route path='*' element={<NotFound/>} /> */}
                    </Routes>
                </Router>
            </div>
        );
}
{/* <userContext.Provider value={value}></userContext.Provider> */}