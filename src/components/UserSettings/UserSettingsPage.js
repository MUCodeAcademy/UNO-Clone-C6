import { Button, Grid, makeStyles, Paper, TextField, Link } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../shared/UserContext";

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
  testErr: {
    color: "red",
  },
}));

export default function UserSettingsPage() {
  const classes = useStyles();
  const {
    currentUser,
    updateEmail,
    updatePassword,
  } = useContext(UserContext);
  const originalEmail = currentUser.email;
  const originalPassword = "*********";
  const [email, setEmail] = useState(originalEmail);
  const [password, setPassword] = useState(originalPassword);
  const [passwordConfirm, setPasswordConfirm] = useState(originalPassword);
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory(0);

  function handleSubmit(e) {
    setErrors("");
    e.preventDefault();
    if (password !== passwordConfirm) {
      return setErrors("Passwords must match");
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return setErrors("Please enter a valid email");
    }

    const upDates = [];
    setLoading(true);
    setErrors("");

    if (email !== originalEmail) {
      upDates.push(updateEmail(email));
    }

    if (password !== originalPassword) {
      upDates.push(updatePassword(password));
    }

    Promise.all(upDates)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setErrors("Failed to update your account.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

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
              type="password"
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
              type="password"
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
          
        </Grid>
        <Grid
          container
          alignItems="center"
          direction="row"
          spacing={1}
          justify="flex-end"
        >
          <Grid item xs={7} sm={4}>
            <Paper className={classes.paper} className={classes.testErr}>
              {errors}
            </Paper>
          </Grid>
          <Grid item xs={7} sm={4}>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              variant="contained"
              color="primary"
            >
              Submit changes
            </Button>
            <div>
                <Link href="/">Cancel</Link>
            </div>
          </Grid>
          
        </Grid>
      </div>
    </form>
  );
}
