const Note = require("../models/notesModel");

function listNotes(req, res, next) {
  try {
    const { search: q } = req.query;
    const results = Note.search(q);
    res.json(results);
  } catch (err) {
    next(err);
  }
}

function getNote(req, res, next) {
  try {
    const { id } = req.params;
    const note = Note.getById(id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    next(err);
  }
}

function createNote(req, res, next) {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }
    const created = Note.create({ title, description });
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}

function updateNote(req, res, next) {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    if (!title && !description) {
      return res.status(400).json({ message: "At least title or description is required" });
    }
    const updated = Note.update(id, { ...(title !== undefined && { title }), ...(description !== undefined && { description }) });
    if (!updated) return res.status(404).json({ message: "Note not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

function deleteNote(req, res, next) {
  try {
    const { id } = req.params;
    const ok = Note.remove(id);
    if (!ok) return res.status(404).json({ message: "Note not found" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

module.exports = { listNotes, getNote, createNote, updateNote, deleteNote };
