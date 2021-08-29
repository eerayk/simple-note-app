import "./Note.css";
import customFetch from "../../services/FetchService";
import { FaRegTrashAlt } from "react-icons/fa";
import { BASE_API_URL, DELETE_NOTE_URL } from "../../utils/Constants";

const Note = (props) => {
  const deleteButtonHandler = (e) => {
    e.stopPropagation();
    if(props.modalVisibility){
        return;
    }
    if (
      window.confirm("Are you sure to delete note with title: " + props.title)
    ) {
      customFetch(
        "DELETE",
        `${BASE_API_URL}/${DELETE_NOTE_URL}?noteId=${props.id}`
      )
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              if (data.error) {
                alert(data.message);
              } else {
                props.deleteNoteHandler(props.id);
              }
            });
          } else {
            alert("An error occured while deleting the note.");
          }
        })
        .catch((error) =>
          console.log("Error occured while deleting notes: " + error)
        );
    } else {
      return;
    }
  };
  return (
    <div
      className="note"
      onClick={() =>
        props.noteClickHandler(props.id, props.title, props.content)
      }
      style={{ backgroundColor: props.backgroundColor }}
    >
      <div className="delete-note-button" onClick={deleteButtonHandler}><FaRegTrashAlt/></div>
      <h3>{props.title}</h3>
      <p>{props.content}</p>
    </div>
  );
};

export default Note;
