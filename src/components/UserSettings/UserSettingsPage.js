import { Grid, makeStyles, Paper, TextField } from "@material-ui/core";
import React from "react";
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
  let email = "test@test.com";
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
          {/* <Grid item xs={} /> */}
          <Grid item xs={3}>
            <Paper className={classes.paper}>Change email:</Paper>
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              label="Change email"
              variant="outlined"
              defaultValue={`${email}`}
            />
          </Grid>
          {/* <Grid item xs={3} /> */}
          {/* <Grid item xs={5}>
            <Paper className={classes.paper}>Change password:</Paper>
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              label="new password"
              variant="outlined"
              defaultValue="*********"
            />
          </Grid>
          <Grid item xs={5}></Grid>
          <Grid item xs={7}>
            <TextField
              id="outlined-basic"
              label="Confirm new password"
              variant="outlined"
              defaultValue="*********"
            />
          </Grid> */}
        </Grid>
      </div>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    </form>
  );
}
