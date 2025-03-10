import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function NavBar() {
  return (
    <>
      <Box sx={{ flexGrow: 1 ,marginLeft:10,marginRight:8,backgroundColor:"#1A75E8"}}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 4 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              logo
            </Typography>
            <Button color="inherit">Login</Button>
            <Button color="inherit">SignUp</Button>
            <Button color="inherit">PostJop</Button>

          </Toolbar>
          
        </AppBar>
      </Box>
    </>
  );
}
