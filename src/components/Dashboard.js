import "./Dashboard.css";
import LeftMenu from "./LeftMenu/LeftMenu";
import NoteContainer from "./Note/NoteContainer";
import Header from "./Header/Header";
import customFetch from "../services/FetchService";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { BASE_API_URL, GET_NOTES_OF_THE_USER_URL } from "../utils/Constants";

const Dashboard = (props) => {
  const history = useHistory();
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    if (props.user.id === 0 || localStorage.getItem("userId") === 0) {
      history.push("/");
      return;
    }

    const asyncFetchNotes = async () => {
      await customFetch(
        "GET",
        `${BASE_API_URL}/${GET_NOTES_OF_THE_USER_URL}?userId=${props.user.id}`
      )
        .then((response) => {
          if (response.ok) {
            response.json().then((notesInDb) => {
              notesInDb.sort((a, b) =>
                a.id < b.id ? 1 : b.id < a.id ? -1 : 0
              ); // Order list by noteId desc
              setNotes(notesInDb);
              setFilteredNotes(notesInDb);
            });
          } else {
            console.log("Error occured while fetching the notes of the user.");
          }
        })
        .catch((error) => {
          console.log("Error while fetching notes: " + error);
        });
    };
    asyncFetchNotes();
  }, [props.user.id, history]);

  const updateNoteHandler = (noteId,newTitle,newContent) => {
    const nodeListCopy = notes.slice();
    const updatedNodeList = nodeListCopy.map((noteObj) =>
      noteObj.id === noteId
        ? { ...noteObj, title: newTitle, content: newContent }
        : noteObj
    );
    setNotes(updatedNodeList);
  };

  const addNoteHandler = (note) => {
    setNotes([note,...notes]);
  };

  const deleteNoteHandler = (noteId) => {
    let noteListCopy = [...notes];
    noteListCopy = noteListCopy.filter((note) => note.id !== noteId);
    setNotes(noteListCopy);
  };

  return (
    <div>
      <Header username={props.user.username} />
      <div className="dashboard">
        <LeftMenu allNotes={notes} setFilteredNotes={setFilteredNotes} />
        <NoteContainer
          notes={filteredNotes}
          updateNoteHandler={updateNoteHandler}
          addNoteHandler={addNoteHandler}
          deleteNoteHandler={deleteNoteHandler}
          userId={props.user.id}
        />
      </div>
    </div>
  );
};

export default Dashboard;
