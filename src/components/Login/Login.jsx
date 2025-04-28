import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Alert,
  IconButton,
  InputAdornment,
  Snackbar,
  CssBaseline,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import MuiAlert from "@mui/material/Alert";
import useAuthStore from "../../store/useAuthStore"; // Zustand Store for Token
import { motion } from "framer-motion"; // Import motion for animation


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [emailNotFound, setEmailNotFound] = useState(false); //  state for email existence check

  let navigate = useNavigate();

  const { setToken } = useAuthStore(); // Zustand Token Management

  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  // Validation Schema with Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters long").required("Password is required"),
  });

  async function login(values, { setSubmitting }) {
    try {
      setApiError(null);
      setEmailNotFound(false); // Reset state before checking

      const { email, password, rememberMe } = values; // Remove `rememberMe` before sending

      let response = await axios.post("http://localhost:3000/api/auth/login", { email, password });

      if (response.status === 200) {
        setSnackbarMessage("🎉 Login successful! Redirecting...");
        setOpenSnackbar(true);

        // Store token using Zustand
        setToken(response.data.token, rememberMe);

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("❌ Login error:", error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || "Invalid credentials.";
      setApiError(errorMessage);
      setSnackbarMessage("⚠️ " + errorMessage);
      setOpenSnackbar(true);

      // If the error indicates the email is not found, show the "Register Here" button
      if (errorMessage.toLowerCase().includes("email does not exist. you must register first.")) {
        setEmailNotFound(true);
      }
    } finally {
      setSubmitting(false);
    }
  }

  let loginForm = useFormik({
    initialValues,
    validationSchema,
    onSubmit: login,
  });

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: 'url("endless-constellation.png")',
          padding: 2,
        }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
        <Paper
          elevation={6}
          sx={{
            padding: 5,
            borderRadius: 3,
            backgroundColor: "white",
            width: "100%",
            maxWidth: 400,
            textAlign: "center",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography variant="h4" gutterBottom color="primary">
            Login
          </Typography>
          {apiError && <Alert severity="error">{apiError}</Alert>}
          <form onSubmit={loginForm.handleSubmit}>
            <Grid container spacing={2}>
              {/* Email Field */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={loginForm.values.email}
                  onChange={loginForm.handleChange}
                  onBlur={loginForm.handleBlur}
                  error={loginForm.touched.email && Boolean(loginForm.errors.email)}
                  helperText={loginForm.touched.email && loginForm.errors.email}
                />
              </Grid>

              {/* Password Field */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={loginForm.values.password}
                  onChange={loginForm.handleChange}
                  onBlur={loginForm.handleBlur}
                  error={loginForm.touched.password && Boolean(loginForm.errors.password)}
                  helperText={loginForm.touched.password && loginForm.errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Remember Me Checkbox */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="rememberMe"
                      checked={loginForm.values.rememberMe}
                      onChange={loginForm.handleChange}
                      color="primary"
                    />
                  }
                  label="Remember Me"
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button type="submit" fullWidth variant="contained" color="primary">
                  LOGIN
                </Button>
              </Grid>
            </Grid>
          </form>
           {/* Show Register Button with Animation if Email Not Found */}
           {emailNotFound && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }} // Smooth zoom effect
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => navigate("/")}
                  sx={{
                    backgroundColor: "#007BFF",
                    color: "white",
                    padding: "12px 24px",
                    borderRadius: "50px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    textTransform: "none",
                    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      backgroundColor: "#0056b3",
                      transform: "translateY(-2px) scale(1.05)",
                    },
                  }}
                >
                  🆕 No Account? Register Here!
                </Button>
              </motion.div>
            )}
        </Paper>
        </motion.div>

        {/* Snackbar for Success/Error Messages */}
        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
          <MuiAlert onClose={() => setOpenSnackbar(false)} severity={apiError ? "error" : "success"} sx={{ width: "100%" }}>
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Box>
    </>
  );
}
