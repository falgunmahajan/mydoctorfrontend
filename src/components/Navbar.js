import React, { useState } from 'react'
import { Menu, Search} from '@mui/icons-material';
import { AppBar, Box, Button, Grid, IconButton,  TextField, Toolbar } from '@mui/material'
import myDoctor from "../svg/mydoctor.svg"

import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';


import 'swiper/css';

import SymptonsMenu from './SymptonsMenu';

const Navbar = ({handleDrawerToggle}) => {
    const [showDropDown,setShowDropDown]=useState(false);
    const [specialities,setSpecialities]=useState([])
    const navigate = useNavigate();

    async function showOptions()
    {
        const res=await axios.get("http://localhost:4000/specializations?$limit=100&$sort[name]=1")
        const speciality= res.data.data;
        setSpecialities(speciality);
        setShowDropDown(true)
    }
    return (
        <div>
            <AppBar component="header" sx={{ backgroundColor: "white", pt: 1, zIndex:1201}} >
                <Toolbar sx={{flexWrap:"wrap",mb:1}}>
                <Grid container>
                    <Grid item xs={4} lg={1} order={{xs:1}} >
                    <IconButton
                        color="black"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <Menu />
                    </IconButton>
                    </Grid>
                        <Grid item xs={4} lg={3} order={{xs:2}}>
                            <img src={myDoctor} alt="image not found" width="140px" onClick={() => navigate("/")} />
                        </Grid>
                        <Grid item xs={12} lg={4} order={{xs:4, lg:3}} sx={{ backgroundColor: "#fafafa", display:"flex" }}>
                            <Box>
                        <TextField
                                variant="standard"
                                placeholder="Select a Service"
                                autoComplete="off"
                                InputProps={{
                                    disableUnderline: true,
                                }}
                                onFocus={showOptions}
                                onBlur={()=>setShowDropDown(false)}
                                sx={{ p: 1 }}
                            />
                           { showDropDown && <Box sx={{backgroundColor:"#e8e9ec", height:"150px", position:"absolute",zIndex:4, color:"black", px:2,boxShadow: "20px 20px 50px grey",overflowY:"auto"}}>
                               {specialities.map((item,index)=>{
                                return <div key={index}>{item.name}</div>
                               })}
                            </Box>}
                             </Box>  
                            <TextField
                                variant="standard"
                                placeholder="Search Doctors"
                                autoComplete="off"
                                InputProps={{
                                    endAdornment: <Search />,
                                    disableUnderline: true,
                                }}
                                sx={{ p: 1 }}
                            />

                        </Grid>
                        <Grid item xs={4} order={{xs:3, lg:4}}  sx={{ textAlign: "right" }}>
                            <Button variant="contained" onClick={()=>navigate("/auth/login")} sx={{ backgroundColor: "#3f51b5" }} >Login</Button>
                        </Grid>
                    </Grid>
             </Toolbar>
             <SymptonsMenu/>
            </AppBar>
            <Outlet/>
        </div>
    )
}

export default Navbar
