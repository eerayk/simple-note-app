import "./SearchItem.css";

const SearchItem = (props) => {
    return (
    <div className="search-item" onClick={() => props.repeatOldSearch(props.children)}>
        <span>{props.children}</span>
    </div>
    );
}

export default SearchItem;