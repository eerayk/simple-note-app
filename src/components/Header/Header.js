import "./Header.css";
import LogoutButton from "./LogoutButton";

const Header = (props) => {
    return (
        <div className="header">
            <h1>Note App</h1>
            <LogoutButton username={props.username}/>
        </div>
    );
}

export default Header;