import { styled, alpha } from "@mui/material/styles";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: "18px", // Fully rounded
    width: "100%",
    maxWidth: "450px", // Limit width
    height: "70px",
    display: "flex",
    alignItems: "center",
    padding: "0 10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Soft shadow
    backdropFilter: "blur(10px)", // Glassmorphism effect
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    left: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "#fff", // White text
    width: "100%",
    paddingLeft: theme.spacing(7),
    "& .MuiInputBase-input": {
      fontSize: "18px",
      transition: theme.transitions.create("width"),
      "&::placeholder": {
        color: "rgba(255, 255, 255, 0.88)", // placeholder
        fontSize: "18px",
      },
    },
  }));

  return (
    <>


      <Box
      sx={{
        backgroundImage: `url('/landing.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "87vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end", // Push search bar to bottom
        paddingBottom: "50px", // Spacing from bottom
        direction:"row"
      }}
    >
      

      <Search sx={{position:"absolute",top:700,left:145,background:"#1A75E8"}}>
        <SearchIconWrapper>
          <SearchIcon fontSize="medium" />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search for job details..."
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
  
      <Button  sx={{position:"absolute",top:707,left:465,width:140,height:55,borderRadius:4,fontSize:20,backgroundColor:"#F1F1F1",color:"#1A75E8",fontWeight:600}} variant="contained" color="success">
        <Link to="/job-details" style={{ color: "inherit", textDecoration: "none" }}>
        Search
        </Link>
      </Button>

    </Box>
    </>
  
  );
}
