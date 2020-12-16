import React, { useState } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ handleLoginSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    handleLoginSubmit(username, password);
    setUsername("");
    setPassword("");
  };

  const handleUsernameChange = ({ target }) => setUsername(target.value);
  const handlePasswordChange = ({ target }) => setPassword(target.value);

  return (
    <>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="Username">username</label>
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="Password">password</label>
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

LoginForm.propTypes = {
  handleLoginSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func,
  handlePasswordChange: PropTypes.func,
  username: PropTypes.string,
  password: PropTypes.string,
};

export default LoginForm;
