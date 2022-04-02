import React, { useEffect, useState, useContext } from "react";
import Header from "../elements/header";
import Footer from "../elements/footer";
import Item from "../elements/item";
import Sidebar from "../elements/sidebar";
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import {Link, Navigate} from "react-router-dom";
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { amber } from '@mui/material/colors';
import axios from 'axios';
import {userContext} from '../userContext';

export default function Profile() {
  const token = localStorage.getItem('token');
    const Redirect = () => {
        if(token==""){
            return <Navigate to='/'/>
        }
    };
    const [data, setData] = React.useState([]);
    const [rejected, setRejected] = React.useState([]);
    const [ rej, setRej ] = React.useState('false');
    const getData = async () => {
      setData([]);
      axios.get("/api/getData").then(response => {
          for(let x =0;x<response.data.length;x++){
              axios.get(`/api/getfood/${response.data[x]['food_id']}`).then(res => {
                axios.get(`/api/getinbox/${response.data[x]['food_id']}`).then(ress => {
                  // console.log( ress.data)
                  if(ress.data['status']=='accepted'){

                  setData(s => {return [...s, {id: res.data['id'], name: res.data['name'], number: res.data['number'], image: res.data['image'],
                  type: res.data['type'], directions: res.data['directions'], ingredients: res.data['ingredients']}];});  
                  }
                });
                  });
                }
        });
    }
    const clicked = async () => {
      if(rej=='false'){
        setRej('true')
        getRejected();
      }
      else{
        setRej('false')
        setRejected([])
      }
      
    }
    const getRejected = async () => {
        setRejected([]);
        axios.get("/api/getData").then(response => {
            for(let x =0;x<response.data.length;x++){
                axios.get(`/api/getfood/${response.data[x]['food_id']}`).then(res => {
                  axios.get(`/api/getinbox/${response.data[x]['food_id']}`).then(ress => {
                    // console.log( ress.data)
                    if(ress.data['status']=='rejected'){

                    setRejected(s => {return [...s, {id: res.data['id'], name: res.data['name'], number: res.data['number'], image: res.data['image'],
                    type: res.data['type'], directions: res.data['directions'], ingredients: res.data['ingredients']}];});  
                    }
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
                    <Sidebar/>
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={'/dashboard'} >Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active">Profile</li>
                            </ol>
                        </div>
                        <div style= {{textAlign:'left' ,marginBottom:'50px',marginLeft:'200px'}}>
                        <Button variant="contained" color="action" sx={{ color: amber[700] }} startIcon={<SettingsBackupRestoreIcon />} onClick={clicked}>Rejected</Button>
                        </div>
                        {rejected.map((res) => (
                          <Item res={res} getData={getRejected}/>
                        ))}
                        <Divider/>
                        {data.map((res) => (
                          <Item res={res} getData={getData}/>
                        ))}
                        <Footer/>
                    </div>
                </div>
                {Redirect()}
            </div>
    );
}

{/* <Stack 
                            direction="row"
                            justifyContent="center"
                            alignItems="baseline"
                            spacing={8}
                            >
                          <Fab color="warning" aria-label="edit">
                            <EditIcon />
                          </Fab>
                          <Container maxWidth="sm" >
                            <Box>
                                <Stack
                                direction="column"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={2}
                                >
                                  <Typography variant="h4">21 Acres Broccoli + Cauliflower Cheddar Soup</Typography>
                                  <Accordion expanded={expanded === 'x'} onChange={handleChange('x')}>
                                      <AccordionSummary  id="panel1d-header" sx={{ bgcolor: '#ffffff'}}>
                                        <img
                                        src="/images/broccoli-cheddar-166x300.jpg"
                                        alt="majd"
                                        loading="lazy"
                                        width="300px"
                                        height="400px"
                                        style={{marginLeft:'auto' , marginRight:'auto'}}
                                        />
                                      </AccordionSummary>
                                      <AccordionDetails>
                                          <Typography variant="h4">
                                          Ingredients
                                          </Typography>
                                          <Typography variant="h6">
                                            3 tbsp butter or oil
                                            1/4 cup flour (if you want a really thick soup, increase this to 1/2 cup)
                                            1 large onion, diced
                                            4 carrots, grated or cut into matchsticks
                                            2 celery stalks, diced
                                            2 heads broccoli, roughly chopped, stalk peeled and diced
                                            1 head cauliflower, roughly chopped
                                            2 cups stock (veggie, chicken, beef, mushroom, any you have on hand. In the 21 Acres deli we use a shiitake mushroom stock)
                                            1 1/2 cups whole milk
                                            2 cups Golden Glen Creamery’s Sharp Cheddar Cheese, shredded
                                            1 tsp salt
                                            1/4 tsp pepper
                                          </Typography>
                                          <Typography variant="h4">
                                            Directions
                                          </Typography>
                                          <Typography variant="h6">
                                            Start by adding the butter or oil to a dutch oven over medium to medium high heat, then add the onions, celery, and carrots. Sauté until soft and translucent, about 4 minutes.

                                            Add the flour and stir constantly for 2 minutes. Add the stock, broccoli, and cauliflower. Bring to a boil and simmer for 20 minutes on medium low heat, until the broccoli and cauliflower are tender.

                                            Turn down to low heat and add the milk, cheddar, salt, and pepper. Stir well. Then use an emulsion blender or transfer to a blender and blend for a second just to smooth the soup out (you can blend to your desired chunkiness). Enjoy!
                                          </Typography>
                                        </AccordionDetails>
                                  </Accordion>
                                </Stack>
                            <Dialog
                                  open={open}
                                  TransitionComponent={Transition}
                                  keepMounted
                                  onClose={handleClose}
                                  aria-describedby="alert-dialog-slide-description"
                              >
                                  <DialogTitle>{"Are You Sure You Want To Delete?"}</DialogTitle>
                                  <DialogActions>
                                  <Button variant="outlined" color="primary" startIcon={<DoNotDisturbOnIcon />} onClick={handleClose}>Cancel</Button>
                                  <Button variant="outlined" color="error" startIcon={<DeleteForeverIcon />} onClick={handleClose}>Delete</Button>
                                  </DialogActions>
                            </Dialog>
                            </Box>
                          </Container>
                          <Fab color="error" aria-label="delete" onClick={handleClickOpen}>
                            <DeleteIcon  />
                          </Fab>
                        </Stack> */}