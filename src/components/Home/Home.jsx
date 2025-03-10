import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 4,
        // For demonstration, let's use a basic linear gradient background
        background: "linear-gradient(to bottom, #002855, #004aad, #0099ff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          borderRadius: 3,
          backgroundColor: "rgba(255,255,255,0.8)", // Slight transparency
          textAlign: "center",
          backdropFilter: "blur(10px)",
          width: "100%",
          maxWidth: 500,
        }}
      >
        <Typography variant="h3" color="primary" gutterBottom>
          Welcome to JobBoard!
        </Typography>

        <Typography variant="body1" sx={{ mb: 4 }}>
          We're excited to help you find your next opportunity. Explore jobs,
          post openings, or manage your career – all in one place.
        </Typography>

        {/* Example button linking to something else in your app */}
        <Button
          variant="contained"
          color="secondary"
          component={NavLink}
          to="/home"
        >
          Explore More
        </Button>
      </Paper>
    </Box>
  );
}
