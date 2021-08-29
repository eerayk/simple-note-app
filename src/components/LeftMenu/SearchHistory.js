import "./SearchHistory.css";
import SearchItem from "./SearchItem";
import {AiOutlinePushpin} from "react-icons/ai";

const SearchHistory = (props) => {
  const repeatOldSearch = (oldSearchStr) => {
    props.newSearchHandler(oldSearchStr, true);
  };

  const showAllHandler = () => {
    props.newSearchHandler("", true);
  };
  return (
    <div className="search-history">
      <SearchItem repeatOldSearch={showAllHandler}><AiOutlinePushpin style={{marginRight:"5px"}}/>Show All</SearchItem>
      {props.searchHistoryListState.map((searchStr, index) => (
        <SearchItem key={index} repeatOldSearch={repeatOldSearch}>
          {searchStr}
        </SearchItem>
      ))}
    </div>
  );
};

export default SearchHistory;
