import { React, useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: 2,
    width: "calc(100% - 4px)",
    flexBasis: "100%",
  },
  chatEntry: {
    flexBasis: 50,
  },
  chatDisplay: {
    display: "flex",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    flexDirection: "column",
    overflowY: `auto`,
    textOverflow: `clip`,
    flexBasis: 100,
    flexGrow: 1,
  },
  chatInput: {
    marginBottom: 10,
    width: "100%",
  },
  chatButton: {
    width: "100%",
  },
  chat: {},
}));
const Chat = (props) => {
  //Chat will need the Username and the Room passed through props
  const msgEndRef = useRef(null);
  const scrollToBottom = () => {
    msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [msg, setMsg] = useState("");
  useEffect(() => {
    scrollToBottom();
  }, [props.messages]);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.chatDisplay}>
        {props.messages[0].length > 0 &&
          props.messages[0].map((m, idx) => {
            return (
              <div
                className={classes.chat}
                style={{ textAlign: "left" }}
                key={idx}
              >
                <b>{m.username}</b>
                <div style={{ maxWidth: "200px" }}>{m.body}</div>
              </div>
            );
          })}
        <div ref={msgEndRef} />
      </div>
      <div className={classes.chatEntry}>
        <TextField
          multiline
          placeholder="Chat here..."
          value={msg}
          className={classes.chatInput}
          onChange={(evt) => {
            setMsg(evt.target.value);
          }}
        ></TextField>
        <Button
          className={classes.chatButton}
          variant="contained"
          color="primary"
          onClick={() => {
            if (msg) {
              props.sendMessage(msg);
              setMsg("");
            }
          }}
        >
          Send
        </Button>
        {/* <button onClick = {()=>{props.joinRoom()}}>Join Room</button>  */}
      </div>
    </div>
  );
};
export default Chat;
