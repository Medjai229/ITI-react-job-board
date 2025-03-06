import * as React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function AdminDashboard() {
  // fetch real data through api
  const stats = [
    {
      title: 'Jobs',
      count: 120,
      icon: WorkIcon,
    },
    {
      title: 'Users',
      count: 500,
      icon: PeopleIcon,
    },
    {
      title: 'Companies',
      count: 75,
      icon: ApartmentIcon,
    },
    {
      title: 'Applications',
      count: 320,
      icon: AssignmentIcon,
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h3" mb={4}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((item, index) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
            <Paper
              elevation={2}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2,
                py: 5,
                borderRadius: 2,
                backgroundColor: '#2196f3',
                color: '#fff',
              }}
            >
              <item.icon sx={{ fontSize: 80, mb: 3 }} />
              <Typography variant="h3" fontWeight="bold" mb={1}>
                {item.count}
              </Typography>
              <Typography variant="h5">{item.title}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
