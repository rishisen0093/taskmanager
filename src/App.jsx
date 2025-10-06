import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchNotes,
  addNoteAsync,
  updateNoteAsync,
  deleteNoteAsync,
} from "./store/notesSlice";
import NotesList from "./pages/NotesList";
import AddNote from "./pages/AddNote";
import Modal from "./components/Modal";
import NoteForm from "./components/NoteForm";
import { useTheme } from "./context/ThemeContext";

export default function App() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const [editingNote, setEditingNote] = useState(null);
  const { dark, toggleTheme } = useTheme();

  // Load notes from backend when app mounts
  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  // Handle edit note modal
  const handleEditClick = (note) => setEditingNote(note);

  const handleUpdate = (data) => {
    if (!editingNote) return;
    dispatch(updateNoteAsync({ id: editingNote.id, updated: data }));
    setEditingNote(null);
  };

  return (
    <BrowserRouter>
      {/* Header */}
      <header
        className={`shadow-md p-4 flex justify-between items-center text-white ${
          dark ? "bg-gray-800" : "bg-gradient-to-r from-blue-600 to-indigo-600"
        }`}
      >
        <h1 className="text-2xl font-extrabold tracking-wide">Notes Manager</h1>
        <nav className="space-x-4 flex items-center">
          <Link to="/" className="hover:underline hover:text-gray-200 transition">
            All Notes
          </Link>
          <Link
            to="/add"
            className="bg-white text-blue-600 font-semibold px-3 py-1.5 rounded shadow hover:bg-gray-100 transition"
          >
            Add Note
          </Link>
          <button
            onClick={toggleTheme}
            className={`ml-4 px-3 py-1.5 rounded shadow font-semibold transition ${
              dark
                ? "bg-gray-600 text-white hover:bg-gray-500"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {dark ? "Light Mode" : "Dark Mode"}
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main
        className={`${
          dark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        } p-6 min-h-screen transition-colors`}
      >
        <Routes>
          {/* Notes list */}
          <Route
            path="/"
            element={
              <NotesList
                onEdit={handleEditClick}
                notes={notes}
                onDelete={(id) => dispatch(deleteNoteAsync(id))}
              />
            }
          />

          {/* Add note */}
          <Route
            path="/add"
            element={
              <AddNote
                addNote={(note) => dispatch(addNoteAsync(note))}
              />
            }
          />
        </Routes>
      </main>

      {/* Edit Note Modal */}
      <Modal isOpen={!!editingNote} onClose={() => setEditingNote(null)}>
        {editingNote && (
          <>
            <h2 className="text-lg font-bold mb-4">Edit Note</h2>
            <NoteForm initial={editingNote} onSubmit={handleUpdate} />
          </>
        )}
      </Modal>
    </BrowserRouter>
  );
}
