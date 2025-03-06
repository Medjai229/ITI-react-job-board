import { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material/';

import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AssignmentIcon from '@mui/icons-material/Assignment';

const drawerWidth = 240;

export default function AdminPanel() {
  const [sideDrawer, setSideDrawer] = useState(false);

  const sections = [
    { name: 'Users', icon: <PeopleIcon /> },
    { name: 'Jobs', icon: <WorkIcon /> },
    { name: 'Companies', icon: <ApartmentIcon /> },
    { name: 'Applications', icon: <AssignmentIcon /> },
  ];

  const drawer = (
    <Box>
      <Toolbar>
        <Typography
          variant="h5"
          align="center"
          sx={{ flexGrow: 1, pt: 1, fontWeight: '700 ' }}
        >
          Admin Panel
        </Typography>
      </Toolbar>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {sections.map((section) => (
          <ListItem key={section.name} disablePadding>
            <ListItemButton>
              <ListItemIcon>{section.icon}</ListItemIcon>
              <ListItemText primary={section.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* snadwich button to open the side nav */}
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={() => {
          setSideDrawer(true);
        }}
        sx={{
          position: 'absolute',
          top: 8,
          left: 16,
          display: { sm: 'none' },
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* side nav */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* mobile drawer */}
        <Drawer
          variant="temporary"
          open={sideDrawer}
          onClose={() => {
            setSideDrawer(false);
          }}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        {/* fixed side nav for large screen */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* admin components */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 4,
        }}
      >
        <Typography sx={{ mt: 2 }}>routing to diff admin components</Typography>
      </Box>
    </Box>
  );
}
