import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = ({ route }) => {
  // const noteId = match.params.id;
  const [note, setNote] = useState(null);
  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    getNote();
  }, []);

  async function getNote() {
    try {
      let res = await fetch(`/api/notes/${id}/`);
      let data = await res.json();
      setNote(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function updateNote() {
    fetch(`/api/notes/${id}/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  }

  function handleSubmit() {
    if (id !== "new" && note.body === "") {
      deleteNote();
    } else if (id !== "new") {
      updateNote();
    } else if (id === "new" && note !== null) {
      createNote();
    }
    navigate("/");
  }

  async function deleteNote() {
    fetch(`/api/notes/${id}/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/");
  }

  async function createNote() {
    fetch(`/api/notes/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  }

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {id !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
