// src/pages/EditNote.jsx
import { useNavigate, useParams } from "react-router-dom";
import NoteForm from "../components/NoteForm";

export default function EditNote({ getNote, updateNote }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const note = getNote(id);
  if (!note) return <p>Note not found!</p>;

  const handleSubmit = (data) => {
    updateNote(id, data);
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Edit Note</h1>
      <NoteForm initial={note} onSubmit={handleSubmit} />
    </div>
  );
}
