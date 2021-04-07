import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../shared/UserContext";
import {
  Button,
  TextField,
  CssBaseline,
  Link,
  Box,
  Grid,
  Typography,
  makeStyles,
  Container,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

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

export default function ResetPasswordPage() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const { resetPassword } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email)) {
      return setError("Please enter a valid email");
    }
    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(email);
      setMessage("Check your email inbox for further instructions.");
    } catch (err) {
      setError("Failed to reset password.");
    }
    setLoading(false);
  }
  return (
    <Container component="main" maxWidth="xs">
      <Box borderRadius={25} p={2} border={1} borderColor="#000">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {message && <Alert severity="success">{message}</Alert>}
          <form onSubmit={handleSubmit} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>{" "}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
            >
              Reset Password
            </Button>
            <Grid container>
              <Grid item xs>
                <Link component={NavLink} to="/login" variant="body2">
                  Remember your password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={NavLink} to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}></Box>
      </Box>
    </Container>
  );
}
