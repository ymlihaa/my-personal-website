import React, { useRef, useState } from "react";
import { useAuth } from "../context/auth-context";
import { Link, useHistory } from "react-router-dom";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <div
        className="card text-center"
        style={{
          minWidth: "350px",
          boxShadow: " 0 0 30px rgba(0, 0, 0, 0.18)",
        }}
      >
        <div className="card-body d-flex flex-column align-items-center justify-content-center">
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group" id="email">
              <label for="email">Email Adress</label>
              <input
                className="form-control"
                type="email"
                id="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
                disabled={true}
              />
            </div>
            <div className="form-group" id="password">
              <label for="password">Password</label>
              <input
                id="password"
                className="form-control"
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </div>
            <div className="form-group" id="password-confirm">
              <label for="confirm-password">Password Confirmation</label>
              <input
                id="confirm-password"
                className="form-control"
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
            </div>
            <button
              type="button"
              disabled={loading}
              type="submit"
              class="btn btn-primary"
            >
              Update
            </button>
            <div className="w-100 text-center mt-2">
              <Link to="/">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
