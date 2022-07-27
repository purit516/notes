import React, { useState, useEffect } from "react";
import ListItem from "../components/ListItem";

const NotesListPage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  async function getNotes() {
    let res = await fetch("/api/notes/");
    let data = await res.json();
    console.log("DATA: ", data);
    setNotes(data);
  }

  return (
    <div>
      <div className="notes-list">
        {notes.map((note, index) => (
          <ListItem note={note} key={index} />
        ))}
      </div>
    </div>
  );
};

export default NotesListPage;
