import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const jobTypes = ["Full Time", "Part Time", "Freelance", "Remote"];

const validationSchema = Yup.object({
  title: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Job title must contain only letters and spaces")
    .required("Job title is required"),
  description: Yup.string().required("Job description is required"),
  location: Yup.string().required("Location is required"),
  job_type: Yup.string()
    .oneOf(jobTypes, "Invalid job type")
    .required("Job type is required"),
  company: Yup.string().required("Company name is required"),
  salary_range: Yup.object({
    min: Yup.number()
      .min(0, "Minimum salary cannot be negative")
      .required("Minimum salary is required"),
    max: Yup.number()
      .min(Yup.ref("min"), "Maximum salary must be greater than minimum")
      .required("Maximum salary is required"),
  }),
});

function CreateJob() {
  const [backendError, setBackendError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const initialValues = {
    title: "",
    description: "",
    location: "",
    job_type: "",
    job_status: "Open",
    company: "",
    salary_range: { min: 0, max: 0 },
  };

  const handleSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
    setBackendError(null);
    setSuccessMessage(null);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post("http://localhost:3000/api/job/create/", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMessage("Job created successfully!");
      resetForm();
      setSubmitting(false);
    } catch (error) {
      if (error.response) {
        const errorData = error.response.data;
        if (error.response.status === 401) {
          setBackendError("Unauthorized: Please log in to create a job.");
        } else {
          const formattedErrors = {};
          Object.keys(errorData).forEach((key) => {
            formattedErrors[key] = errorData[key];
          });
          setErrors(formattedErrors);
          setBackendError("Failed to create job. Please check the errors below.");
        }
      } else {
        setBackendError("Something went wrong: " + error.message);
      }
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        sx={{ color: "#0F1137", fontWeight: "bold", mb: 4, textAlign: "center" }}
      >
        Create a New Job
      </Typography>

      {successMessage && (
        <Box sx={{ mb: 2 }}>
          <Alert severity="success">{successMessage}</Alert>
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Button
              component={Link}
              to="/jobs"
              variant="outlined"
              sx={{
                color: "#1A75E8",
                borderColor: "#1A75E8",
                "&:hover": { borderColor: "#0F1137", color: "#0F1137" },
              }}
              endIcon={<ArrowForwardIcon />}
            >
              Go To See Jobs
            </Button>
          </Box>
        </Box>
      )}
      {backendError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {backendError}
        </Alert>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting, dirty, resetForm }) => (
          <Form
            onChange={() => {
              if (dirty && successMessage) setSuccessMessage(null);
            }}
          >
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="title"
                  label="Job Title"
                  fullWidth
                  variant="outlined"
                  error={touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#AEB4C1" },
                      "&:hover fieldset": { borderColor: "#1A75E8" },
                      "&.Mui-focused fieldset": { borderColor: "#1A75E8" },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="location"
                  label="Location"
                  fullWidth
                  variant="outlined"
                  error={touched.location && !!errors.location}
                  helperText={touched.location && errors.location}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#AEB4C1" },
                      "&:hover fieldset": { borderColor: "#1A75E8" },
                      "&.Mui-focused fieldset": { borderColor: "#1A75E8" },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="job_type"
                  label="Job Type"
                  select
                  fullWidth
                  variant="outlined"
                  error={touched.job_type && !!errors.job_type}
                  helperText={touched.job_type && errors.job_type}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#AEB4C1" },
                      "&:hover fieldset": { borderColor: "#1A75E8" },
                      "&.Mui-focused fieldset": { borderColor: "#1A75E8" },
                    },
                  }}
                >
                  {jobTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>

              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="company"
                  label="Company"
                  fullWidth
                  variant="outlined"
                  error={touched.company && !!errors.company}
                  helperText={touched.company && errors.company}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#AEB4C1" },
                      "&:hover fieldset": { borderColor: "#1A75E8" },
                      "&.Mui-focused fieldset": { borderColor: "#1A75E8" },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="salary_range.min"
                  label="Minimum Salary"
                  type="number"
                  fullWidth
                  variant="outlined"
                  error={
                    touched.salary_range?.min && !!errors.salary_range?.min
                  }
                  helperText={
                    touched.salary_range?.min && errors.salary_range?.min
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#AEB4C1" },
                      "&:hover fieldset": { borderColor: "#1A75E8" },
                      "&.Mui-focused fieldset": { borderColor: "#1A75E8" },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="salary_range.max"
                  label="Maximum Salary"
                  type="number"
                  fullWidth
                  variant="outlined"
                  error={
                    touched.salary_range?.max && !!errors.salary_range?.max
                  }
                  helperText={
                    touched.salary_range?.max && errors.salary_range?.max
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#AEB4C1" },
                      "&:hover fieldset": { borderColor: "#1A75E8" },
                      "&.Mui-focused fieldset": { borderColor: "#1A75E8" },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="description"
                  label="Job Description"
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={6}
                  error={touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#AEB4C1" },
                      "&:hover fieldset": { borderColor: "#1A75E8" },
                      "&.Mui-focused fieldset": { borderColor: "#1A75E8" },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: "#1A75E8",
                    color: "#fff",
                    py: 1.5,
                    "&:hover": { bgcolor: "#0F1137" },
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Create Job"
                  )}
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => resetForm()}
                  sx={{
                    borderColor: "#AEB4C1",
                    color: "#0F1137",
                    py: 1.5,
                    "&:hover": { borderColor: "#1A75E8", color: "#1A75E8" },
                  }}
                  disabled={isSubmitting}
                >
                  Clear Fields
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default CreateJob;