import { useState } from "react";

export default function useNotes() {
  const [notes, setNotes] = useState([]);

  const addNote = (note) => {
    setNotes([{ ...note, id: Date.now().toString(), createdAt: new Date() }, ...notes]);
  };

  const updateNote = (id, updated) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, ...updated } : n)));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  return { notes, addNote, updateNote, deleteNote };
}
