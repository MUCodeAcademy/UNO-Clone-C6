import React, { useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../shared/UserContext";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
export default function ResetPasswordPage() {
  const emailRef = useRef();
  const { resetPassword } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setMessage("");
      setError("");
      setLoading(true);
      setOpen(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your email inbox for further instructions.");
    } catch {
      setError("Failed to reset password.");
    }
    setLoading(false);
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <>
      <main>
        <form>
          <div>
            <h2>Reset Password</h2>
            <div className="error-area">
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                {error && <Alert severity="error">{error}</Alert>}
                {message && <Alert severity="success">{message}</Alert>}
              </Snackbar>
            </div>
            <form onSubmit={handleSubmit}>
              <div id="email">
                <label>Email</label>
                <input type="email" ref={emailRef} required />
              </div>
              <Button
                variant="contained"
                color="primary"
                disabled={loading}
                type="submit"
              >
                Reset Password
              </Button>
            </form>
            <div>{/* <Link to="/login">Login</Link> */}</div>
            <div>
              {/* Don't have an account? <Link to="signup">Sign Up</Link> */}
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
