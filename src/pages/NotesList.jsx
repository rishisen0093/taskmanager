import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNotes, deleteNoteAsync } from "../store/notesSlice";
import NoteCard from "../components/NoteCard";

export default function NotesList({ onEdit }) {
  const [searchQuery, setSearchQuery] = useState("");
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(fetchNotes(searchQuery));
    }, 300); 

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteNoteAsync(id));
  };

  return (
    <div>
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {notes.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No notes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={() => handleDelete(note.id)}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
