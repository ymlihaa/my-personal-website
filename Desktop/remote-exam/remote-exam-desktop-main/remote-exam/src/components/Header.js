import React, { useState } from "react";
import { Navbar } from "react-bootstrap";
import { useAuth } from "../context/auth-context";
import { Link, useHistory } from "react-router-dom";

function Header() {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  const flexCol = {
    display: "flex",
    alignItems: "flex-end",
  };
  const ul = {
    dispay: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
  };
  const li = {
    display: "inline-block",
    color: "white",
  };

  const headerLi = (
    <>
      {" "}
      <li style={li}>{currentUser && currentUser.email}</li>
      <li style={li} onClick={handleLogout}>
        <i class="fas fa-sign-out-alt"></i>
      </li>
    </>
  );
  return (
    <div
      style={{
        width: "100%",
        height: 40,
        backgroundColor: "#32be8f",
        boxShadow: "0 0 30px rgba(0, 0, 0, 0.18)",
      }}
    >
      <ul style={ul}>
        <li style={li}>Logo</li>
        {currentUser && headerLi}
      </ul>
    </div>
  );
}

export default Header;

// style={{
//     backgroundColor: "#32be8f",
//     boxShadow: "0 0 30px rgba(0, 0, 0, 0.18)",
//   }
