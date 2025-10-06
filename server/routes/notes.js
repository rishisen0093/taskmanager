const express = require("express");
const router = express.Router();
const notes = require("../controllers/notesController");
const { createLimiter, updateLimiter, viewLimiter, deleteLimiter } = require("../middlewares/rateLimiters");

router.get("/", viewLimiter, notes.listNotes);
router.get("/:id", viewLimiter, notes.getNote);
router.post("/", createLimiter, notes.createNote);
router.put("/:id", updateLimiter, notes.updateNote);
router.delete("/:id", deleteLimiter, notes.deleteNote);

module.exports = router;
