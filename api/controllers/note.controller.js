const Note = require("../models/Note");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

const newNote = async (req, res, next) => {
    try {
        const newNote = new Note();
        newNote.title = req.body.title;
        newNote.description = req.body.description;
        newNote.notes = [];
        newNote.tasks = [];
        newNote.author = req.authority.id;
        const noteDb = await newNote.save()
        return res.json({
            status: 201,
            message: HTTPSTATUSCODE[201],
            data: {notes: noteDb}
        });
    } catch (err) {
        return next(err);
    }
}

const getAllNotes = async(req, res, next) => {
    try {
        const notes = await Note.find().populate("tasks").populate("author").populate("category");
        return res.json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: { notes: notes }
        });
    } catch (err) {
        return next(err);
    }
}

const getNoteById = async(req, res, next) => {
    try {
        const {noteId} = req.params;
        const noteDb = await Note.findById(noteId).populate("tasks").populate("author").populate("category");
        return res.json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: { notes: noteDb }
        });
    } catch (err) {
        return next(err)
    }
}

const getNoteByTitle = async(req, res, next) => {
    try {
        const {noteTitle} = req.params;
        const noteDb = await Note.find({title: noteTitle}).populate("tasks").populate("author").populate("category");
        return res.json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: { notes: noteDb }
        });
    } catch (err) {
        return next(err)
    }
}

const getFilterNotes = async (req, res, next) => {
    try {
        const filters = req.query;
        const notes = await Note.find(filters);
        return res.json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: {notes: notes}
        });
    } catch (err) {
        return next(err);
    }
}

const deleteNote = async (req, res, next) => {
    try {
        const {_id} = req.body;
        await Note.deleteOne({_id: id})
        return res.json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: {note: `${_id} deleted`}
        })
    } catch (err) {
        return next(err)
    }
}

const updateNote = async (req, res, next) => {
    try{
        const {id} = req.body;
        const note = await Note.findByIdAndUpdate({id: id}, {id: id, title: req.body.title, description: req.body.description})
        return res.json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: { note: `${note.note} updated`}
        })
    } catch (err){
        return next(err)
    }
}

module.exports = {
    newNote,
    getAllNotes,
    getNoteById,
    getNoteByTitle,
    getFilterNotes,
    deleteNote,
    updateNote
}