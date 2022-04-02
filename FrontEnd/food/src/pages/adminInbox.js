import React, { useEffect, useState, useContext } from "react";
import Header from "../elements/adminHeader";
import Footer from "../elements/footer";
import {Link, Navigate} from "react-router-dom";
import AdminItem from "../elements/adminitem";
import axios from 'axios';
import {userContext} from '../userContext';
import AdminSidebar from "../elements/adminSide";

export default function AdminInbox() {
  const token = localStorage.getItem('token');
    const Redirect = () => {
        if(token==""){
            return <Navigate to='/'/>
        }
    };
    const [data, setData] = React.useState([]);

    const getData = async () => {
      setData([]);
      axios.get("/api/getData").then(response => {
          for(let x =0;x<response.data.length;x++){
              axios.get(`/api/getfood/${response.data[x]['food_id']}`).then(res => {
                axios.get(`/api/getinbox/${response.data[x]['food_id']}`).then(ress => {
                  axios.get(`/api/getuser/${response.data[x]['user_id']}`).then(resss => {
                    // console.log( ress.data)
                    if(ress.data['status']=='pending'){
                    setData(s => {return [...s, {username: resss.data['name'], id: res.data['id'], name: res.data['name'], number: res.data['number'], image: res.data['image'],
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
                <Header/>
                <div id="wrapper">
                    <AdminSidebar/>
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={'/adminDashboard'} >Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active">Inbox</li>
                            </ol>
                        </div>
                        {data.map((res) => (
                          <AdminItem res={res} getData={getData}/>
                        ))}
                        <Footer/>
                    </div>
                </div>
                {Redirect()}
            </div>
    );
    
}
