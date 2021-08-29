import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import { Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";

function App() {
  const history = useHistory();
  const [user, setUser] = useState({ username: "", id: 0 });

  useEffect(() => {
    const loggedInUserId = localStorage.getItem("userId");
    if (loggedInUserId !== "0" && loggedInUserId !== null) {
      setUser({
        username: localStorage.getItem("username"),
        id: loggedInUserId,
      });
      history.push("/dashboard")
    }
  }, [history]);

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={() => <Login setUser={setUser} />} />
        <Route path="/dashboard" component={() => <Dashboard user={user} />} />
        <Route path="*" component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
