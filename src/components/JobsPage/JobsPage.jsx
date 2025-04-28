import React, { useEffect, useState } from "react";
import useJobStore from "../../store/useJobsStore";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  CircularProgress,
  Pagination,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Link } from "react-router-dom";

function JobsPage() {
  const { jobs, loading, error, fetchJobs } = useJobStore();
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8;

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const getJobTypeBackgroundColor = (jobType) => {
    switch (jobType) {
      case "Full Time":
        return "#4CAF50";
      case "Freelance":
        return "#F44336";
      case "Remote":
        return "#2196F3";
      case "Part Time":
        return "#FF9800";
      default:
    }
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{ marginBottom: "3rem" }}
      >
        Recently Jobs
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
          <Typography variant="body1" sx={{ ml: 2 }}>
            Loading...
          </Typography>
        </Box>
      ) : jobs.length === 0 ? (
        <Typography variant="body1" align="center" sx={{ mt: 4 }}>
          There is no jobs!
        </Typography>
      ) : (
        <>
          <Grid container spacing={3} justifyContent="center">
            {currentJobs.map((job) => (
              <Grid item xs={12} key={job._id}>
                <Card
                  sx={{
                    padding: "20px",
                    width: "100%",
                    borderRadius: 3,
                    border: "2px solid #eee",
                    boxShadow: "none",
                    "&:hover": {
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { xs: "flex-start", sm: "center" },
                      gap: { xs: 2, sm: 4 },
                      flexWrap: "wrap",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        minWidth: 0,
                      }}
                    >
                      <Box
                        className="comp-logo"
                        sx={{
                          width: { xs: 60, sm: 80 },
                          height: { xs: 60, sm: 80 },
                          borderRadius: "50%",
                          backgroundColor: "#eee",
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <BusinessIcon sx={{ fontSize: { xs: 40, sm: 50 } }} />
                      </Box>
                      <Box className="job-name" sx={{ minWidth: 0 }}>
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{
                            fontSize: { xs: "1.2rem", sm: "1.5rem" },
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {job.title}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          sx={{
                            fontSize: { xs: "1rem", sm: "1rem" },
                          }}
                        >
                          {job.company.name}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: { xs: "15px", sm: "20px" },
                        flexWrap: "wrap",
                        flexGrow: 1,
                        justifyContent: { xs: "flex-start", sm: "flex-end" },
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: { xs: "0.9rem", sm: "1.1rem" },
                          width: { xs: "100px", sm: "120px" },
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <LocationOnOutlinedIcon fontSize="medium" />
                        {job.location}
                      </Typography>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{
                          backgroundColor: getJobTypeBackgroundColor(job.job_type),
                          color: "#fff",
                          padding: "4px 10px",
                          borderRadius: "5px",
                          fontSize: { xs: "0.8rem", sm: "1.1rem" },
                          width: { xs: "100px", sm: "120px" },
                          textAlign: "center",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {job.job_type}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          backgroundColor: "#E0E0EE",
                          padding: "4px 10px",
                          borderRadius: "5px",
                          fontSize: { xs: "0.8rem", sm: "1.1rem" },
                          width: { xs: "100px", sm: "120px" },
                          textAlign: "center",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {job.job_status}
                      </Typography>
                      <Button
                        size="medium"
                        variant="outlined"
                        color="primary"
                        sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
                        component={Link}
                        to={`/job/${job._id}`}
                      >
                        See More
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {jobs.length > jobsPerPage && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                size="large"
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                sx={{
                  "& .MuiPaginationItem-root": {
                    
                    borderColor: "#AEB4C1",
                  },
                  "& .MuiPaginationItem-root.Mui-selected": {
                    backgroundColor: "#1A75E8",
                    color: "#fff",
                    borderColor: "#1A75E8",
                    "&:hover": {
                      backgroundColor: "#0F1137",
                    },
                  },
                  "& .MuiPaginationItem-root:hover": {
                    borderColor: "#1A75E8",
                    backgroundColor: "rgba(26, 117, 232, 0.04)",
                  },
                }}
              />
            </Box>
          )}
        </>
      )}
    </Container>

    
  );
}

export default JobsPage;