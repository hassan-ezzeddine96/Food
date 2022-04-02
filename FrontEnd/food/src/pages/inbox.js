import React, { useEffect, useState, useContext } from "react";
import Header from "../elements/header";
import Footer from "../elements/footer";
import Sidebar from "../elements/sidebar";
import {Link, Navigate} from "react-router-dom";
import axios from 'axios';
import {userContext} from '../userContext';
import { DataGrid } from '@mui/x-data-grid';

export default function Inbox() {
    const token = localStorage.getItem('token');
    const Redirect = () => {
        if(token==""){
            return <Navigate to='/'/>
        }
    };
    // const [fid, setFid] = React.useState([]);
    // const [fname, setFname] = React.useState([]);
    // const [stat, setStat] = React.useState([]);
    // const [mess, setMess] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const getData = async () => {
        axios.get("/api/getData").then(response => {
            for(let x =0;x<response.data.length;x++){
                // setStat(s => {return [...s, response.data[x]['status']];});
                // setFid(s => {return [...s, response.data[x]['food_id']];});
                // setMess(s => {return [...s, response.data[x]['message']];});
                axios.get(`/api/getfood/${response.data[x]['food_id']}`).then(res => {
                    // setFname(s => {return [...s, res.data['name']];});
                    setRows(s => {return [...s, {id: response.data[x]['food_id'], name: res.data['name'], pending: response.data[x]['status']=='pending'?true:false, accepted: response.data[x]['status']=='accepted'?true:false, rejected: response.data[x]['status']=='rejected'?true:false, message: response.data[x]['message'] }];});  
                    });
            }
          });
      }
      
        useEffect(() => {
            getData()
            
      },[]);
      
    //   const rows=[
          
    //     {id: fid, name: fname, pending: stat=='pending'?true:false, accepted: stat=='accepted'?true:false, rejected: stat=='rejected'?true:false, message: mess }
    // ];
    return (
            <div>
                <Header/>
                <div id="wrapper">
                    <Sidebar/>
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={'/dashboard'} >Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active">Inbox</li>
                            </ol>
                        </div>
                        <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={8}
                            rowsPerPageOptions={[8]}
                            
                        />
                        </div>
                        <Footer/>
                    </div>
                </div>
                {Redirect()}
            </div>
    );
    
}
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Food Name', width: 300, description: 'Food Name' },
    { field: 'pending', headerName: 'Pending', width: 130, sortable: false, description: 'waiting for admin responce', type: 'boolean' },
    { field: 'accepted', headerName: 'Accepted', width: 130, sortable: false, description: 'accepted by admin', type: 'boolean' },
    { field: 'rejected', headerName: 'Rejected', width: 130, sortable: false, description: 'rejected by admin', type: 'boolean' },
    { field: 'message', headerName: 'Message', width: 500, sortable: false, description: 'admin response' },
    // {
    //   field: 'age',
    //   headerName: 'Age',
    //   type: 'number',
    //   width: 90,
    // },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];
  
//   const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//   ];

// const rows = [
//     {id: 1,name: 'batata', pending: true, accepted: false, rejected: false, message: ''},
//     {id: 2,name: 'bati5', pending: false, accepted: true, rejected: false, message: 'great one '},
//     {id: 3,name: '3ajour', pending: false, accepted: false, rejected: true, message: 'not good'},
//     {id: 4,name: 'hekhek', pending: false, accepted: true, rejected: false, message: 'aha'},
// ];