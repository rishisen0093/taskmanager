import React from "react";
import NoteForm from "../components/NoteForm";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNoteAsync } from "../store/notesSlice";
export default function AddNote() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAdd = async (data) => {
    try {
      await dispatch(addNoteAsync(data)).unwrap();
      navigate("/"); 
    } catch (err) {
      console.error("Failed to add note:", err);
      alert("Failed to add note. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Note</h2>
      <NoteForm onSubmit={handleAdd} />
    </div>
  );
}
