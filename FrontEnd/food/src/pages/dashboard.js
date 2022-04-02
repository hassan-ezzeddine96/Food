import React, { useEffect, useState, useContext } from "react";
import Header from "../elements/header";
import Footer from "../elements/footer";
import Post from "../elements/post";
import Sidebar from "../elements/sidebar";
import { Link, Navigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import ViewListIcon from '@mui/icons-material/ViewList';
import Fab from '@mui/material/Fab';
import axios from 'axios';

export default function Dashboard() {
    // const { token, setToken }= useContext(userContext);
    
    // console.log(token)
    const Redirect = () => {
        const token = localStorage.getItem('token');
        if(token==""){
            return <Navigate to='/'/>
        }
    };
    let time = new Date().toLocaleString();
    const [data, setData] = React.useState([]);
    const [search, setSearched] = React.useState([]);

    const getData = async () => {
        setData([]);
        axios.get("/api/getData").then(response => {
            for(let x =0;x<response.data.length;x++){
                axios.get(`/api/getfood/${response.data[x]['food_id']}`).then(res => {
                  axios.get(`/api/getinbox/${response.data[x]['food_id']}`).then(ress => {
                    axios.get(`/api/getuser/${response.data[x]['user_id']}`).then(resss => {
                    // console.log( ress.data)
                    if(ress.data['status']=='accepted'){
  
                    setData(s => {return [...s, {username: resss.data['name'], id: res.data['id'], name: res.data['name'], number: res.data['number'], image: res.data['image'],
                    type: res.data['type'], directions: res.data['directions'], ingredients: res.data['ingredients']}];});  

                    setSearched(s => {return [...s, {username: resss.data['name'], id: res.data['id'], name: res.data['name'], number: res.data['number'], image: res.data['image'],
                    type: res.data['type'], directions: res.data['directions'], ingredients: res.data['ingredients']}];}); 
                    }
                    });
                  });
                });
            }
          });
      }
      useEffect(() => {
        getData()       
      },[]);
        
    return (
            <div>
                <Header data={data} setData={setSearched}/>
                <div id="wrapper">
                    <Sidebar></Sidebar>
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={'/dashboard'} >Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active">Overview</li>
                            </ol>

                            <div className="row">
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-success o-hidden h-100">
                                        <div className="card-body">
                                            <div className="card-body-icon">
                                                <i className="fas fa-fw fa-list"></i>
                                            </div>
                                            <div className="mr-5">My Profile</div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to={'/profile'}>
                                            <Fab color="success" aria-label="add">
                                                <PersonIcon/>
                                            </Fab>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-primary o-hidden h-100">
                                        <div className="card-body">
                                            <div className="card-body-icon">
                                                <i className="fas fa-fw fa-life-ring"></i>
                                            </div>
                                            <div className="mr-5">Add Food</div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to={'/add'}>
                                            <Fab color="primary" aria-label="add">
                                                <AddIcon />
                                            </Fab>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-warning o-hidden h-100">
                                        <div className="card-body">
                                            <div className="card-body-icon">
                                                <i className="fas fa-fw fa-comment"></i>
                                            </div>
                                            <div className="mr-5">Inbox</div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to={'/inbox'}>
                                            <Fab color="warning" aria-label="add">
                                                <MailIcon/> 
                                            </Fab>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="card mb-3">
                                <div className="card-header">
                                    <ViewListIcon/>
                                    List of Food
                                </div>
                                <div className="card-body">
                                    
                                    {search.map((res) => (
                                    <Post res={res}/>
                                    ))}
                                    
                                </div>
                                <div className="card-footer small text-muted">Updated at {time}</div>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
                {Redirect()}
            </div>

    );
    
}
