import React, { useEffect, useState, useContext } from "react";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import axios from 'axios';
export default function Post({res}) {
    const [expanded, setExpanded] = React.useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
        // console.log(data)
    };
    
    return (
            <div key={res.id}>
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
                                  spacing={2}
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
                                            <Typography variant="h6"> Owner :{res.username}</Typography>
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
                          </Stack>
                          <Divider/>
            </div>
    )
}
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
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
