import React from "react";
import Grid from "@mui/material/Grid2";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import CardCompanies from "../CardCompanies/CardCompanies";

export default function CompanyHome() {
  const theme = createTheme({
    palette: {
      text: {
        primary: "#1A75E8",
        secondary: "#0F1137",
      },
      background: {
        default: "#AEB4C1",
        paper: "#fff",
      },
    },
  });


  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid item size={{ xs: 6, md: 11 }}>
            <Box sx={{ backgroundColor: "background.default", height: 400 }}>
              <img src="/Untitled-1.png" alt="" srcset="" />
            </Box>
            <br />
            <br /> <br />
            <Typography
              sx={{ fontSize: 36, fontWeight: 750, color: "text.primary" }}
            >
              All companies
            </Typography>
          </Grid>
        </Grid>
      </ThemeProvider>
      <CardCompanies />
    </>
  );
}
