import { Button, Grid, makeStyles, Paper, TextField } from "@material-ui/core";
import React, { useState } from "react";
// import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function UserSettingsPage() {
  const classes = useStyles();
  console.log(classes);
  const originalEmail = "test@test.com";
  const originalPassword = "*********";
  const originalUsername = "Username";
  const [email, setEmail] = useState(originalEmail);
  const [password, setPassword] = useState(originalPassword);
  const [passwordConfirm, setPasswordConfirm] = useState(originalPassword);
  const [username, setUsername] = useState(originalUsername);

  // let email = "test@test.com";
  return (
    <form noValidate autoComplete="off">
      <div className={classes.root}>
        <Grid
          container
          alignItems="center"
          direction="row"
          spacing={1}
          justify="center"
        >
          <Grid item xs={12}>
            <Paper className={classes.paper}></Paper>
          </Grid>
          <Grid item xs={7} sm={4}>
            <Paper className={classes.paper}>Change email:</Paper>
          </Grid>
          <Grid item xs={5} sm={4}>
            <TextField
              id="outlined-basic"
              label={`Change email ${
                email !== originalEmail ? "*Changed" : ""
              }`}
              variant="outlined"
              defaultValue={originalEmail}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              error={!/\S+@\S+\.\S+/.test(email)}
              helperText={
                !/\S+@\S+\.\S+/.test(email) ? "Please enter a valid email" : ""
              }
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
          <Grid item xs={7} sm={4}>
            <Paper className={classes.paper}>Change password:</Paper>
          </Grid>
          <Grid item xs={5} sm={4}>
            <TextField
              id="outlined-basic"
              label={`New password ${
                password !== originalPassword ? "*Changed" : ""
              }`}
              variant="outlined"
              defaultValue={originalPassword}
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
          <Grid item xs={7} sm={4}>
            <Paper className={classes.paper}>Confirm password:</Paper>
          </Grid>
          <Grid item xs={5} sm={4}>
            <TextField
              id="outlined-basic"
              label="Confirm password"
              variant="outlined"
              defaultValue={originalPassword}
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
              }}
              error={password !== passwordConfirm}
              helperText={
                password !== passwordConfirm ? "Passwords must match" : ""
              }
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
          <Grid item xs={7} sm={4}>
            <Paper className={classes.paper}>Change username:</Paper>
          </Grid>
          <Grid item xs={5} sm={4}>
            <TextField
              error={username.length < 4}
              id="outlined-basic"
              label={`New Username ${
                username !== originalUsername ? "*Changed" : ""
              }`}
              variant="outlined"
              defaultValue={originalUsername}
              helperText={
                username.length < 4 ? "Must be greater than 4 charecters" : ""
              }
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          alignItems="center"
          direction="row"
          spacing={1}
          justify="flex-end"
        >
          <Grid item xs={7} sm={4}>
            <Button variant="contained" color="primary">
              Submit changes
            </Button>
          </Grid>
        </Grid>
        {/* <Button variant="contained" color="primary">
          Submit changes
          to {password !== originalPassword && "password"}{" "}
          {(email !== originalEmail) +
            (password !== originalPassword) +
            (username !== originalUsername) >=
            2 && " and "}{" "}
          {email !== originalEmail && "email"}
          {(email !== originalEmail) +
            (password !== originalPassword) +
            (username !== originalUsername) >=
            3 && " and "}
          {username !== originalUsername && "username"}
        </Button> */}
      </div>
    </form>
  );
}
