import "./NoteContainer.css";
import Note from "./Note";
import NewNoteButton from "./NewNoteButton";
import { useEffect, useState } from "react";
import NoteModal from "../NoteModal/NoteModal";
import { randomColorProvider } from "../../utils/Util";

const NoteContainer = (props) => {
  const [noteModalVisibilityState, setNoteModalVisibilityState] =
    useState(false);
  const [modalNoteIdState, setModalNoteIdState] = useState(0);
  const [modalTitleState, setModalTitleState] = useState("");
  const [modalContentState, setModalContentState] = useState("");
  const [noteList, setNoteList] = useState([]);

  useEffect(() => {
    setNoteList(props.notes);
  }, [props.notes]);

  const changeModalVisibility = (isVisible) => {
    setNoteModalVisibilityState(isVisible);
  };

  const addNewNoteToList = (note) => {
    setNoteList([note, ...noteList]);
    props.addNoteHandler(note);
  };

  const updateItemInTheNoteList = () => {
    const nodeListCopy = noteList.slice();
    const updatedNodeList = nodeListCopy.map((noteObj) =>
      noteObj.id === modalNoteIdState
        ? { ...noteObj, title: modalTitleState, content: modalContentState }
        : noteObj
    );
    setNoteList(updatedNodeList);
    props.updateNoteHandler(modalNoteIdState,modalTitleState,modalContentState);
  };

  const noteClickHandler = (id, title, content) => {
    if (noteModalVisibilityState) {
      return;
    }
    setNoteModalVisibilityState(true);
    setModalNoteIdState(id);
    setModalTitleState(title);
    setModalContentState(content);
  };

  const newNoteClickHandler = () => {
    if (noteModalVisibilityState) {
      return;
    }
    setNoteModalVisibilityState(true);
    setModalNoteIdState(0);
    setModalTitleState("");
    setModalContentState("");
  };

  const deleteNoteHandler = (noteId) => {
    let noteListCopy = [...noteList];
    noteListCopy = noteListCopy.filter((note) => note.id !== noteId);
    setNoteList(noteListCopy);
    props.deleteNoteHandler(noteId);
  };

  return (
    <div className="note-container">
      {noteList.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          backgroundColor={randomColorProvider(note.id)}
          noteClickHandler={noteClickHandler}
          deleteNoteHandler={deleteNoteHandler}
          modalVisibility={noteModalVisibilityState}
        />
      ))}
      <NewNoteButton newNoteClickHandler={newNoteClickHandler} />
      <NoteModal
        visibility={noteModalVisibilityState}
        setModalVisibility={changeModalVisibility}
        addNewNoteToList={addNewNoteToList}
        userId={props.userId}
        noteId={modalNoteIdState}
        modalTitleState={modalTitleState}
        modalContentState={modalContentState}
        setModalTitleState={setModalTitleState}
        setModalContentState={setModalContentState}
        updateItemInTheNoteList={updateItemInTheNoteList}
      />
    </div>
  );
};

export default NoteContainer;
