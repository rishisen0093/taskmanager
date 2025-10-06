const notes = [];

function getAll() {
  return [...notes];
}

function getById(id) {
  return notes.find((n) => n.id === id);
}

function create(noteData) {
  const newNote = {
    id: Date.now().toString(),
    title: noteData.title || "",
    description: noteData.description || "",
    createdAt: new Date().toISOString(),
  };
  notes.unshift(newNote);
  return newNote;
}

function update(id, updated) {
  const idx = notes.findIndex((n) => n.id === id);
  if (idx === -1) return null;
  notes[idx] = { ...notes[idx], ...updated };
  return notes[idx];
}

function remove(id) {
  const idx = notes.findIndex((n) => n.id === id);
  if (idx === -1) return false;
  notes.splice(idx, 1);
  return true;
}

function search(query) {
  const q = (query || "").toLowerCase();
  if (!q) return getAll();
  return notes.filter(
    (n) =>
      (n.title && n.title.toLowerCase().includes(q)) ||
      (n.description && n.description.toLowerCase().includes(q))
  );
}

module.exports = { getAll, getById, create, update, remove, search };
