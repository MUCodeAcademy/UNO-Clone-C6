import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Container,
  Box,
  CssBaseline,
  Typography,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { GameContext } from "../../shared/GameContext";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  testErr: {
    color: "red",
  },
  join: {
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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
  const [joinedRoom, setJoinedRoom] = useState("");
  const { setIsHostCon, createUserInfo, setRoom, userInfo } = useContext(
    GameContext
  );
  const [username, setUsername] = useState("");
  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = useState("");

  useEffect(() => {
    resetContext();
  }, []);

  function joinGame(e) {
    // e.preventDefault();
    if (
      joinedRoom.length === 8 &&
      username.length > 3 &&
      username.length < 20
    ) {
      setRoom(joinedRoom);
      return history.push(`/game/${joinedRoom}`);
    } else {
      setError("Invalid game room id given.");
    }
  }

  function createGame() {
    if (error.length === 0) {
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

  function handleUnique() {
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
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Username
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                error={error.length > 0}
                label="Unique username"
                fullWidth
                required
                name="username"
                autoComplete="username"
                helperText={
                  username.length < 3 ? "Must be greater than 3 characters" : ""
                }
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Game ID to Join
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="joined-room"
                label="Room to Join"
                variant="outlined"
                value={joinedRoom}
                onChange={(e) => {
                  setJoinedRoom(e.target.value);
                }}
              />
            </Grid>
            <Button
              fullWidth
              type="submit"
              onClick={() => {
                handleUnique();
                joinGame();
              }}
              disabled={
                joinedRoom.length !== 8 ||
                username.length < 3 ||
                username.length > 20
              }
              variant="contained"
              color="primary"
            >
              Join Game
            </Button>
          </Grid>
        </div>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            New Game ID: {gameId}
          </Typography>
          <Grid container spacing={2}>
            <Button
              fullWidth
              className={classes.join}
              type="submit"
              onClick={() => {
                handleUnique();
                createGame(gameId);
              }}
              disabled={username.length < 3 || username.length > 20}
              variant="contained"
              color="primary"
            >
              Create Game
            </Button>
          </Grid>
        </div>
      </Box>
    </Container>
  );
}
