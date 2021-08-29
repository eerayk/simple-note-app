import "./LeftMenu.css";
import SearchHistory from "./SearchHistory";
import SearchBar from "./SearchBar";
import { useState } from "react";

const LeftMenu = (props) => {
  const [searchHistoryListState, setSearchHistoryListState] = useState([]);
  const [searchBarState, setSearchBarState] = useState("");
  const newSearchHandler = (newSearchStr, isSearchFromHistory) => {
    if (newSearchStr !== "" && !isSearchFromHistory) {
      const searchHistoryListCopy = [...searchHistoryListState];
      searchHistoryListCopy.unshift(newSearchStr);
      setSearchHistoryListState(searchHistoryListCopy);
    }
    setSearchBarState(newSearchStr);

    const filteredArray = props.allNotes.filter(
      (n) => n.title.includes(newSearchStr) || n.content.includes(newSearchStr)
    );
    props.setFilteredNotes(filteredArray);
  };
  return (
    <div className="left-menu">
      <SearchBar
        newSearchHandler={newSearchHandler}
        searchBarState={searchBarState}
      />
      <SearchHistory
        newSearchHandler={newSearchHandler}
        searchHistoryListState={searchHistoryListState}
      />
    </div>
  );
};

export default LeftMenu;
