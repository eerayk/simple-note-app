import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";

const SearchBar = (props) => {
  const [searchStringState, setSearchStringState] = useState("");

  useEffect(() => {
    setSearchStringState(props.searchBarState);
  }, [props.searchBarState]);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      props.newSearchHandler(e.target.value, false);
    }
  };

  const onChangeHandler = (e) => {
    setSearchStringState(e.target.value);
    if (e.target.value === "") {
      props.newSearchHandler("", true);
    } else {
      props.newSearchHandler(e.target.value, true);
    }
  };

  return (
    <div className="search-bar">
      <label>Search:</label>
      <div className="search-input">
        <FaSearch />
        <input
          type="text"
          placeholder="Type and hit enter to save search"
          onChange={onChangeHandler}
          onKeyDown={handleKeyDown}
          value={searchStringState}
        />
      </div>
    </div>
  );
};

export default SearchBar;
