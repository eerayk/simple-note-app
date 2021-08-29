import { useState } from "react";
import "./Login.css";
import LoginForm from "./LoginForm";
import customFetch from "../../services/FetchService";
import { useHistory } from "react-router";
import { BASE_API_URL, LOGIN_URL } from "../../utils/Constants";

const Login = (props) => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");

  const loginButtonHandler = (formInput) => {

    customFetch("POST", `${BASE_API_URL}/${LOGIN_URL}`, formInput)
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            if (data.error) {
              setErrorMessage(data.message);
            } else {
              setErrorMessage("");
              props.setUser({ username: formInput.username, id: data.userId }); 
              localStorage.setItem("userId", data.userId); 
              localStorage.setItem("username", formInput.username);
              history.push("/dashboard");
            }
          });
        } else {
          setErrorMessage("Login request failed.");
          console.log("Login request failed.");
        }
      })
      .catch((error) => {
        setErrorMessage("Connection error.");
        console.log(error);
      });
  };

  return (
    <div className="login">
      <LoginForm
        loginButtonHandler={loginButtonHandler}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default Login;
