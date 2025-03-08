import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const Navbar = () => {
  const { token, logout } = useAuthStore();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My App
        </Typography>

        {token ? (
          <>
            <Button color="inherit" component={NavLink} to="/home">
              Home
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                logout();
                navigate("/login");  // Redirect after logout

              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={NavLink} to="/login">
              Login
            </Button>
            <Button color="inherit" component={NavLink} to="/">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
