import "./NewNoteButton.css";
import { FaPlus } from "react-icons/fa";

const NewNoteButton = (props) => {
  return (
    <div className="new-note-button" onClick={props.newNoteClickHandler}>
      <FaPlus />
      Add Note
    </div>
  );
};

export default NewNoteButton;
