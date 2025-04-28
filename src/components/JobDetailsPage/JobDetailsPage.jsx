import React, { useEffect } from "react";
import useJobStore from "../../store/useJobsStore";
import {
  Container,
  Typography,
  Card,
  Box,
  Button,
  Chip,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { useParams } from "react-router-dom";
import BusinessIcon from "@mui/icons-material/Business";

function JobDetailsPage() {
  const { selectedJob, loading, fetchJobDetails } = useJobStore();
  const { id } = useParams();

  useEffect(() => {
    fetchJobDetails(id);
  }, [fetchJobDetails, id]);

  // change date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress sx={{ color: "#1A75E8" }} />
          <Typography variant="body1" sx={{ ml: 2, color: "#0F1137" }}>
            Loading...
          </Typography>
        </Box>
      ) : !selectedJob ? (
        <Typography variant="body1" align="center" sx={{ mt: 4, color: "#0F1137" }}>
          No Job Details!
        </Typography>
      ) : (
        <>
          {/* start top card*/}
          <Card
            sx={{
              width: "100%",
              mb: 4,
              p: { xs: 2, md: 3 },
              boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
              borderRadius: 2,
              backgroundColor: "#F5F6F8",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "center", md: "center" },
              justifyContent: { md: "space-between" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: { xs: "15px", sm: "20px" },
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "center", sm: "center" },
                textAlign: { xs: "center", sm: "left" },
                mb: { xs: 2, md: 0 },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "#F5F6F8",
                  border: "2px solid #1A75E8",
                  color: "#1A75E8",
                  mr: { sm: 2 },
                  mb: { xs: 2, sm: 0 },
                  width: 90,
                  height: 90,
                }}
              >
                <BusinessIcon fontSize="large" />
              </Avatar>
              <Box>
                <Typography
                  variant="h5"
                  sx={{ color: "#0F1137", fontWeight: "bold", mb: 1 }}
                >
                  {selectedJob.title}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "#AEB4C1", mb: 1 }}>
                  {selectedJob.company.name}
                </Typography>
                <Chip
                  label={selectedJob.job_type}
                  variant="outlined"
                  sx={{
                    borderColor: "#1A75E8",
                    color: "#0F1137",
                    fontWeight: "medium",
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                textAlign: "center",
                mt: { xs: 2, md: 0 },
              }}
            >
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#1A75E8",
                  color: "#fff",
                  px: 4,
                  py: 1,
                  borderRadius: 1,
                  width: { xs: "100%", sm: "auto" },
                  "&:hover": { bgcolor: "#0F1137" },
                }}
              >
                Apply Job
              </Button>
              <Typography
                variant="body1"
                sx={{
                  color: "#AEB4C1",
                  mt: 2,
                  width: { xs: "100%", sm: "auto" },
                  maxWidth: { sm: "150px" },
                  mx: "auto",
                }}
              >
                {formatDate(selectedJob.createdAt)}
              </Typography>
            </Box>
          </Card>

          {/* Start main section*/}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* left section*/}
            <Box
              sx={{
                flex: { md: "0 0 70%" },
                width: "100%",
                p: 2,
                bgcolor: "#fff",
                borderRadius: 2,
              }}
            >
              {/*Company Overview */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#0F1137", fontWeight: "bold" }}
                >
                  Company Overview
                </Typography>
                <Box
                  sx={{
                    width: "50px",
                    height: "3px",
                    bgcolor: "#1A75E8",
                    mt: 1,
                    mb: 2,
                  }}
                />
                <Typography variant="body1" sx={{ color: "#AEB4C1" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
                  This is a sample company overview to fill the space.
                </Typography>
              </Box>

              {/*Job Overview */}
              <Box>
                <Typography
                  variant="h6"
                  sx={{ color: "#0F1137", fontWeight: "bold" }}
                >
                  Job Overview
                </Typography>
                <Box
                  sx={{
                    width: "50px",
                    height: "3px",
                    bgcolor: "#1A75E8",
                    mt: 1,
                    mb: 2,
                  }}
                />
                <Typography variant="body1" sx={{ color: "#AEB4C1" }}>
                  <strong>Job Description:</strong> {selectedJob.description}
                </Typography>
              </Box>
            </Box>

            {/* start card*/}
            <Card
              sx={{
                flex: { md: "0 0 30%" },
                width: { xs: "100%", md: "auto" },
                p: 2,
                border: "1px solid #eeee",
                borderRadius: 2,
                backgroundColor: "#fff",
                position: { md: "sticky" },
                top: { md: "20px" },
                height: "fit-content",
                mr: { xs: 0, md: 2 },
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#0F1137", fontWeight: "bold" }}
                >
                  Job Details
                </Typography>
                <Box
                  sx={{
                    width: "50px",
                    height: "3px",
                    bgcolor: "#1A75E8",
                    mt: 1,
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Box>
                  <Typography variant="body2" sx={{ color: "#0F1137", fontWeight: "medium" }}>
                    Job Type
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#AEB4C1" }}>
                    {selectedJob.job_type}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="body2" sx={{ color: "#0F1137", fontWeight: "medium" }}>
                    Location
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#AEB4C1" }}>
                    {selectedJob.location}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Box>
                  <Typography variant="body2" sx={{ color: "#0F1137", fontWeight: "medium" }}>
                    Status
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#AEB4C1" }}>
                    {selectedJob.job_status}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="body2" sx={{ color: "#0F1137", fontWeight: "medium" }}>
                    Created At
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#AEB4C1" }}>
                    {formatDate(selectedJob.createdAt)}
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant="body2" sx={{ color: "#0F1137", fontWeight: "medium" }}>
                  Salary Range
                </Typography>
                <Typography variant="body1" sx={{ color: "#AEB4C1" }}>
                  ${selectedJob.salary_range.min} - ${selectedJob.salary_range.max}
                </Typography>
              </Box>
            </Card>
          </Box>
        </>
      )}
    </Container>
  );
}

export default JobDetailsPage;