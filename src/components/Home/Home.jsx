import { styled, alpha } from "@mui/material/styles";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase, Box } from "@mui/material";

export default function Home() {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: "50px", // Fully rounded
    backgroundColor: alpha(theme.palette.common.white, 0.2), // Light transparent
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.3),
    },
    width: "100%",
    maxWidth: "450px", // Limit width
    height: "55px",
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
    paddingLeft: theme.spacing(5),
    "& .MuiInputBase-input": {
      fontSize: "16px",
      transition: theme.transitions.create("width"),
      "&::placeholder": {
        color: "rgba(255, 255, 255, 0.7)", // Light placeholder
        fontSize: "14px",
      },
    },
  }));

  return (
    <Box
      sx={{
        backgroundImage: `url('/landing.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "90vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end", // Push search bar to bottom
        paddingBottom: "50px", // Spacing from bottom
      }}
    >
      <Search>
        <SearchIconWrapper>
          <SearchIcon fontSize="medium" />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    </Box>
  );
}
