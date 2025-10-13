const fs = require("fs");
const path = require("path");
const NOTES_FILE = path.join(__dirname, "../data/notes.json");

function readNotes() {
  if (!fs.existsSync(NOTES_FILE)) fs.writeFileSync(NOTES_FILE, "[]");
  return JSON.parse(fs.readFileSync(NOTES_FILE));
}

function writeNotes(notes) {
  fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));
}

function getAll() {
  return readNotes();
}

function getById(id) {
  return readNotes().find((n) => n.id === id);
}

function create(noteData) {
  const notes = readNotes();
  const newNote = {
    id: Date.now().toString(),
    title: noteData.title || "",
    description: noteData.description || "",
    createdAt: new Date().toISOString(),
  };
  notes.unshift(newNote);
  writeNotes(notes);
  return newNote;
}

function update(id, updated) {
  const notes = readNotes();
  const idx = notes.findIndex((n) => n.id === id);
  if (idx === -1) return null;
  notes[idx] = { ...notes[idx], ...updated };
  writeNotes(notes);
  return notes[idx];
}

function remove(id) {
  const notes = readNotes();
  const idx = notes.findIndex((n) => n.id === id);
  if (idx === -1) return false;
  notes.splice(idx, 1);
  writeNotes(notes);
  return true;
}

function search(query) {
  const q = (query || "").toLowerCase();
  return readNotes().filter(
    (n) =>
      (n.title && n.title.toLowerCase().includes(q)) ||
      (n.description && n.description.toLowerCase().includes(q))
  );
}

module.exports = { getAll, getById, create, update, remove, search };
