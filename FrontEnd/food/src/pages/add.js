import React, { useEffect, useState, useContext } from "react";
import Header from "../elements/header";
import { styled } from '@mui/material/styles';
import Footer from "../elements/footer";
import Sidebar from "../elements/sidebar";
import {Link, Navigate} from "react-router-dom";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import {userContext} from '../userContext';

export default function AddFood() {
  const token = localStorage.getItem('token');
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [nb, setNb] = useState(0);
    const [dir, setDir] = useState('');
    const Redirect = () => {
        if(token==""){
            return <Navigate to='/'/>
        }
    };
    const[img , setImg] = useState(null);
    const[image , setImage] = useState(null);
    const Input = styled('input')({
      display: 'none',
    });
    const onSend=()=>{
      // console.log(image)
      let s =""
      arr.forEach(element => {
        s=s.concat(element.value.replace(/ /g, ""));
        s=s.concat(" ");
      });
     const Data = {name: name, type: type, number: nb, ingredients: s, file: image, directions: dir }
     axios.post("/api/food",Data).then(response => {
        console.log(response.data);
        });
        setName('');
        setType('');
        setImage(null);
        setImg(null);
        setNb(0);
        setArr(inputArr);
        setDir('');
    }
    const handleType = event => {
        setType(event.target.value)
    };
    const handleDir = event => {
      setDir(event.target.value)
  };
    const handleNb = event => {
      setNb(event.target.value)
  };
    const handleName = event => {
      setName(event.target.value)
  };
      const inputArr = [
        {
          value: "",
        }
      ];
    
      const [arr, setArr] = useState(inputArr);
    
      const addInput = () => {
        setArr(s => {
          return [
            ...s,
            {
              value: "",
            }
          ];
        });
      };
      
    
      const handleChange = e => {
        e.preventDefault();
        const index = e.target.id
        setArr(s => {
          const newArr = s.slice();
          newArr[index].value = e.target.value;
          return newArr;
        });
      };
      const onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          setImg(URL.createObjectURL(img))
          createImage(img);
        }
      };
      const createImage = file => {
        let reader = new FileReader();
        reader.onload = (e) => {
            setImage(e.target.result)
        };
        reader.readAsDataURL(file);
      }
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
                                <li className="breadcrumb-item active">Add Food</li>
                            </ol>
                        </div>
                        <Container maxWidth="sm">
                            <Box  >
                                
                                    <Stack spacing={2} divider={<Divider orientation="horizontal" flexItem />} >
                                    <TextField
                                    required
                                    id="Food Name"
                                    label="Food Name"
                                    value={name}
                                    onChange={handleName}
                                    />
                                    <Select
                                    id="demo-simple-select-standard"
                                    label="type"
                                    value={type}
                                    onChange={handleType}
                                    displayEmpty
                                    >
                                      <MenuItem value="">
                                        <em>Choose cuisine</em>
                                      </MenuItem>
                                    {cuisines.map((cuisine,i) => (
                                        <MenuItem key={i} value={cuisine}>
                                            <ListItemText primary={cuisine} />
                                        </MenuItem>
                                    ))}
                                    </Select>
                                    <TextField
                                    required
                                    id="Number of servants"
                                    label="Number of servants"
                                    value={nb}
                                    onChange={handleNb}
                                    />
                                        {arr.map((item, i) => {
                                            return (
                                                      <TextField
                                                      onChange={handleChange}
                                                      label="Insert Ingredient"
                                                      value={item.value}
                                                      id={i}
                                                      key={i}
                                                    />
                                            );
                                        })}
                                        <Button
                                        variant="outlined"
                                        onClick={addInput}>+</Button>  
                                    <TextField
                                    id="outlined-multiline-flexible"
                                    label="Directions"
                                    multiline
                                    maxRows={4}
                                    value={dir}
                                    onChange={handleDir}
                                    />
                                    <label htmlFor="icon-button-file">
                                            <Input accept="image/*" id="icon-button-file" type="file" 
                                            onChange={onImageChange}
                                            />
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                              <PhotoCamera />
                                            </IconButton>
                                    </label>     
                                    <img src={img} style={{textAlign:'center' ,justifyContent: 'center' ,verticalAlign:'middle' ,maxWidth:'400px'  ,maxHeight:'400px'}}/>
                                    <Button variant="contained" endIcon={<SendIcon />} onClick={onSend}>Send</Button>
                                    </Stack>
                                
                            </Box>
                        </Container>
                        <Footer/>
                    </div>
                </div>
                {Redirect()}
            </div>
    );
}
const cups=[
    0.25,
    0.5,
    0.75,
    1,
    1.25,
    1.5,
    2,
    3,
    4,
    5,
    6,

]

const cuisines = [
      "Afghan",
      "African",
      "Albanian",
      "Algerian",
      "Alsatian",
      "American",
      "Armenian",
      "Argentine",
      "Asian",
      "Australian",
      "Austrian",
      "Auvergne",
      "Bagels",
      "Bakery",
      "Bangladeshi",
      "Barbecue",
      "Belgian",
      "Bistro",
      "Brazilian",
      "British",
      "Burgers",
      "Burgundy",
      "Burmese",
      "Cafe",
      "Cajun",
      "Californian",
      "Calzones",
      "Cambodian",
      "Caribbean",
      "Cheesesteaks",
      "Chicken",
      "Chilean",
      "Chinese",
      "Chowder",
      "Coffee",
      "Colombian",
      "Contemporary",
      "Continental",
      "Corsica",
      "Creole",
      "Crepes",
      "Cuban",
      "Cuban",
      "Czech",
      "Deli",
      "Dim Sum",
      "Diner",
      "Dominican",
      "Donuts",
      "Dutch",
      "Eastern European",
      "Eclectic",
      "Egyptian",
      "English",
      "Ethiopian",
      "Ecuadorean",
      "European",
      "Fast Food",
      "Filipino",
      "Fish and Chips",
      "Fondue",
      "French",
      "Frozen Yogurt",
      "Fusion",
      "Gastropub",
      "German",
      "Greek",
      "Grill",
      "Gyros",
      "Haitian",
      "Halal",
      "Hawaiian",
      "Healthy",
      "Hot Dogs",
      "Ice Cream",
      "Indian",
      "Indonesian",
      "International",
      "Irish",
      "Italian",
      "Jamaican",
      "Japanese",
      "Juices",
      "Korean",
      "Korean Barbeque",
      "Kosher",
      "Latin",
      "Latin American",
      "Lebanese",
      "Lyonnais",
      "Malaysian",
      "Mediterranean",
      "Mexican",
      "Middle Eastern",
      "Mongolian",
      "Moroccan",
      "Nepalese",
      "Noodle Bar",
      "Norwegian",
      "Organic",
      "Oysters",
      "Palestinian",
      "Pacific Rim",
      "Pakistani",
      "Pan Asian",
      "Pasta",
      "Pastries",
      "Persian",
      "Peruvian",
      "Pho",
      "Pizza",
      "Polish",
      "Polynesian",
      "Portuguese",
      "Provençal",
      "Pub Food",
      "Puerto Rican",
      "Raw",
      "Ribs",
      "Russian",
      "Salad",
      "Salvadoran",
      "Sandwiches",
      "Savoy",
      "Scandinavian",
      "Seafood",
      "Senegalese",
      "Singaporean",
      "Smoothies",
      "Soul Food",
      "Soup",
      "South American",
      "South African",
      "South Pacific",
      "Southern",
      "Southwestern",
      "Spanish",
      "Steak",
      "Steakhouse",
      "Subs",
      "Sushi",
      "Taiwanese",
      "Tapas",
      "Tea",
      "Tex Mex",
      "Thai",
      "Tibetan",
      "Traditional",
      "Tunisian",
      "Turkish",
      "Ukrainian",
      "Vegan",
      "Vegetarian",
      "Venezuelan",
      "Vietnamese",
      "Wings",
      "Wraps"
    ]