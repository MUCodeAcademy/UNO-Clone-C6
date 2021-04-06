import React, { useState } from "react";
import {
  Button,
  Grid,
  makeStyles,
  Paper,
  TextField,
  FormControl
} from "@material-ui/core";
import { GameContext } from "../../shared/GameContext";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "25ch",
    },
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  testErr: {
    color: "red",
  },
  TextField: {
    margin: theme.spacing(1),
  },
}));
export default function HomePage() {
  const [gameId, setGameId] = useState(
    Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 8)
  );
  const [joinedRoom, setJoinedRoom] = useState();
  const {setIsHost, createUserInfo} = useContext(GameContext);
  const [username, setUsername] = useState("username");
  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = useState();
  function joinGame(e) {
    e.preventDefault();
    if (gameId.length === 8 && username.length > 3 && username.length < 20){
      return history.push(`/game/${gameId}`)
    }
    else {
      return "Invalid data given"
    }
  }
  
  function createGame(e){
    e.preventDefault();
    try {
      setIsHost(true);
      setGameId(gameId);
      history.push(`/game/${gameId}`);
    } catch (error) {
      setError("Something went wrong, unable to create game")
    }
  }

  function handleUnique (e) {
    e.preventDefault();
    if (username.length < 3 || username.length > 20) {
      return setError("Username must be at least 3 characters and not more than 20.");}
      try {
        setError("");
        createUserInfo(username)
      } catch (error) {
        setError("Something went wrong, unable to create a username");
      }
  }


  return (
    <>
      <FormControl noValidate autoComplete="off">
        <div className={classes.root}>
          <Grid
            container
            alignItems="center"
            direction="row"
            spacing={1}
            justify="center"
          >
            <Grid item xs={12}>
              <Paper className={classes.paper}>Username:</Paper>
            </Grid>
            <TextField
              className={classes.TextField}
              error={error}
              id="outlined-basic"
              label={`Unique username`}
              variant="outlined"
              helperText={
                userName.length < 3 ? "Must be greater than 3 characters" : ""
              }
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </Grid>

          <Grid
            container
            alignItems="center"
            direction="row"
            spacing={1}
            justify="center"
          >
            <Grid item xs={12}>
              <Paper className={classes.paper}>Join game:</Paper>
            </Grid>
            <TextField
              className={classes.TextField}
              id="outlined-basic"
              label={`ID for room to join`}
              variant="outlined"
              defaultValue={joinedRoom}
              onChange={(e) => {
                setJoinedRoom(e.target.value);
              }}
            />

            <Button
              onClick = {() => {joinGame(); handleUnique();}}
              variant="contained"
              color="primary"
            >
              Join Game
            </Button>
          </Grid>
          <Grid
            container
            alignItems="center"
            direction="row"
            spacing={1}
            justify="center"
          >
            <Grid item xs={12}>
              <Paper className={classes.paper}>Create new game:</Paper>
            </Grid>
            <Grid item xs={4} sm={4}>
              <Paper className={classes.paper}>Game ID: {gameId}</Paper>
            </Grid>
            <Button
              onClick={() => {createGame(gameId); handleUnique();}}
              variant="contained"
              color="primary"
            >
              Create Game
            </Button>
          </Grid>
        </div>
      </FormControl>
    </>
  );
}
