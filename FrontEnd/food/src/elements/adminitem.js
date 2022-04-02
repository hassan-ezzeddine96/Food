import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
export default function AdminItem({res ,getData}) {
    const [expanded, setExpanded] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [mess, setMess] = useState('');

    const handleStatus = (event, newAlignment) => {
        setStatus(newAlignment);
      };
    
      const handleMess = event => {
        setMess(event.target.value)
    };

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
        // console.log(data)
    };
    const onSend=()=>{
        if(status!=''){
            const Data = {status: status,message: mess }
            axios.post(`/api/inbox/${res.id}`,Data).then(response => {
                console.log(response.data);
                });
                getData()
        }
      }
    return (
            <div>
                <Stack 
                          direction="row"
                          justifyContent="center"
                          alignItems="baseline"
                          spacing={8}
                          key={res.id}
                          >
                            <Container maxWidth="sm" >
                              <Box>
                                  <Stack
                                  direction="column"
                                  justifyContent="flex-start"
                                  alignItems="center"
                                  spacing={1}
                                  >
                                    <Typography variant="h4">{res.name}</Typography>
                                    <Accordion expanded={expanded === res.name} onChange={handleChange(res.name)}>
                                        <AccordionSummary  id="panel1d-header" sx={{ bgcolor: '#ffffff'}}>
                                          <img
                                          src={`/images/${res.image}`}
                                          alt="majd"
                                          loading="lazy"
                                          width="400px"
                                          height="500px"
                                          style={{marginLeft:'auto' , marginRight:'auto'}}
                                          />
                                        </AccordionSummary>
                                        <AccordionDetails>
                                          <Typography variant="h6">Owner: {res.username}</Typography>
                                            <Typography variant="h7">
                                            Serve: {res.number} person
                                            <br></br>
                                            Type: {res.type}
                                            </Typography>
                                            <Typography variant="h4">
                                            Ingredients
                                            </Typography>
                                            <Typography variant="h6">
                                              {res.ingredients}
                                            </Typography>
                                            <Typography variant="h4">
                                              Directions
                                            </Typography>
                                            <Typography variant="h6">
                                              {res.directions}
                                              </Typography>
                                          </AccordionDetails>
                                    </Accordion>
                                  </Stack>
                              </Box>
                            </Container>
                            <Container maxWidth="sm" >
                              <Box>
                              <Stack
                                  direction="column"
                                  justifyContent="space-evenly"
                                  alignItems="flex-start"
                                  spacing={4}
                                  >
                                <ToggleButtonGroup
                                color="primary"
                                value={status}
                                id={res.id}
                                exclusive
                                onChange={handleStatus}
                                >
                                    <ToggleButton color="success" value="accepted">Accepted</ToggleButton>
                                    <ToggleButton color="error" value="rejected">Regected</ToggleButton>
                                </ToggleButtonGroup>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Message"
                                    multiline
                                    maxRows={6}
                                    id={res.id}
                                    value={mess}
                                    onChange={handleMess}
                                    />
                                <Button id={res.id} style={{marginLeft:'200px' , marginRight:'auto'}} variant="contained" onClick={onSend} endIcon={<SendIcon />} >Send</Button>
                                </Stack>
                              </Box>
                            </Container>
                          </Stack>
            </div>
    )
}
const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));