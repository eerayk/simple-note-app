import { useState } from "react";
import "./LoginForm.css";

const LoginForm = (props) => {
  const [formInput, setFormInput] = useState({ username: "", password: "" });

  const submitHandler = (e) => {
    e.preventDefault();
    props.loginButtonHandler(formInput);
  };

  return (
    <div className="login-form">
      <form onSubmit={submitHandler}>
        <h2>Login</h2>
        {props.errorMessage !== "" ? (
          <div className="error">{props.errorMessage}</div>
        ) : (
          ""
        )}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            onChange={(e) =>
              setFormInput({ ...formInput, username: e.target.value })
            }
            value={formInput.username}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            onChange={(e) =>
              setFormInput({ ...formInput, password: e.target.value })
            }
            value={formInput.password}
          />
        </div>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default LoginForm;
