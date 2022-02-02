const express = require("express");
const router = express.Router();

const {getAllNotes, getNoteById, getNoteByTitle, getFilterNotes, deleteNote, updateNote} = require("../controllers/note.controller");

router.get("/allNotes", getAllNotes);
router.get("/:noteId", getNoteById);
router.get("/:noteTitle", getNoteByTitle);
router.get("/items", getFilterNotes);
router.delete("/delete", deleteNote);
router.put("/update", updateNote);

module.exports = router;