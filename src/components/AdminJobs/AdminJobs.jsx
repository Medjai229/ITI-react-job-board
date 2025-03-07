import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// fetch jobs from api
const jobs = [
  {
    id: 1,
    title: 'Job 1',
    description: 'this the first job',
    salary: { min: 5000, max: 10000 },
    location: 'new york',
    status: 'open',
  },
  {
    id: 2,
    title: 'Job 2',
    description: 'this the second job',
    salary: { min: 2000, max: 8000 },
    location: 'cairo',
    status: 'closed',
  },
  {
    id: 3,
    title: 'Job 3',
    description: 'this the third job',
    salary: { min: 5000, max: 10000 },
    location: 'uk',
    status: 'open',
  },
];

export default function AdminJobs() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h3" mb={4}>
        Jobs
      </Typography>
      <TableContainer sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Salary</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>
                  {job.salary.min}-{job.salary.max}
                </TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.status}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
