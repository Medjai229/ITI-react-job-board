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

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
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
      const { email, password, rememberMe } = values; // Remove `rememberMe` before sending

      let response = await axios.post("http://localhost:3000/api/auth/login", { email, password });

      if (response.status === 200) {
        setSnackbarMessage("🎉 Login successful! Redirecting...");
        setOpenSnackbar(true);

        // Store token using Zustand
        setToken(response.data.token, rememberMe);

        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    } catch (error) {
      console.error("❌ Login error:", error.response?.data || error.message);
      setApiError(error.response?.data?.message || "Invalid credentials.");
      setSnackbarMessage("⚠️ Invalid email or password.");
      setOpenSnackbar(true);
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
        </Paper>

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
