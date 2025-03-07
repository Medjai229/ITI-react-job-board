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

// fetch applications from api
const applications = [
  {
    id: 1,
    job: 'jobID 1',
    applicant: 'userID 1',
    status: 'pending',
  },
  {
    id: 2,
    job: 'jobID 2',
    applicant: 'userID 1',
    status: 'reviwed',
  },
  {
    id: 1,
    job: 'jobID 2',
    applicant: 'userID 3',
    status: 'rejected',
  },
];

export default function AdminApplications() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h3" mb={4}>
        Applications
      </Typography>
      <TableContainer sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Job</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Applicant</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{app.job}</TableCell>
                <TableCell>{app.applicant}</TableCell>
                <TableCell>{app.status}</TableCell>
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
