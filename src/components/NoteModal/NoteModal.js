import { useState } from "react";
import customFetch from "../../services/FetchService";
import { randomColorProvider } from "../../utils/Util";
import "./NoteModal.css";
import { BASE_API_URL, ADD_NOTE_URL, UPDATE_NOTE_URL } from "../../utils/Constants";

const NoteModal = (props) => {
  const [errorMessage, setErrorMessage] = useState("");

  const submitNoteForm = (e) => {
    e.preventDefault();

    if (props.modalTitleState === "" && props.modalContentState === "") {
      setErrorMessage("Both title and content can not be empty.");
      return;
    }
    if (props.noteId === 0) {
      // Add new note
      const postData = {
        userId: props.userId,
        title: props.modalTitleState,
        content: props.modalContentState,
      };

      customFetch("POST", `${BASE_API_URL}/${ADD_NOTE_URL}`, postData)
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              if (data.error) {
                setErrorMessage(data.message);
              } else {
                setErrorMessage("");
                props.setModalTitleState("");
                props.setModalContentState("");
                props.addNewNoteToList({
                  id: data.noteId,
                  title: data.title,
                  content: data.content,
                });
                props.setModalVisibility(false);
              }
            });
          } else {
            setErrorMessage("Note request failed.");
          }
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage("Connection error.");
        });
    } else {
      // Update existing note
      const putData = {
        noteId: props.noteId,
        title: props.modalTitleState,
        content: props.modalContentState,
      };
      customFetch("PUT", `${BASE_API_URL}/${UPDATE_NOTE_URL}`, putData)
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              if (data.error) {
                setErrorMessage(data.message);
              } else {
                setErrorMessage("");
                props.setModalTitleState("");
                props.setModalContentState("");
                props.updateItemInTheNoteList();
                props.setModalVisibility(false);
              }
            });
          } else {
            setErrorMessage("Note update request failed.");
          }
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage("Connection error.");
        });
    }
  };

  const cancelHandler = () => {
    setErrorMessage("");
    props.setModalTitleState("");
    props.setModalContentState("");
    props.setModalVisibility(false);
  };

  return (
    <div
      className="note-modal"
      style={
        props.visibility
          ? {
              display: "block",
              backgroundColor: randomColorProvider(props.noteId),
            }
          : { display: "none" }
      }
    >
      <form onSubmit={submitNoteForm}>
        <div
          className="error-message"
          style={
            errorMessage === "" ? { display: "none" } : { display: "block" }
          }
        >
          {errorMessage}
        </div>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            onChange={(e) => props.setModalTitleState(e.target.value)}
            value={props.modalTitleState}
          />
        </div>
        <div className="form-group">
          <label>Content:</label>
          <textarea
            type="text"
            name="content"
            onChange={(e) => props.setModalContentState(e.target.value)}
            value={props.modalContentState}
          />
        </div>
        <div className="modal-buttons">
          <input type="button" value="Cancel" onClick={cancelHandler} />
          <input
            type="submit"
            value={props.noteId === 0 ? "Add Note" : "Update"}
          />
        </div>
      </form>
    </div>
  );
};

export default NoteModal;
