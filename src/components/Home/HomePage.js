import React, { useState, useContext } from "react";
import {
  Button,
  Grid,
  makeStyles,
  Paper,
  TextField,
  FormControl,
  Container,
  Box,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { GameContext } from "../../shared/GameContext";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      // width: "65ch",
      maxWidth: "65ch",
      minWidth: "25ch",
      marginLeft: 0,
      marginRight: 0,
    },
    paddingLeft: 0,
    paddingRight: 0,
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function HomePage() {
  const [gameId] = useState(
    Math.random().toString(36).substring(2, 4) +
      Math.random().toString(36).substring(2, 8)
  );
  const [joinedRoom, setJoinedRoom] = useState();
  const { setIsHostCon, createUserInfo, setRoom, userInfo } = useContext(
    GameContext
  );
  const [username, setUsername] = useState("");
  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = useState("");

  function joinGame(e) {
    // e.preventDefault();
    if (gameId.length === 8 && username.length > 3 && username.length < 20) {
      return history.push(`/game/${gameId}`);
    } else {
      setError("Invalid game room id given.");
    }
  }

  function createGame(e) {
    // e.preventDefault();
    if (error.length > 0) {
      try {
        createUserInfo(username);
        setRoom(gameId);
        setIsHostCon(true);
        history.push(`/game/${gameId}`);
      } catch (error) {
        setError("Unable to create game.");
      }
    }
  }

  function handleUnique(e) {
    // e.preventDefault();
    if (username.length < 3 || username.length > 20) {
      return setError("Invalid username, must be between 3 and 20 characters.");
    }
    try {
      setError("");
      createUserInfo(username);
    } catch (error) {
      setError("Unable to create username at this time.");
    }
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box borderRadius={25} p={2} border={1} borderColor="#000">
        <FormControl noValidate autoComplete="off">
          <div className={classes.root}>
            <Grid
              container
              alignItems="center"
              direction="row"
              spacing={1}
              justify="center"
            >
              {/* <h2>Create a Username and Game or Join a Game</h2> */}
              <Grid item sm={12}>
                <Paper className={classes.paper}>
                  <h2>Create a Username and Game or Join a Game</h2>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>Username:</Paper>
              </Grid>
              <TextField
                className={classes.TextField}
                error={error.length > 0}
                id="outlined-basic1"
                label={`Unique username`}
                variant="outlined"
                autoFocus
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
                  handleUnique();
                  joinGame();
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
                  handleUnique();
                  createGame(gameId);
                }}
                variant="contained"
                color="primary"
              >
                Create Game
              </Button>
            </Grid>
          </div>
        </FormControl>
      </Box>
    </Container>
  );
}
