import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

const NotePage = ({ route }) => {
  // const noteId = match.params.id;
  const [note, setNote] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getNote();
  }, []);

  async function getNote() {
    let res = await fetch(`/api/notes/${id}/`);
    let data = await res.json();
    setNote(data);
  }

  return (
    <div>
      <p>{note?.body}</p>
    </div>
  );
};

export default NotePage;
