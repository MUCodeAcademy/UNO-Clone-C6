import { Button, Grid, makeStyles, TextField, Link } from "@material-ui/core";
import React, { useContext, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import MuiAlert from "@material-ui/lab/Alert";
import { UserContext } from "../../shared/UserContext";
import { NavLink } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UserSettingsPage() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const classes = useStyles();
  const { currentUser, updateEmail, updatePassword } = useContext(UserContext);
  const originalEmail = currentUser.email;
  const [email, setEmail] = useState(originalEmail);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  async function changePassword(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (password !== passwordConfirm) {
      setError("Passwords must match");
      setOpen(true);
      return;
    }
    setLoading(true);
    try {
      await updatePassword(password);
      setSuccess("Successfully updated password");
    } catch (err) {
      setError("Failed to update your account.");
    } finally {
      setLoading(false);
      setOpen(true);
    }
  }

  async function changeEmail(e) {
    e.preventDefault();
    setError("");
    if (!/\S+@\S+\.\S+/.test(email) || email === originalEmail) {
      setError("Invalid email provided");
      setOpen(true);
      return;
    }
    setLoading(true);
    try {
      await updateEmail(email);
      setSuccess("Successfully updated email");
    } catch (err) {
      setError("Failed to update your account.");
    } finally {
      setLoading(false);
      setOpen(true);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          Change Settings
        </Typography>

        <form style={{ marginTop: "30px" }} noValidate autoComplete="off">
          <div className={classes.root}>
            <Grid
              container
              alignItems="center"
              direction="row"
              spacing={1}
              justify="center"
            >
              <Typography component="h4" variant="h6">
                Change Email
              </Typography>
              <Grid item xs={12}>
                <TextField
                  id="new-email"
                  label={`${
                    email !== originalEmail ? "*New Email" : "Current Email"
                  }`}
                  variant="outlined"
                  fullWidth
                  defaultValue={originalEmail}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  error={!/\S+@\S+\.\S+/.test(email)}
                  helperText={
                    !/\S+@\S+\.\S+/.test(email)
                      ? "Please enter a valid email"
                      : ""
                  }
                />
              </Grid>
            </Grid>
            <Grid container alignItems="center" justify="flex-end">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={loading}
                onClick={changeEmail}
              >
                Update Email
              </Button>
            </Grid>
            <Grid
              container
              alignItems="center"
              direction="row"
              spacing={1}
              justify="center"
            >
              <Typography
                style={{ marginTop: "20px" }}
                component="h4"
                variant="h6"
              >
                Change Password
              </Typography>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="new-password"
                  type="password"
                  label={`New password ${password !== "" ? "*Changed" : ""}`}
                  error={password !== passwordConfirm}
                  helperText={
                    password !== passwordConfirm ? "Passwords must match" : ""
                  }
                  variant="outlined"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="center"
              direction="row"
              spacing={1}
              justify="center"
            >
              <Grid item xs={12}>
                <TextField
                  style={{ marginTop: "20px" }}
                  fullWidth
                  id="confirm-password"
                  label="Confirm New Password"
                  variant="outlined"
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => {
                    setPasswordConfirm(e.target.value);
                  }}
                  error={password !== passwordConfirm}
                  helperText={
                    password !== passwordConfirm ? "Passwords must match" : ""
                  }
                />
              </Grid>
              <Grid container alignItems="center" justify="flex-end">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={loading}
                  onClick={changePassword}
                >
                  Update Password
                </Button>
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="center"
              direction="row"
              spacing={1}
              justify="center"
            ></Grid>
            <Grid
              style={{ marginTop: "20px" }}
              container
              alignItems="center"
              direction="row"
              spacing={1}
              justify="flex-end"
            >
              <div>
                <Link component={NavLink} to="/">
                  Cancel
                </Link>
              </div>
            </Grid>
          </div>
        </form>
      </div>
      <Box mt={5}></Box>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={error ? "error" : "success"}>
          {error ? error : success}
        </Alert>
      </Snackbar>
    </Container>
  );
}
