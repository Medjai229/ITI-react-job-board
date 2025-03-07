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

// fetch companies from api
const companies = [
  {
    id: 1,
    name: 'Bl7 Corp',
    industry: 'bl7',
    website: 'www.example1.com',
    createdBy: 'John Doe',
  },
  {
    id: 2,
    name: 'Btee5 Inc',
    industry: 'btee5',
    website: 'www.example2.com',
    createdBy: 'Jane Smith',
  },
  {
    id: 3,
    name: 'Ay7aga',
    industry: 'kol 7aga',
    website: 'www.example3.com',
    createdBy: 'Mike',
  },
];

export default function AdminCompanies() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h3" mb={4}>
        Companies
      </Typography>
      <TableContainer sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Industry</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Created By</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.industry}</TableCell>
                <TableCell>{company.createdBy}</TableCell>
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
