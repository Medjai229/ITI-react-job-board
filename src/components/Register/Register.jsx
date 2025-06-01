import { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Grid,
  Paper,
  Alert,
  IconButton,
  InputAdornment,
  Snackbar,
  CssBaseline,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import MuiAlert from "@mui/material/Alert";
import { motion } from "framer-motion"; // Import motion for animation

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [emailExists, setEmailExists] = useState(false); //  Added state for checking email existence

  let navigate = useNavigate();

  // Initial form values
  const initialValues = {
    userName: "",
    email: "",
    password: "",
    confirmedPassword: "",
    role: "job_seeker",
  };

  // Validation Schema with Yup
  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(3, "Name should be at least 3 characters long")
      .max(29, "Name should be at most 29 characters long")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password should be at least 8 characters long")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Password is required"),
    confirmedPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    role: Yup.string().oneOf(["job_seeker", "employer"]).default("job_seeker"),
  });

  async function register(values, { setSubmitting }) {
    try {
      setApiError(null);
      setEmailExists(false); //Reset email existence state before submitting
      let response = await axios.post(
        "http://localhost:4200/api/signUp/signUp",
        values
      );
      if (response.status === 200) {
        setSnackbarMessage(
          "🎉 Registration successful! Redirecting to login..."
        );
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.error("Registration error:", error.message);
      if (error.response) {
        const errorMessage =
          error.response.data.message || "Something went wrong";

        setApiError(errorMessage);

        if (errorMessage.toLowerCase().includes("email already exists")) {
          setEmailExists(true); // Show the Login button with animation
        }

        setSnackbarMessage("⚠️ " + errorMessage);
        setOpenSnackbar(true);
      }
    } finally {
      setSubmitting(false);
    }
  }

  let registerForm = useFormik({
    initialValues,
    validationSchema,
    onSubmit: register,
  });

  return (
    <>
      <CssBaseline />

      {/* Styled Background */}
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
              maxWidth: 450,
              textAlign: "center",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography variant="h4" gutterBottom color="primary">
              Register
            </Typography>
            {apiError && <Alert severity="error">{apiError}</Alert>}
            <form onSubmit={registerForm.handleSubmit}>
              <Grid container spacing={2}>
                {/* Name Field */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="userName"
                    value={registerForm.values.userName}
                    onChange={registerForm.handleChange}
                    onBlur={registerForm.handleBlur}
                    error={
                      registerForm.touched.userName &&
                      Boolean(registerForm.errors.userName)
                    }
                    helperText={
                      registerForm.touched.userName &&
                      registerForm.errors.userName
                    }
                  />
                </Grid>
                {/* Email Field */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    value={registerForm.values.email}
                    onChange={registerForm.handleChange}
                    onBlur={registerForm.handleBlur}
                    error={
                      registerForm.touched.email &&
                      Boolean(registerForm.errors.email)
                    }
                    helperText={
                      registerForm.touched.email && registerForm.errors.email
                    }
                  />
                </Grid>
                {/* Role Dropdown */}
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Role</InputLabel>
                    <Select
                      name="role"
                      value={registerForm.values.role}
                      onChange={registerForm.handleChange}
                      onBlur={registerForm.handleBlur}
                      label="Role"
                    >
                      <MenuItem value="job_seeker">Job Seeker</MenuItem>
                      <MenuItem value="employer">Employer</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {/* Password Field */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={registerForm.values.password}
                    onChange={registerForm.handleChange}
                    onBlur={registerForm.handleBlur}
                    error={
                      registerForm.touched.password &&
                      Boolean(registerForm.errors.password)
                    }
                    helperText={
                      registerForm.touched.password &&
                      registerForm.errors.password
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                {/* Confirm Password Field */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    name="confirmedPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={registerForm.values.confirmedPassword}
                    onChange={registerForm.handleChange}
                    onBlur={registerForm.handleBlur}
                    error={
                      registerForm.touched.confirmedPassword &&
                      Boolean(registerForm.errors.confirmedPassword)
                    }
                    helperText={
                      registerForm.touched.confirmedPassword &&
                      registerForm.errors.confirmedPassword
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <span className="ms-3"> Don’t have an account?</span>

                <Link to="/login" className="text-primary text-decoration-none">
                  Login here
                </Link>
                {/* Submit Button */}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    REGISTER
                  </Button>
                </Grid>
              </Grid>
            </form>
            {/* Show Login Button with Animation if Email Exists */}
            {emailExists && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }} // Smooth zoom effect
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              ></motion.div>
            )}
          </Paper>
        </motion.div>

        {/* Snackbar for Success/Error Messages */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
        >
          <MuiAlert
            onClose={() => setOpenSnackbar(false)}
            severity={apiError ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Box>
    </>
  );
}
