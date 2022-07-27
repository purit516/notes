import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import { Link } from "react-router-dom";

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
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft />
          </Link>
        </h3>
      </div>
      <textarea defaultValue={note?.body}></textarea>
    </div>
  );
};

export default NotePage;
