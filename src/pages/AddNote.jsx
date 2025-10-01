import React from "react";
import NoteForm from "../components/NoteForm";
import { useNavigate } from "react-router-dom";

export default function AddNote({ addNote }) {
  const navigate = useNavigate();

  const handleAdd = (data) => {
    addNote(data);
    navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Note</h2>
      <NoteForm onSubmit={handleAdd} />
    </div>
  );
}
