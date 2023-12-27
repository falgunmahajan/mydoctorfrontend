import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';

import Button from '@mui/material/Button';
import { Outlet, useNavigate } from 'react-router-dom';
import { Autocomplete, Avatar, Grid, List, ListItem, ListItemButton, ListItemText, Popover, TextField } from '@mui/material';
import myDoctor from "../svg/mydoctor.svg";
import { CalendarToday, ExitToApp, PersonOutlined, Search } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../Redux/Store';
import { fetchUser } from '../Redux/CreateSlice';

import { getSpecialities } from '../utils/getSpecialities';
import SymptonsMenu from './SymptonsMenu';
import "swiper/css";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  handleDrawerToggle:()=>void;
}
interface Specialities{
    name:string,
}


export default function Navbar(props: Props) {
  const { window,handleDrawerToggle } = props;
 
  const navigate = useNavigate();
 

  const container = window !== undefined ? () => window().document.body : undefined;
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event:React.MouseEvent<HTMLButtonElement>) => {
    console.log("some")
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 console.log(anchorEl)
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [specialities, setSpecialities] = React.useState([] as Specialities[]);
  const login=useAppSelector(state=>state.Login)
const status=useAppSelector(state=>state.status)
  const dispatch=useAppDispatch()
  React.useEffect(() => {
    console.log("hello");
    if (status == "idle") {
      console.log("status")
      dispatch(fetchUser());
    }
  });
console.log("navbar")
async function getSpecialitiesdata(){
    const speciality = await getSpecialities();
    setSpecialities(speciality);
}
  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav"  sx={{ backgroundColor: "white", pt: 1,  zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
         
         <Grid container>
            <Grid
              item
              xs={4}
              lg={1}
              order={{ xs: 1 }}
              sx={{ display: { sm: "none" } }}
            >
                 <IconButton
            
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2,color:"black", display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
            </Grid>
         <Grid item xs={4} lg={4} order={{ xs: 2 }} >
              <img
                src={myDoctor}
                alt="image not found"
                width="100px"
                onClick={() => navigate("/")}
                style={{marginLeft:"30px"}}
              />
            </Grid>
            <Grid
              item
              xs={12}
              lg={4}
              order={{ xs: 4, lg: 3 }}
              sx={{ backgroundColor: "#fafafa", display: "flex", justifyContent:"space-around" , alignItems:"center"}}
            >
              
              <Autocomplete
              freeSolo
              id="tags-outlined"
              options={specialities.map(option=>option.name)}
            //   getOptionLabel={(option) => option.name}
              sx={{width:250, border:"none"}}

              renderInput={(params) => (
                <TextField   {...params} placeholder="Select a Service" variant="standard" onFocus={getSpecialitiesdata} InputProps={{
                  ...params.InputProps,
                  disableUnderline: true,
                }}/>
              )}
            />
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
            <Grid
              item
              xs={4}
              order={{ xs: 3, lg: 4 }}
              sx={{ textAlign: "right" }}
            >
              {login ? (
                <>
                
                <Avatar src="/broken-image.jpg"
                component="button"
                  sx={{ ml: "auto", border:"none" }}
                  onClick={handleClick}
                />
                <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'center',
                  horizontal: 'left',
                }}
              >
                <List disablePadding >
                <ListItem disableGutters disablePadding >
            <ListItemButton >
                  <PersonOutlined sx={{mr:1}}/>
              <ListItemText primary="Account Settings"/>
            </ListItemButton>
          </ListItem>
          <ListItem disableGutters disablePadding >
            <ListItemButton >
                  <CalendarToday sx={{mr:1}}/>
              <ListItemText primary="My Appointments"/>
            </ListItemButton>
          </ListItem>
          <ListItem disableGutters disablePadding >
            <ListItemButton onClick={()=>{
              localStorage.removeItem("user")
            dispatch(fetchUser())
            navigate("/")
              }} >
                  <ExitToApp sx={{mr:1}}/>
              <ListItemText primary="Logout"/>
            </ListItemButton>
          </ListItem>
                </List>
              </Popover>
              </>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => navigate("/auth/login")}
                  sx={{ backgroundColor: "#3f51b5" }}
                >
                  Login{" "}
                </Button>
              )}

        
            </Grid>
         </Grid>
         
        </Toolbar>
        <SymptonsMenu/>
      </AppBar>
     
    <Outlet/>
    </Box>
  );
}