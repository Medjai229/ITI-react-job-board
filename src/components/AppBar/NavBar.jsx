import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <Box sx={{ flexGrow: 1 ,backgroundColor:"#1A75E8"}}>
        <AppBar position="static">
          <Toolbar sx={{ mr: 4,marginLeft:13,marginRight:13 }}
          >

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
        
            
            <Typography variant="h6" component="div" sx={{flexGrow: 1, color: "#FFFFFF" ,marginRight:2}}>              
              <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              Home
              </Link>
            </Typography>


           
            
            <Typography variant="h6" component="div" sx={{ color: "#FFFFFF",marginRight:2 }}>              
              <Link to="/CreateJob" style={{ color: "inherit", textDecoration: "none" }}>
              Post jop
              </Link>
            </Typography>

            <Typography variant="h6" component="div" sx={{ color: "#FFFFFF",marginRight:2 }}>              
              <Link to="/CompanyHome" style={{ color: "inherit", textDecoration: "none" }}>
              Companies
              </Link>
            </Typography>

            <Typography variant="h6" component="div" sx={{ color: "#FFFFFF" ,marginRight:2}}>              
              <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
                Login
              </Link>
            </Typography>
            
            <Typography variant="h6" component="div" sx={{ color: "#FFFFFF",marginRight:2 }}>              
              <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
              Sign Up
              </Link>
            </Typography>
        
          </Toolbar>
          
        </AppBar>
      </Box>
    </>
  );
}
