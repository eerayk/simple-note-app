import { useHistory } from "react-router-dom";
import "./LogoutButton.css";

const Logoutbutton = (props) => {
  const history = useHistory();
  const logoutHandler = () => {
    localStorage.setItem("userId", 0);
    localStorage.setItem("username", "");
    history.push("/");
  };
  return (
    <div className="logout-div">
      <div>{props.username}</div>
      <div className="logout-button" onClick={logoutHandler}>
        Logout
      </div>
    </div>
  );
};

export default Logoutbutton;
