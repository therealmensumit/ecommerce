// Login.js
import React from "react";
import { connect } from "react-redux";
import { login } from "./actions/authActions";

const Login = ({ login }) => {
  const handleLogin = () => {
    // Your authentication logic
    login(); // Dispatch the login action
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default connect(null, { login })(Login);
