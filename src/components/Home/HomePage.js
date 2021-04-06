import React, { useState, useContext } from "react";
import {
  Button,
  Grid,
  makeStyles,
  Paper,
  TextField,
  FormControl,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
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
    Math.random().toString(36).substring(2, 4) +
      Math.random().toString(36).substring(2, 8)
  );
  const [joinedRoom, setJoinedRoom] = useState();
<<<<<<< HEAD
  const {
    setIsHost,
    createUserInfo,
    setRoom,
    userInfo,
    setUserInfo,
  } = useContext(GameContext);
  const [username, setUsername] = useState("");
=======
  const { setIsHost, createUserInfo } = useContext(GameContext);
  const [username, setUsername] = useState("username");
>>>>>>> master
  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = useState();

<<<<<<< HEAD
  function joinGame(e) {
    // e.preventDefault();
=======
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  function joinGame(e) {
    e.preventDefault();
>>>>>>> master
    if (gameId.length === 8 && username.length > 3 && username.length < 20) {
      return history.push(`/game/${gameId}`);
    } else {
      return "Invalid data given";
    }
  }

<<<<<<< HEAD
  // function createGameID() {
  //   let id =
  //     Math.random().toString(36).substring(2, 4) +
  //     Math.random().toString(36).substring(2, 8);
  //   setGameId(id);
  // }

  function createGame(e) {
    // e.preventDefault();
=======
  function createGame(e) {
    e.preventDefault();
>>>>>>> master
    try {
      createUserInfo(username);
      history.push(`/game/${gameId}`);
      setRoom(gameId);
      setIsHost(true);
      console.log(userInfo);
    } catch (error) {
<<<<<<< HEAD
      console.log();
      setError("Unable to create game.");
=======
      setError("Something went wrong, unable to create game");
>>>>>>> master
    }
  }

  function handleUnique(e) {
<<<<<<< HEAD
    // e.preventDefault();
    if (username.length < 3 || username.length > 20) {
      return setError("Invalid username, must be between 3 and 20 characters.");
=======
    e.preventDefault();
    if (username.length < 3 || username.length > 20) {
      return setError(
        "Username must be at least 3 characters and not more than 20."
      );
>>>>>>> master
    }
    try {
      setError("");
      createUserInfo(username);
    } catch (error) {
<<<<<<< HEAD
      setError("Unable to create username at this time.");
=======
      setError("Something went wrong, unable to create a username");
>>>>>>> master
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
                username.length < 3 ? "Must be greater than 3 characters" : ""
              }
              onChange={(e) => {
                e.preventDefault();
                setUsername(e.target.value);
              }}
            />
          </Grid>
          {error && <Alert severity="error">{error}</Alert>}
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
                e.preventDefault();
                setJoinedRoom(e.target.value);
              }}
            />

            <Button
              onClick={() => {
<<<<<<< HEAD
                handleUnique();
                joinGame();
=======
                joinGame();
                handleUnique();
>>>>>>> master
              }}
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
              onClick={() => {
<<<<<<< HEAD
                handleUnique();
                createGame(gameId);
=======
                createGame(gameId);
                handleUnique();
>>>>>>> master
              }}
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
