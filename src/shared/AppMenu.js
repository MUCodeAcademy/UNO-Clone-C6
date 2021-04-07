import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { UserContext } from "./UserContext";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: 10,
  },
  iconText: {
    marginLeft: 5,
  },
  link: {
    "&:visited": {
      textDecoration: "none",
    },
  },
}));

const AppMenu = () => {
  const classes = useStyles();
  const { currentUser, logOut } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = () => {
    handleClose();
    logOut();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Midland UNO Clone
        </Typography>
        {currentUser && (
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} component={NavLink} to="/home">
                <ListItemIcon>
                  <HomeIcon fontSize="small" />
                  <div className={classes.iconText}>Home</div>
                </ListItemIcon>
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={NavLink}
                to="/settings"
              >
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                  <div className={classes.iconText}>User Settings</div>
                </ListItemIcon>
              </MenuItem>
              <MenuItem onClick={logoutUser}>
                <ListItemIcon>
                  <ExitToAppIcon fontSize="small" />
                  <div className={classes.iconText}>Logout</div>
                </ListItemIcon>
              </MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default AppMenu;
